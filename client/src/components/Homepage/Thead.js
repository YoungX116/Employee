import React from "react";

const Thead = ({ tag, value, currentPage, sortBy, sort, width }) => {
  let order = sortBy ? currentPage.sort[sortBy] : 1;

  return (
    <th
      className={value ? "sortable" : "unsortable"}
      width={width}
      onClick={() => sort(value, order)}
    >
      {tag}{" "}
      {!sortBy || sortBy !== value ? (
        ""
      ) : order === 1 ? (
        <i className="fas fa-long-arrow-alt-up" />
      ) : (
        <i className="fas fa-long-arrow-alt-down" />
      )}
    </th>
  );
};

export default Thead;
