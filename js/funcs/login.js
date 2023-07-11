const getuser = async (token) => {


    const result = await axios({
        method: "get",
        url: "https://site-613e5-default-rtdb.firebaseio.com/users.json",
    })
        .catch(res => {
            alert("پایگاه داده در فایربیس میباشد برای لود کامل سایت و دور زدن تحریم و وصل شدن لطفا از فیلتر شکن استفاده کنید.باتشکر👌")

        })

    let usersData = result.data


    if (usersData) {
        let usersArray = Object.entries(usersData)
        let userInfo = usersArray.filter((user) => {
            return user[0] == token
        })
        return userInfo
    }

}

export {getuser}