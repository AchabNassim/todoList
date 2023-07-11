// const fragment = document.createDocumentFragment();
// const container = document.getElementById("container");
const ul = document.getElementById("list");
const submitButton = document.getElementById("submitButton");
const inputField = document.getElementById("todoInput");
const paragError = document.getElementById("paragError");
let update = false;

function displayError(errorMessage) {
    paragError.textContent = errorMessage;
    submitButton.className = "error";
    inputField.className = "error";
    paragError.style.visibility = "visible";
    setTimeout(function() {
        inputField.className = "input";
        submitButton.className = "input";
        paragError.style.visibility = "hidden";
    }, 2000);
}

function createLiElement(text) {
    const li = document.createElement("li");
    const update = document.createElement("a");
    const del = document.createElement("a");
    update.href = "#";
    update.className = "fa-solid fa-square-pen";
    del.href = "#";
    del.className = "fa-solid fa-trash";
    li.className = "listElement";
    li.textContent = text;
    li.appendChild(update);
    li.appendChild(del);
    return (li);
}

function modify (e) {
    let node;
    if (update == true)
    {
        displayError("Please finish modifying first before proceeding!");
        return ;
    }
    if (e.target.classList.contains('fa-square-pen')) {
        node = e.target.parentElement;
        update = true;
        node.classList.add("liUpdate");
        inputField.value = node.innerText;
        submitButton.value = "update!";
        inputField.focus();
    }
}

function deleleteLi(e) {
    let node;
    if (e.target.classList.contains('fa-trash')) {
        node = e.target.parentElement;
        node.remove();
    }
}

function processInput(e) {
    e.preventDefault();
    let inputValue = inputField.value;
    inputField.value = "";
    if (inputValue.trim().length === 0 || inputValue === undefined) {
        displayError("Error, please enter something!");
        return ;
    }
    if (update === false) {
        ul.appendChild(createLiElement(inputValue));
    }
    else {
        update = false;
        submitButton.value = "save!";
        const element = document.querySelector(".liUpdate");
        element.childNodes[0].textContent = inputValue;
        element.classList.remove("liUpdate");
    }
}

submitButton.addEventListener("click", processInput);
ul.addEventListener("click", modify);
ul.addEventListener("click", deleleteLi);
