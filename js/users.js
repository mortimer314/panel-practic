import { creatNewUser,getAndShowAllUsers } from "./funcs/users.js";


window.addEventListener("load",()=>{
    const newUserBtn = document.querySelector("#submit-btn")
    
    getAndShowAllUsers()

    newUserBtn.addEventListener("click",(event)=>{
        event.preventDefault()
        creatNewUser()
    })
})