
import {
    preparingForm, 
    createArticle,
    draftArticle
} from "./funcs/article.js"


const submitBtnElem = document.querySelector("#submit-btn")
const draftBtnElem = document.querySelector("#draft-btn")

window.addEventListener("load", () => {
    preparingForm()

    submitBtnElem.addEventListener("click", event => {
        event.preventDefault()
        createArticle()
    })
    draftBtnElem.addEventListener("click", event => {
        event.preventDefault()
        draftArticle()
    })
})
