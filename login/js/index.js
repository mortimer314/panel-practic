// import {testInputs} from "./func/utils.js"

const $ = document
const rotateBtn = $.querySelectorAll('.login__new-member-link')
const cardInnerElem = $.querySelector('.card__inner')
const registerBtn = $.querySelector("#register-btn")

const nameInput = $.querySelector("#name")
const usernameInput = $.querySelector("#username")
const emailInput = $.querySelector("#email")
const phoneInput = $.querySelector("#phone")
const passwordInput = $.querySelector("#password")
const rememberInput = $.querySelector("#checkbox2")

// ========== swal function ==========

const showSwal = (title, icon, buttons, callback) => {
    swal({
        title: title,
        icon: icon,
        buttons: buttons,
    }).then(callback)
}





// ========== rotate login form to register form ==========

rotateBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        cardInnerElem.classList.toggle("card__inner--rotate")

    })
})

// ========== generate register form ========== 

registerBtn.addEventListener("click", (e) => {
    // testInputs()
    let userData = {
        name:nameInput.value.trim(),
        username:usernameInput.value.trim(),
        email:emailInput.value.trim(),
        phone:phoneInput.value.trim(),
        password:passwordInput.value.trim(),
        role:"user"
    }

    axios({
        method:"post",
        url:"https://sabz-practice-default-rtdb.firebaseio.com/users.json",
        data: JSON.stringify(userData)
    }).then(res=>{
        console.log(res.status == 200)
        location.href = "https://mortimer314.github.io/practice/"

    }).catch(res =>alert("پایگاه داده فایربیس میباشد برای دور زدن تحریم و وصل شدن لطفا از فیلتر شکن استفاده کنید.باتشکر👌"))
})