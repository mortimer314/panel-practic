

const showSwal = (title, icon, buttons, callback) => {
    swal({
      title,
      icon,
      buttons,
    }).then((result) => callback(result));
  };


  export{showSwal}