import React from "react";

const NavBar = props => {
  return (
    <nav className="navbar">
      <h3 className="navbar-brand">{props.head}</h3>

      <div className="btn-group">
        <button type="reset" className="btn reset" onClick={props.resetForm}>
          Reset
        </button>

        <button
          type="submit"
          form="form"
          className="btn submit"
          disabled={props.hasError}
        >
          {props.submit}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
