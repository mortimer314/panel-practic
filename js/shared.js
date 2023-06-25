

const showSwal = (title, icon, buttons, callback) => {
  swal({
    title,
    icon,
    buttons,
  }).then((result) => callback(result));
};

// const testInputs = () => {
//  console.log(document.querySelectorAll("form input"))
//  let formInputs = document.querySelectorAll("form input")
// console.log( formInputs.some(inp => {
//   return inp === "a"
// }))
// }

export { showSwal ,}