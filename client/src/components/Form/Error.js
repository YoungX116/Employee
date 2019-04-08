import React from "react";

const Error = ({ error, field }) => {
  if (error.length === 0) return "";

  let e = error.find(err => {
    return err.field === field;
  });

  if (e && e.message)
    return (
      <div className="error mb-4">
        <label />
        {e.message}
      </div>
    );
  else return "";
};

export default Error;
