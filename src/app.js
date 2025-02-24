const container = document.getElementById("listContainer");
let list = [
  "Buy groceries",
  "Call mom",
  "Workout",
  "Read a book",
  "Plan weekend trip",
  "Reply to emails",
  "Water plants",
  "Learn JavaScript",
  "Cook dinner"
];

(() => {
    populateList();
})();

function createToDo() {
    let toDoInput = document.getElementById("toDoInput");
    list.push(toDoInput.value);
    toDoInput.value = "";
    container.innerHTML = "";
    populateList();
}

function createList() {
    let listTitle = document.getElementById("listInput");
}

function populateList() {
    let borderDiv = document.createElement("div");
    borderDiv.classList.add("flex", "justify-center", "items-center", "p-1", "h-12", "bg-linear-to-r", "from-cyan-500/50", "to-blue-500/50", "rounded-2xl", "backdrop-blur-xs");
    let contentDiv = document.createElement("div");
    contentDiv.classList.add("flex", "items-center", "bg-white/20", "w-full", "h-full", "rounded-xl", "backdrop-blur-xs", "pl-5");
    list.forEach(element => {
        let borderClone = borderDiv.cloneNode();
        let contentClone = contentDiv.cloneNode();
        contentClone.textContent = element
        container.appendChild(borderClone);
        borderClone.appendChild(contentClone);
    });
}