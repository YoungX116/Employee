const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  avatar: String,
  name: String,
  title: String,
  gender: String,
  startDate: String,
  officePhone: String,
  cellPhone: String,
  sms: String,
  email: String,
  manager: {
    type: Schema.Types.ObjectId,
    ref: "Employee"
  },
  directReports: [
    {
      report: {
        type: Schema.Types.ObjectId,
        ref: "Employee"
      }
    }
  ]
});

EmployeeSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Employee", EmployeeSchema);
