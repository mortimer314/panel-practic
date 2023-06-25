import { showSwal } from "./shared.js"
let loginUsernameValue = null
let loginPasswordValue = null


window.addEventListener("load", () => {
    const loginBtn = document.querySelector('#login-btn')

    loginBtn.addEventListener("click", (event) => {
        event.preventDefault()

        loginUsernameValue = document.querySelector('#login-username').value.trim()
        loginPasswordValue = document.querySelector('#login-password').value.trim()
        console.log(loginUsernameValue, loginPasswordValue)
        getAndSearchInUsers()


    })
})

const getAndSearchInUsers = async () => {

    await axios({
        method: "get",
        url: "https://sabz-practice-default-rtdb.firebaseio.com/users.json",
    })
        .then(result => {
            let usersData = result.data
            if (usersData) {
                let usersArray = Object.entries(usersData)
                usersArray.forEach((user, index) => {
                    console.log(loginUsernameValue == user[1].username && user[1].password == loginPasswordValue)
                    if (loginUsernameValue == user[1].username && user[1].password == loginPasswordValue) {
                        localStorage.setItem("token", user[0])
                        if(user[1].role == "admin"){
                            location.href = "https://mortimer314.github.io/panel-practic/main/index.html"

                        }else{
                            location.href = "https://mortimer314.github.io/practice/frontend/index.html"
                        }
                    }else{
                        showSwal("نام کاربری یا رمز عبور اشتباه است!","error","متوجه شدم",()=>{})
                    }
                })
            } else {

            }
        })
        .catch(res => {
            console.log(res)
            if(res.message == "Network Error"){
                alert("در برقراری ارتباط مشکلی وجود دارد لطفا ضمن روشن کردن vpn چند دقیقه دیگر تلاش کنید.با تشکر👌")
            }
            alert("پایگاه داده در فایربیس میباشد برای دور زدن تحریم و وصل شدن لطفا از فیلتر شکن استفاده کنید.باتشکر👌")
        })
}