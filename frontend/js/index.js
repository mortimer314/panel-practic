import { getuser } from "../../js/funcs/login.js"


const mobileMenuElem = document.querySelector('.mobile-menu')
const mainHeaderMobileMenuElem = document.querySelector('.main-header__mobile-menu')
const closeMobileMenuElem = document.querySelector('.main-header__close-mobile-menu')



mobileMenuElem.addEventListener('click', () => {
    mainHeaderMobileMenuElem.classList.add("main-header__mobile-menu--active")
})

closeMobileMenuElem.addEventListener('click', () => {
    mainHeaderMobileMenuElem.classList.remove("main-header__mobile-menu--active")
})

mainHeaderMobileMenuElem.addEventListener('click', event => {
    if (event.target.nextSibling.className) {
        event.target.nextSibling.classList.toggle("main-header__mobile-menu-dropdown--active")
    }
})

window.addEventListener("load", () => {
    const mainHeaderLeft = document.querySelector(".main-header__left")
    let token = localStorage.getItem("token")
    getuser(token).then(userInfo => {

        if (userInfo) {
            mainHeaderLeft.innerHTML = ''
            mainHeaderLeft.insertAdjacentHTML("beforeend",
                `<div class="search-bar d-xl-block">
                    <input type="text" class="search-bar__input" placeholder="جستجو ...">
                    <button type="submit" class="search-bar__submit">
                    <i class="fas fa-search search-bar__icon"></i>
                    </button>
                </div>

                <a href="#" class="main-header__cart-btn" title="سبد خرید">
                    <i class="fas fa-shopping-cart main-header__cart-icon"></i>
                </a>
                <a href="${userInfo[0] ? "user account" : "../login/index.html"}"
                    class="main-header__profile d-none d-lg-block">
                    <span class="main-header__profile-text">${userInfo[0] ? userInfo[0][1].name : "ورود / عضویت"}</span>
                </a>
                <a href="${userInfo[0] ? "user account" : "../login/index.html"}"
                    class="main-header__profile-icon d-lg-none">
                    <i class="fas fa-user main-header__cart-icon"></i>
                </a>`
            )
        }
    })

})

