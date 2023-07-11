
const nameInput = document.querySelector("#name")
const usernameInput = document.querySelector("#username")
const emailInput = document.querySelector("#email")
const phoneInput = document.querySelector("#phone")
const passwordInput = document.querySelector("#password")

const showSwal = (title, icon, buttons, callback) => {
  swal({
    title,
    icon,
    buttons,
  }).then(callback);
};

const testInputs = async () => {
 

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

const testRepeatUsername = async () => {
    let flag = true
    let repeatList = []
    let usersArray = null
    let invalidList = []
    let listInputs = [usernameInput, emailInput, phoneInput,]
    await axios({
        method: "get",
        url: "https://site-613e5-default-rtdb.firebaseio.com/users.json",
    })
    .then(result => {
            console.log("testRepeatUsername")
            let usersData = result.data

            if (usersData) {

                usersArray = Object.entries(usersData)

                usersArray.forEach((user, index) => {

                    if (usernameInput.value.trim() == user[1].username) {
                        repeatList.push("نام کاربری تکراریست!")
                        invalidList.push(usernameInput)
                    }
                    if (emailInput.value.trim() == user[1].email) {
                        repeatList.push("ایمیل تکراریست!")
                        invalidList.push(emailInput)
                    }
                    if (phoneInput.value.trim() == user[1].phone) {
                        repeatList.push("شماره تلفن تکراریست!")
                        invalidList.push(phoneInput)
                    }
                })

                listInputs.forEach(item => {
                    item.style.border = "none"
                })
                invalidList.forEach(item => {
                    item.style.border = "1px solid red"
                })
                if (repeatList.length) {
                    Swal.fire({
                        confirmButtonText: 'تایید',
                        showCloseButton: true,
                        title: ' لطفا موارد زیر را رعایت کنید.',
                        html: `${repeatList.map((item, index) => {
                            return `<h1 style="font-weight:bold;text-align:start;">${index + 1} - ${item}</h1>`
                        }).join('')}`
                    })
                    flag = false
                } else {
                    flag = true
                }

            }


        })
        .catch(res => {
            console.log(res)
            if (res.message == "Network Error") {
                alert("در برقراری ارتباط مشکلی وجود دارد لطفا ضمن روشن کردن vpn چند دقیقه دیگر تلاش کنید.با تشکر👌")
            }
            alert("پایگاه داده در فایربیس میباشد برای دور زدن تحریم و وصل شدن لطفا از فیلتر شکن استفاده کنید.باتشکر👌")
        })
    return flag
}

export { showSwal,testInputs,testRepeatUsername }