const container = document.getElementById("listContainer");
const titlesContainer = document.getElementById("titlesContainer");
const listTitleInput = document.getElementById("listInput");
const toDoInput = document.getElementById("toDoInput");

let list = [{title: "example", content: ["Buy groceries","Call mom","Workout","Read a book","Plan weekend trip","Reply to emails","Water plants","Learn JavaScript","Cook dinner"]}];
let selectedList = 0;
let selectedColor = "bg-cyan-800/50";
let hover = "hover:bg-gray-600/50";
let listStorageKey = "To-Do Lists";
let selectedListKey = "Selected List";

(() => {
    retrieveLists();
    addKeyPressListeners();
})();

function addKeyPressListeners() {
    listTitleInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            toDoInput.focus();
            createList();
        }
    });
    toDoInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            createToDo();
        }
    });
}

function createToDo() {
    if (toDoInput.value != "") {
        list[selectedList].content.push(toDoInput.value);
        toDoInput.value = "";
        populateList();
        storeAll();
    }
}

function createList() {
    if (listTitleInput != "") {
        list.push({title: listTitleInput.value, content: []})
        listTitleInput.value = "";
        selectedList = list.length - 1;
        selectedAList();
        populateListTitles();
        storeAll();
    }
}

function populateList() {
    container.innerHTML = "";
    let borderDiv = document.createElement("div");
    borderDiv.classList.add("flex", "justify-center", "items-center", "p-1", "bg-linear-to-r", "from-cyan-500/50", "to-blue-500/50", "rounded-2xl", "backdrop-blur-xs");
    let contentDiv = document.createElement("div");
    contentDiv.classList.add("flex", "justify-between", "items-center", "bg-white/20", "w-full", "h-full", "rounded-xl", "backdrop-blur-xs", "px-5", "py-2", "overflow-clip");
    if (list[selectedList] != undefined) {
        list[selectedList].content.forEach((element, index) => {
            let borderClone = borderDiv.cloneNode();
            let contentClone = contentDiv.cloneNode();
            let trashCan = document.createElement("span");
            trashCan.classList.add("material-symbols-outlined", "cursor-pointer");
            trashCan.textContent = "delete";
            trashCan.addEventListener("click", () => {
                list[selectedList].content.splice(index, 1);
                populateList();
                storeList();
            });
            contentClone.textContent = element;
            container.appendChild(borderClone);
            borderClone.appendChild(contentClone);
            contentClone.appendChild(trashCan);
        });
    }
}

function populateListTitles() {
    titlesContainer.innerHTML = "";
    list.forEach((element, index) => {
        let span = document.createElement("span");
        span.classList.add("flex", "justify-between", "text-xl", hover, "rounded-xl", "p-5");
        span.textContent = element.title.toLocaleUpperCase()[0] + element.title.slice(1);
        if (selectedList == index) {
            selectedModifier(span);
        }
        span.addEventListener("click", () => {
            selectedList = index;
            selectedModifier(span);
            selectedAList();
        });
        let trashCan = document.createElement("span");
        trashCan.classList.add("material-symbols-outlined", "cursor-pointer");
        trashCan.textContent = "delete";
        trashCan.addEventListener("click", () => {
            list.splice(index, 1);
            selectedList--;
            populateListTitles();
            storeAll();
        });
        titlesContainer.appendChild(span);
        span.appendChild(trashCan);
    });
}

function selectedAList() {
    Array.from(titlesContainer.children).forEach((element, index) => {
        if (index != selectedList) {
            deselectedModifier(element);
        }
    });
    populateList();
}

function selectedModifier(element) {
    element.classList.add(selectedColor);
    element.classList.remove(hover);
    storeIndex();
}

function deselectedModifier(element) {
    element.classList.remove(selectedColor);
    element.classList.add(hover);
    storeIndex();
}

function refreshPage() {
    populateList();
    populateListTitles();
}

function storeList() {
    localStorage.setItem(listStorageKey, JSON.stringify(list));
}

function storeIndex() {
    localStorage.setItem(selectedListKey, JSON.stringify(selectedList));
}

function storeAll() {
    localStorage.setItem(listStorageKey, JSON.stringify(list));
    localStorage.setItem(selectedListKey, JSON.stringify(selectedList));
}

function retrieveLists() {
    let storedList = localStorage.getItem(listStorageKey);
    let storedListIndex = localStorage.getItem(selectedListKey);
    if (storedList != null && storedListIndex != null) {
        list = JSON.parse(storedList);
        selectedList = JSON.parse(storedListIndex);
        refreshPage();
    } else {
        refreshPage();
    }
}