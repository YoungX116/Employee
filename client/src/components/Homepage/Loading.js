import React from "react";

const Loading = ({ isFetching }) => {
  return <div className="loading">{isFetching && <span>Loading...</span>}</div>;
};

export default Loading;
