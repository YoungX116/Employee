import React from "react";

const Avatar = props => {
  return (
    <div className="container">
      <div className="row">
        <div className="offset-2 col-8">
          <img src={props.src} alt="avatar" className="image-upload" />
        </div>
      </div>
      <div className="row">
        <div className="form-group offset-3 col-6">
          <label htmlFor="image">Please select a photo as avatar:</label>
          <br />
          <input
            type="file"
            name="image"
            id="image"
            onChange={props.handleImageChange}
            key={props.avatarKey}
          />
        </div>
      </div>
    </div>
  );
};

export default Avatar;
