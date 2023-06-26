

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


// ========== rotate login form to register form ==========

rotateBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        cardInnerElem.classList.toggle("card__inner--rotate")

    })
})