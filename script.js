// const fragment = document.createDocumentFragment();
// const container = document.getElementById("container");
const ul = document.getElementById("list");
const submitButton = document.getElementById("submitButton");
const inputField = document.getElementById("todoInput");
const paragError = document.getElementById("paragError");

function displayError() {
    submitButton.className = "error";
    inputField.className = "error";
    paragError.style.visibility = "visible";
    setTimeout(function() {
        inputField.className = "input";
        submitButton.className = "input";
        paragError.style.visibility = "hidden";
    }, 1500);
}

function createLiElement(text) {
    const li = document.createElement("li");
    li.className = "listElement";
    li.textContent = text;
    return (li);
}

function processInput(e) {
    e.preventDefault();
    let inputValue = inputField.value;
    inputField.value = "";
    if (inputValue.trim().length === 0 || inputValue === undefined) {
        displayError();
        return ;
    }
    ul.appendChild(createLiElement(inputValue));
}

submitButton.addEventListener("click", processInput);