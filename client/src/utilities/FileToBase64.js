// convert file to base64 string
export const fileToBase64 = (filename, filepath) => {
  return new Promise(resolve => {
    let file = new File([filename], filepath);
    let reader = new FileReader();

    // Read file content on file loaded event
    reader.onload = event => {
      resolve(event.target.result);
    };

    // Convert data to base64
    reader.readAsDataURL(file);
  });
};
