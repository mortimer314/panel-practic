
const sidebarElem = document.querySelector(".sidebar")
const homeSectionElem = document.querySelector(".home-section")
const topbarElem = document.querySelector(".topbar")
const activeSidebarBtn = document.querySelector(".topbar__active-sidebar")
const activeNavbarBtn = document.querySelector(".topbar__active-navbar")
const navbarSearchBtn = document.querySelector(".navbar__search")
const navbarSearchModal = document.querySelector(".modal-navbar__search")
const navbarSearchModalInput = document.querySelector("#modal-navbar__search-input")


activeSidebarBtn.addEventListener('click', () => {
    sidebarElem.classList.toggle("sidebar--open")
    homeSectionElem.classList.toggle("home-section--sidebar-open")
    activeSidebarBtn.classList.toggle('topbar__active-sidebar--open')
})

activeNavbarBtn.addEventListener("click", () => {
    topbarElem.classList.toggle('topbar--mobile')
    topbarElem.focus()
    topbarElem.addEventListener('focusout', () => {
        topbarElem.classList.toggle('topbar--mobile')
    })
})

navbarSearchBtn.addEventListener("click", (e) => {

    navbarSearchModal.classList.toggle('modal-navbar__search--active')
    navbarSearchModalInput.focus()
    navbarSearchModal.addEventListener('focusout', () => {
        navbarSearchModal.classList.remove('modal-navbar__search--active')
    })
})
