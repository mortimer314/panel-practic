

const creatNewUser = () => {


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
                    <td>${(user[1].role === 'admin')?"ادمین":"کاربر"}</td>
                    <td><button class="edit-btn">ویرایش</button></td>
                    <td><button class="delete-btn">حذف</button></td>
                    <td><button class="ban-btn">بن</button></td>
                </tr>`
            )
        })
    }



}


export { creatNewUser, getAndShowAllUsers }