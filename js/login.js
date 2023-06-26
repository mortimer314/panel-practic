import { showSwal, testInputs, testRepeatUsername } from "./shared.js"

let loginUsernameValue = null
let loginPasswordValue = null


window.addEventListener("load", () => {
    const loginBtn = document.querySelector('#login-btn')
    const registerBtn = document.querySelector('#register-btn')

    loginBtn.addEventListener("click", (event) => {
        event.preventDefault()

        loginUsernameValue = document.querySelector('#login-username').value.trim()
        loginPasswordValue = document.querySelector('#login-password').value.trim()

        login()

    })

    registerBtn.addEventListener("click", e => {
        e.preventDefault()

        register()
    })
})

const login = async () => {

    await axios({
        method: "get",
        url: "https://sabz-practice-default-rtdb.firebaseio.com/users.json",
    })
        .then(result => {
            let usersData = result.data

            if (usersData) {

                let usersArray = Object.entries(usersData)

                usersArray.forEach((user, index) => {

                    if (loginUsernameValue == user[1].username && user[1].password == loginPasswordValue) {
                        localStorage.setItem("token", user[0])
                        if (user[1].role == "admin") {
                            location.href = "../main/index.html"

                        } else {
                            location.href = "../frontend/index.html"
                        }
                    } else {
                        showSwal("نام کاربری یا رمز عبور اشتباه است!", "error", "متوجه شدم", () => { })
                    }
                })
            } else {

            }
        })
        .catch(res => {
            console.log(res)
            if (res.message == "Network Error") {
                alert("در برقراری ارتباط مشکلی وجود دارد لطفا ضمن روشن کردن vpn چند دقیقه دیگر تلاش کنید.با تشکر👌")
            }
            alert("پایگاه داده در فایربیس میباشد برای دور زدن تحریم و وصل شدن لطفا از فیلتر شکن استفاده کنید.باتشکر👌")
        })
}

const register = async () => {

    const nameInput = document.querySelector("#name")
    const usernameInput = document.querySelector("#username")
    const emailInput = document.querySelector("#email")
    const phoneInput = document.querySelector("#phone")
    const passwordInput = document.querySelector("#password")

    testInputs().then(result => {

        if (result) {
            testRepeatUsername().then(result => {

                if (result) {
                    let userData = {
                        name: nameInput.value.trim(),
                        username: usernameInput.value.trim(),
                        email: emailInput.value.trim(),
                        phone: phoneInput.value.trim(),
                        password: passwordInput.value.trim(),
                        role: 'user',
                        ban: false
                    }

                    axios({
                        method: "post",
                        url: "https://sabz-practice-default-rtdb.firebaseio.com/users.json",
                        data: JSON.stringify(userData)
                    })
                        .then(async res => {
                            nameInput.value = ""
                            usernameInput.value = ""
                            emailInput.value = ""
                            phoneInput.value = ""
                            passwordInput.value = ""

                            let token = res.data.name
                            localStorage.setItem("token", token)
                            showSwal("کاربر مورد نظر با موفقیت عضو شدید.", "success", "تایید", () => {
                                 location.href = "../../frontend/index.html"
                            })
                        })
                        .catch(res => {

                            if (res.message === "Network Error") {
                                alert("پایگاه داده در فایربیس میباشد برای دور زدن تحریم و وصل شدن لطفا از فیلتر شکن استفاده کنید.باتشکر👌")
                            }
                        })
                }
            })
        }

    })

}

