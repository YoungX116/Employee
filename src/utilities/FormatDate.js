// expect to output yyyy-mm-dd
export const formatDate = date => {
  let yyyy = date.getFullYear();

  let mm = date.getMonth() + 1;
  if (mm < 10) mm = "0" + mm;

  let dd = date.getDate();
  if (dd < 10) dd = "0" + dd;

  return `${yyyy}-${mm}-${dd}`;
};
