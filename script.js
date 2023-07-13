// const fragment = document.createDocumentFragment();
// const container = document.getElementById("container");
const ul = document.getElementById("list");
const submitButton = document.getElementById("submitButton");
const inputField = document.getElementById("todoInput");
const parag = document.querySelector(".parag");
const deleteButton = document.getElementById("deleteButton");
let update = false;

function displayError(errorMessage) {
    parag.textContent = errorMessage;
    submitButton.className = "error";
    inputField.className = "error";
    parag.classList.add("paragError");
    setTimeout(() => {
        inputField.className = "input";
        submitButton.className = "input";
        parag.classList.remove("paragError");
    }, 2000);
}

function createLiElement(text) {
    const li = document.createElement("li");
    const update = document.createElement("a");
    const del = document.createElement("a");
    const checkmark = document.createElement("a");
    update.href = "#";
    update.className = "fa-solid fa-square-pen";
    del.href = "#";
    del.className = "fa-solid fa-trash";
    li.className = "listElement";
    checkmark.href = "#";
    checkmark.className = "fa-solid fa-square-check";
    li.textContent = text;
    li.appendChild(update);
    li.appendChild(del);
    li.appendChild(checkmark);
    return (li);
}

function checkTask (e) {
    let node;
    if (e.target.classList.contains('fa-square-check')) {
        if (update == true) {
            inputField.focus();
            displayError("Please finish modifying first before proceeding!");
            return ;
        }
        node = e.target.parentElement;
        console.log(node);
        if (node.classList.contains("checked"))
            node.classList.remove("checked");
        else
            node.classList.add("checked");
    }
}

function modify (e) {
    let node;
    if (e.target.classList.contains('fa-square-pen')) {
        if (update == true) {
            inputField.focus();
            displayError("Please finish modifying first before proceeding!");
            return ;
        }
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
        if (update == true) {
            inputField.focus();
            displayError("Please finish modifying first before proceeding!");
            return ;
        }
        node = e.target.parentElement;
        node.remove();
    }
}

function deleteAll()
{
    setTimeout(() => {
        while (ul.firstChild)
            ul.firstChild.remove();
    }, 150);
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

function loadEvents() {
    submitButton.addEventListener("click", processInput);
    ul.addEventListener("click", modify);
    ul.addEventListener("click", deleleteLi);
    ul.addEventListener("click", checkTask);
    deleteButton.addEventListener("click", deleteAll);
}

loadEvents();
