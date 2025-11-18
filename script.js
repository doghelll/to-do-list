/// Temporary storage for todo items
let todos = [];

function addTodo() {
    const todoInput = document.getElementById("todo-input");
    const todoDate = document.getElementById("todo-date");

    /// Validation
    if (todoInput.value === '' || todoDate.value === '') {
        alert("Please fill in both fields.");
    } else {
        /// Add todo item to the list
        todos.push({ text: todoInput.value, date: todoDate.value, });
        todoInput.value = '';
        todoDate.value = '';

        renderTodos();
    }
}

/// Function to render todo items to the DOM
function renderTodos() {
    /// Get the todo list container
    const todoList = document.getElementById('todo-list');

    // Clear existing list
    todoList.innerHTML = '';

    // Render each todo item
    todos.forEach((todo, _) => {
        todoList.innerHTML += `
        <li>
            <p class="text-2xl">${todo.text} <span class="text-sm text-gray-500">(${todo.date})</span></p>
            <hr />
        </li>`;
    });
}

/// Function to clear all todo items
function clearTodos() {
    todos = [];
    renderTodos();
}

/// Placeholder for future filter functionality
function filterTodos() {
   const filterBox = document.getElementById("filter-options");

    // Kalau sudah muncul → klik lagi untuk menutup
    if (filterBox.innerHTML.trim() !== "") {
        filterBox.innerHTML = "";
        return;
    }

    filterBox.innerHTML = `
        <button class="border rounded p-2 bg-gray-200" onclick="filterBy('today')">Hari Ini</button>
        <button class="border rounded p-2 bg-gray-200 ml-2" onclick="filterBy('future')">Akan Datang</button>
        <button class="border rounded p-2 bg-gray-200 ml-2" onclick="filterBy('past')">Masa Lalu</button>
    `;
}

document.getElementById("todo-input").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault(); 
        document.getElementById("todo-date").focus();
    }
});

document.getElementById("todo-date").addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        addTodo();
    }
});

document.getElementById("todo-input").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        const dateInput = document.getElementById("todo-date");
        dateInput.focus();
        dateInput.showPicker(); // kalender langsung muncul
    }
});

function filterBy(type) {
    const today = new Date().toISOString().split("T")[0];
    let filtered = [];

    if (type === "today") {
        filtered = todos.filter(todo => todo.date === today);
    }
    else if (type === "future") {
        filtered = todos.filter(todo => todo.date > today);
    }
    else if (type === "past") {
        filtered = todos.filter(todo => todo.date < today);
    }

    // render hasil filter
    const todoList = document.getElementById("todo-list");
    todoList.innerHTML = "";

    if (filtered.length === 0) {
        todoList.innerHTML = "<li>No matching tasks.</li>";
        return;
    }

    filtered.forEach(todo => {
        todoList.innerHTML += `
            <li>
                <p class="text-2xl">${todo.text}
                <span class="text-sm text-gray-500">(${todo.date})</span></p>
                <hr />
            </li>
        `;
    });
}
