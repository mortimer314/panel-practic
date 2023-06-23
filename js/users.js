import { creatNewUser, getAndShowAllUsers, editUser, banUser, deleteUser } from "./funcs/users.js";
window.editUser = editUser
window.deleteUser = deleteUser
window.banUser = banUser

window.addEventListener("load", () => {
    const newUserBtn = document.querySelector("#submit-btn")

    getAndShowAllUsers()

    newUserBtn.addEventListener("click", (event) => {
        event.preventDefault()
        creatNewUser()
    })
})