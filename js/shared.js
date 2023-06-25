

const showSwal = (title, icon, buttons, callback) => {
  swal({
    title,
    icon,
    buttons,
  }).then((result) => callback(result));
};

const testInputs = () => {
  const nameInput = document.querySelector("#name")
  const usernameInput = document.querySelector("#username")
  const emailInput = document.querySelector("#email")
  const phoneInput = document.querySelector("#phone")
  const passwordInput = document.querySelector("#password")

  let testList = []
  let invalidList = []
  let listInputs = [nameInput,usernameInput,emailInput,phoneInput,passwordInput]

  let namePattern = /^.{4,18}$/
  let usernamePattern = /^(?!.*\s).{4,15}$/
  let emailPattern = /^[\w-]+@\w{2,5}\.\w{2,}$/
  let phonePattern = /^(0|(98)|(\+98))9\d{9}$/
  let passwordPattern = /^(?=.*[a-zAz])(?=.*\d).{8,12}$/

  if (!usernamePattern.test(usernameInput.value.trim())) {
      testList.push(`نام کاربری باید بین 4 تا 15 کاراکتر و بدون فاصله باشد.`)
      invalidList.push(usernameInput)
  }

  if (!namePattern.test(nameInput.value.trim())) {
      testList.push(`نام و نام خانوادگی باید بین 4 تا 18 کاراکتر باشد.`)
      invalidList.push(nameInput)
  }

  if (!emailPattern.test(emailInput.value.trim())) {
      testList.push(`ساختار ایمیل وارد شده نادرست است.`)
      invalidList.push(emailInput)
  }

  if (!passwordPattern.test(passwordInput.value.trim())) {
      testList.push(`رمز عبور باید بین 8 تا 12 کاراکتر و شامل حداقل یک حرف و یک عدد باشد.`)
      invalidList.push(passwordInput)
  }

  if (!phonePattern.test(phoneInput.value.trim())) {
      testList.push(`شماره تلفن باید مانند یکی از این موارد باشد:09123456789 و 989123456789 و 989123456789+`)
      invalidList.push(phoneInput)
  }

  listInputs.forEach(item=>{
      item.style.border = "none"
  })
  invalidList.forEach(item=>{
      item.style.border = "1px solid red"
  })
  if (testList.length) {
      Swal.fire({
          confirmButtonText: 'تایید',
          showCloseButton: true,
          title: ' لطفا موارد زیر را رعایت کنید.',
          html: `${testList.map((item, index) => {
              return `<h1 style="font-weight:bold;text-align:start;">${index + 1} - ${item}</h1>`
          }).join('')}`
      })
      return false
  }
  return true
} 



export { showSwal,testInputs }