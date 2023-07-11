
import { showSwal, testInputs, testRepeatUsername } from "../shared.js";

const creatNewUser = async () => {
    
    const nameInput = document.querySelector("#name")
    const usernameInput = document.querySelector("#username")
    const emailInput = document.querySelector("#email")
    const phoneInput = document.querySelector("#phone")
    const passwordInput = document.querySelector("#password")
    const roleInput = document.querySelector("#role")

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
                        url: "https://site-613e5-default-rtdb.firebaseio.com/users.json",
                        data: JSON.stringify(userData)
                    })
                        .then(res => {
                            nameInput.value = ""
                            usernameInput.value = ""
                            emailInput.value = ""
                            phoneInput.value = ""
                            passwordInput.value = ""

                            showSwal("کاربر مورد نظر با موفقیت افزوده شد.", "success", "تایید", getAndShowAllUsers())
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

const getAndShowAllUsers = async () => {
    const usersListwrapperElem = document.querySelector("tbody")

    const result = await axios({
        method: "get",
        url: "https://site-613e5-default-rtdb.firebaseio.com/users.json",
    })
        .catch(res => {
            alert("پایگاه داده در فایربیس میباشد برای دور زدن تحریم و وصل شدن لطفا از فیلتر شکن استفاده کنید.باتشکر👌")

        })

    let usersData = result.data
    usersListwrapperElem.innerHTML = ""

    if (usersData) {
        let usersArray = Object.entries(usersData)
        usersArray.forEach((user, index) => {

            //  نحوه ارسال همزمان دو متغیر در تابع بن  
            usersListwrapperElem.insertAdjacentHTML('beforeend',
                `<tr>
                    <td style="${user[1].ban ? 'background-color:red;' : ''}">${index + 1}</td>
                    <td>${user[1].name}</td>
                    <td>${user[1].username}</td>
                    <td>${user[1].phone}</td>
                    <td>${user[1].email}</td>
                    <td>${(user[1].role === 'admin') ? "ادمین" : "کاربر"}</td>
                    <td>${user[1].password}</td>
                    <td><button onclick='editUser(${JSON.stringify(user[0])},${JSON.stringify(user[1])})' class="edit-btn">ویرایش</button></td>
                    <td><button onclick="deleteUser('${user[0]}')" class="delete-btn">حذف</button></td>
                    <td><button onclick='banUser(${JSON.stringify(user[0])},${JSON.stringify(user[1])})' class="ban-btn">${user[1].ban ? "حذف بن" : "بن"}</button></td>
                </tr>`
            )
        })
    } else {
        usersListwrapperElem.insertAdjacentHTML('beforeend', `<tr>
        <td class="text-danger">کاربری یافت نشد.</td>
    </tr>`)
    }

}

const editUser = async (userID, userInfo) => {

    const { value: formValues } = await Swal.fire({
        confirmButtonText: 'آری',
        cancelButtonText: 'خیر',
        showCancelButton: true,
        showCloseButton: true,
        title: 'با خالی ماندن هر ورودی آن مشخه کاربر بدون تغییر میماند.',
        html:
            '<input id="swal-input1" class="swal2-input" placeholder="نام کاربری">' +
            '<input id="swal-input2" class="swal2-input" placeholder="نام و نام خانودگی">' +
            '<input id="swal-input3" class="swal2-input" placeholder="ایمیل">' +
            '<input id="swal-input4" class="swal2-input" placeholder="رمز ورود">' +
            '<input id="swal-input5" class="swal2-input" placeholder="تلفن">' +
            `<select  id="swal-input6" style="width:60%;margin-bottom:3rem;">
                <option class="swal2-select-option" value="false">بدون تغییر</option>
                <option class="swal2-select-option" value="admin">ادمین</option>
                <option class="swal2-select-option" value="user">کاربر عادی</option>
            </select>`,
        focusConfirm: false,
        preConfirm: () => {
            return [
                document.getElementById('swal-input1').value,
                document.getElementById('swal-input2').value,
                document.getElementById('swal-input3').value,
                document.getElementById('swal-input4').value,
                document.getElementById('swal-input5').value,
                document.getElementById('swal-input6').value
            ]
        }
    })
    if (formValues) {
        console.log(formValues)
        let newUserInfos = {
            ban: userInfo.ban,
            username: formValues[0].trim() ? formValues[0] : userInfo.username,
            name: formValues[1].trim() ? formValues[1] : userInfo.name,
            email: formValues[2].trim() ? formValues[2] : userInfo.email,
            password: formValues[3].trim() ? formValues[3] : userInfo.password,
            phone: formValues[4].trim() ? formValues[4] : userInfo.phone,
            role: formValues[5] === "false" ? `${userInfo.role}` : formValues[5],

        }
        await axios({
            method: 'put',
            url: `https://site-613e5-default-rtdb.firebaseio.com/users/${userID}.json`,
            data: JSON.stringify(newUserInfos)
        }).then(res => {
            getAndShowAllUsers()
            showSwal("اطلاعات کاربر مورد نظر با موفقیت ویرایش شد", "success", "تایید", () => { })
        }).catch(res => {
            showSwal('درخواست ناموفق بود.', "error", "تایید", () => { })
        })

        // Swal.fire(JSON.stringify(formValues))


    }
}

const deleteUser = (userID) => {

    Swal.fire({
        title: 'آیا از حذف کاربر اطمینان دارید؟',
        icon: 'question',
        iconHtml: '؟',
        confirmButtonText: 'آری',
        cancelButtonText: 'خیر',
        showCancelButton: true,
        showCloseButton: true
    })
        .then(async res => {

            if (res.isConfirmed) {
                await axios({
                    method: 'delete',
                    url: `https://site-613e5-default-rtdb.firebaseio.com/users/${userID}.json`
                }).then(res => {
                    getAndShowAllUsers()
                    showSwal("کاربر مورد نظر با موفقیت حذف شد", "success", "تایید", () => { })
                }).catch(res => {
                    showSwal('درخواست ناموفق بود.', "error", "تایید", () => { })
                })
            }
        })
}

const banUser = (userID, userInfo) => {

    if (userInfo.ban) {
        Swal.fire({
            title: 'آیا از عادی کردن کاربر اطمینان دارید؟',
            icon: 'question',
            iconHtml: '؟',
            confirmButtonText: 'آری',
            cancelButtonText: 'خیر',
            showCancelButton: true,
            showCloseButton: true
        })
            .then(async res => {
                if (res.isConfirmed) {
                    let banUserInfo = {
                        ban: false,
                        username: userInfo.username,
                        name: userInfo.name,
                        phone: userInfo.phone,
                        email: userInfo.email,
                        role: userInfo.role,
                        password: userInfo.password

                    }
                    await axios({
                        method: 'put',
                        url: `https://site-613e5-default-rtdb.firebaseio.com/users/${userID}.json`,
                        data: JSON.stringify(banUserInfo)
                    }).then(res => {
                        getAndShowAllUsers()
                        showSwal("کاربر مورد نظر با موفقیت از بن بودن شد", "success", "تایید", () => { })
                    }).catch(res => {
                        showSwal('درخواست ناموفق بود.', "error", "تایید", () => { })
                    })
                }
            })
    } else {
        Swal.fire({
            title: 'آیا از بن کردن کاربر اطمینان دارید؟',
            icon: 'question',
            iconHtml: '؟',
            confirmButtonText: 'آری',
            cancelButtonText: 'خیر',
            showCancelButton: true,
            showCloseButton: true
        })
            .then(async res => {
                if (res.isConfirmed) {
                    let banUserInfo = {
                        ban: true,
                        username: userInfo.username,
                        name: userInfo.name,
                        phone: userInfo.phone,
                        email: userInfo.email,
                        role: userInfo.role,
                        password: userInfo.password

                    }
                    await axios({
                        method: 'put',
                        url: `https://site-613e5-default-rtdb.firebaseio.com/users/${userID}.json`,
                        data: JSON.stringify(banUserInfo)
                    }).then(res => {
                        getAndShowAllUsers()
                        showSwal("کاربر مورد نظر با موفقیت بن شد", "success", "تایید", () => { })
                    }).catch(res => {
                        showSwal('درخواست ناموفق بود.', "error", "تایید", () => { })
                    })
                }
            })
    }
}


export { creatNewUser, getAndShowAllUsers, editUser, deleteUser, banUser }