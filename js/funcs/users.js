
import { showSwal } from "../shared.js";
const creatNewUser = async () => {
    
    const nameInput = document.querySelector("#name")
    const usernameInput = document.querySelector("#username")
    const emailInput = document.querySelector("#email")
    const phoneInput = document.querySelector("#phone")
    const passwordInput = document.querySelector("#password")
    const roleInput = document.querySelector("#role")

    let userData = {
        name: nameInput.value.trim(),
        username: usernameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
        password: passwordInput.value.trim(),
        role: roleInput.value,
        ban:false
    }
    console.log(userData)
    await axios({
        method: "post",
        url: "https://sabz-practice-default-rtdb.firebaseio.com/users.json",
        data: JSON.stringify(userData)
    }).then(res => {
        console.log(res.status == 200)
        console.log(res)
        showSwal("کاربر مورد نظر با موفقیت افزوده شد","success","تایید",()=>{})
        nameInput.value = ""
        usernameInput.value = ""
        emailInput.value = ""
        phoneInput.value = ""
        passwordInput.value = ""
        roleInput.value = "admin"
        getAndShowAllUsers()

    }).catch(res => alert("پایگاه داده در فایربیس میباشد برای دور زدن تحریم و وصل شدن لطفا از فیلتر شکن استفاده کنید.باتشکر👌"))


}

const getAndShowAllUsers = async () => {
    const usersListwrapperElem = document.querySelector("tbody")

    const result = await axios({
        method: "get",
        url: "https://sabz-practice-default-rtdb.firebaseio.com/users.json",
    })
    .catch(res => alert("پایگاه داده در فایربیس میباشد برای دور زدن تحریم و وصل شدن لطفا از فیلتر شکن استفاده کنید.باتشکر👌"))

    let usersData = result.data
    let usersArray = Object.entries(usersData)
    console.log(usersArray)
    usersListwrapperElem.innerHTML = ""
    if (usersArray.length) {
        usersArray.forEach((user, index) => {
            usersListwrapperElem.insertAdjacentHTML('beforeend',
                `<tr>
                    <td>${index + 1}</td>
                    <td>${user[1].name}</td>
                    <td>${user[1].username}</td>
                    <td>${user[1].phone}</td>
                    <td>${user[1].email}</td>
                    <td>${(user[1].role === 'admin') ? "ادمین" : "کاربر"}</td>
                    <td>${user[1].password}</td>
                    <td><button onclick="editUser(${user[0]})" class="edit-btn">ویرایش</button></td>
                    <td><button onclick="deleteUser(${user[0]})" class="delete-btn">حذف</button></td>
                    <td><button onclick="banUser(${user[0]})" class="ban-btn">بن</button></td>
                </tr>`
            )
        })
    }
}



export { creatNewUser, getAndShowAllUsers }