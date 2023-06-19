const rotateBtn = document.querySelectorAll('.login__new-member-link')
const cardInnerElem = document.querySelector('.card__inner')
console.log(rotateBtn)


rotateBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        cardInnerElem.classList.toggle("card__inner--rotate")

    })
})