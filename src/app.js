const container = document.getElementById("listContainer");
const titlesContainer = document.getElementById("titlesContainer");
const listTitleInput = document.getElementById("listInput");
const toDoInput = document.getElementById("toDoInput");

let selectedList = 0;
let list = [{title: "example", content: ["Buy groceries","Call mom","Workout","Read a book","Plan weekend trip","Reply to emails","Water plants","Learn JavaScript","Cook dinner"]}];

(() => {
    populateList();
    populateListTitles();
    addKeyPressListeners();
})();

function addKeyPressListeners() {
    toDoInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            createToDo();
        }
    });
    listTitleInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            createList();
        }
    });
}

function createToDo() {
    if (toDoInput.value != "") {
        list[selectedList].content.push(toDoInput.value);
        toDoInput.value = "";
        populateList();
    }
}

function createList() {
    if (listTitleInput != "") {
        list.push({title: listTitleInput.value, content: []})
        listTitleInput.value = "";
        selectedList = list.length - 1;
        selectedAList();
        populateListTitles();
    }
}

function populateList() {
    container.innerHTML = "";
    let borderDiv = document.createElement("div");
    borderDiv.classList.add("flex", "justify-center", "items-center", "p-1", "bg-linear-to-r", "from-cyan-500/50", "to-blue-500/50", "rounded-2xl", "backdrop-blur-xs");
    let contentDiv = document.createElement("div");
    contentDiv.classList.add("flex", "items-center", "bg-white/20", "w-full", "h-full", "rounded-xl", "backdrop-blur-xs", "pl-5", "py-2", "overflow-clip");
    list[selectedList].content.forEach(element => {
        let borderClone = borderDiv.cloneNode();
        let contentClone = contentDiv.cloneNode();
        contentClone.textContent = element
        container.appendChild(borderClone);
        borderClone.appendChild(contentClone);
    });
}

function populateListTitles() {
    titlesContainer.innerHTML = "";
    list.forEach((element, index) => {
        let span = document.createElement("span");
        span.classList.add("text-xl", "hover:bg-black");
        span.textContent = element.title;
        if (selectedList == index) {
            span.classList.add("bg-black");
        }
        span.addEventListener("click", () => {
            selectedList = index;
            span.classList.add("bg-black");
            selectedAList();
        });
        titlesContainer.appendChild(span);
    });
}

function selectedAList() {
    Array.from(titlesContainer.children).forEach((element, index) => {
        if (index != selectedList) {
            element.classList.remove("bg-black");
        }
    });
    populateList();
}