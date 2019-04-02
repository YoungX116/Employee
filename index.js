const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer({ dest: "uploads/" }).single("avatar");
const fs = require("fs");
const path = require("path");
const axios = require("axios");

const Employee = require("./models/Employee");

const app = express();

// get an instance of the express Router
const router = express.Router();

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use("/avatar", express.static(path.join(__dirname, "uploads")));

// connect to mongoDB database
mongoose.connect(
  "mongodb://mytestuser:mypassword19@ds129045.mlab.com:29045/employee-dev"
);

// test route to make sure everything is working
// GET: http://localhost:8888/api
router.route("/").get((req, res) => {
  res.json({ message: "Api is working..." });
});

// get all records
// GET: http://localhost:8888/api/getall
router.route("/getall").get((req, res) => {
  Employee.find((err, records) => {
    if (err) res.json(err);
    res.json(records);
  });
});

// get a record by _id
// GET: http://localhost:8888/api/getone/:_id
router.route("/getone/:_id").get((req, res) => {
  Employee.findById(req.params._id, "-avatar")
    .populate("manager")
    .populate({ path: "directReports.report", populate: { path: "manager" } })
    .exec((err, record) => {
      if (err) res.json(err);
      res.json(record);
    });
});

// get current employees
// POST: http://localhost:8888/api/getcurrent
router.route("/getcurrent").post((req, res) => {
  const query = req.body.query;
  const options = req.body.options;
  Employee.paginate(query, options, (err, records) => {
    if (err) res.json(err);
    res.json(records);
  });
});

// get next page
// POST: http://localhost:8888/api/getnextpage
router.route("/getnextpage").post((req, res) => {
  const query = req.body.query;
  const options = req.body.options;
  Employee.paginate(query, options, (err, records) => {
    if (err) res.json(err);
    res.json(records);
  });
});

// get avatar
// GET: http://localhost:8888/api/getavatar/:_id
router.route("/getavatar/:_id").get((req, res) => {
  Employee.findById(req.params._id, "avatar", (err, record) => {
    if (err) res.json(err);
    res.json(record);
  });
});

// insert a record
// POST: http://localhost:8888/api/insertone
router.route("/insertone").post(upload, (req, res) => {
  // create a new instance of the Employee model
  let employee = new Employee();
  let body = req.body;
  employee.avatar = req.file ? req.file.filename : "";
  employee.name = body.name;
  employee.title = body.title;
  employee.gender = body.gender;
  employee.startDate = body.startDate;
  employee.officePhone = body.officePhone;
  employee.cellPhone = body.cellPhone;
  employee.sms = body.sms;
  employee.email = body.email;
  if (body.manager) employee.manager = body.manager;

  employee.save((err, doc) => {
    if (err) res.json(err);

    // if (body.manager) {
    //   axios.post(`/updatesubordinate/${body.manager}`, { id: doc._id });
    // }
    res.json(doc);
  });
});

// update the subordinate of the employee
// PUT: http://localhost:8888/api/updatesubordinate/:_id
router.route("/updatesubordinate/:_id").put((req, res) => {
  if (req.params._id) {
    Employee.findById(req.params._id, (err, record) => {
      if (err) res.json(err);

      record.directReports.push({ report: req.body.id });
      // save the record
      record.save(err => {
        if (err) res.json(err);
        res.json({ message: "update subordinate success" });
      });
    });
  }
});

// update a record by _id
// PUT: http://localhost:8888/api/updateone/:_id
router.route("/updateone/:_id").put(upload, (req, res) => {
  Employee.findById(req.params._id, (err, record) => {
    if (err) res.json(err);
    // update info
    if (req.file) {
      if (record.avatar) fs.unlinkSync(`./uploads/${record.avatar}`);
      record.avatar = req.file.filename;
      console.log(req.file.filename);
    }

    let body = req.body;
    record.name = body.name;
    record.title = body.title;
    record.gender = body.gender;
    record.startDate = body.startDate;
    record.officePhone = body.officePhone;
    record.cellPhone = body.cellPhone;
    record.sms = body.sms;
    record.email = body.email;
    if (body.manager) record.manager = body.manager;

    // save the record
    record.save(err => {
      if (err) res.json(err);
      res.json({ message: "update success" });
    });
  });
});

// delete a record by _id
// DELETE: http://localhost:8888/api/deleteone/:_id
router.route("/deleteone/:_id").delete((req, res) => {
  Employee.deleteOne({ _id: req.params._id }, err => {
    if (err) res.json(err);
    res.json({ message: "delete success" });
  });
});

// delete avatar
// DELETE: http://localhost:8888/api/deleteavatar/:avatar
router.route("/deleteavatar/:avatar").delete((req, res) => {
  if (req.params.avatar !== "undefined")
    fs.unlinkSync(`./uploads/${req.params.avatar}`);
  res.json({ message: "delete success" });
});

// register our routes
// all the routes will be prefixed with /api
app.use("/api", router);

const port = 8888;
app.listen(port, () => {
  console.log(`Listening to port ${port}...`);
});
