const hello = "hello world";

let list = ["I", "Am", "a", "list"];

(() => {
    populateList();
})();

function createToDo() {
    let toDoText = document.getElementById("toDoInput");
    list.push(toDoText.textContent);
}

function createList() {
    let listTitle = document.getElementById("listInput");
}

function listChanged() {
    
}

function populateList() {
    const container = document.getElementById("listContainer");
    let borderDiv = document.createElement("div");
    borderDiv.classList.add("flex", "justify-center", "items-center", "p-1", "h-12", "bg-linear-to-r", "from-cyan-500/50", "to-blue-500/50", "rounded-2xl", "backdrop-blur-xs");
    let contentDiv = document.createElement("div");
    contentDiv.classList.add("flex", "justify-center", "items-center", "bg-white/20", "w-full", "h-full", "rounded-xl", "backdrop-blur-xs");
    list.forEach(element => {
        let borderClone = borderDiv.cloneNode();
        let contentClone = contentDiv.cloneNode();
        contentClone.textContent = element
        container.appendChild(borderClone);
        borderClone.appendChild(contentClone);
    });
}