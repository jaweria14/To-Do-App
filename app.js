const myBtn = document.querySelector('.task-btn');
const viewBtn = document.querySelector('.view-btn');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// app.html
if (myBtn) {
    myBtn.addEventListener('click', (evt) => {
        evt.preventDefault();

        let myTask = document.querySelector('.form form input');
        let myVal = myTask.value.trim();

        if (myVal === '') {
            alert('Enter the task first');
            return;
        }

        tasks.push(myVal);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        alert(`${myVal} has been added successfully`);
        myTask.value = '';
    });
}

// View button
if (viewBtn) {
    viewBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'view.html';
    });
}

// view.html
const myData = document.querySelector('tbody');

if (myData) {
   tasks.forEach((task, index) => {
    const row = document.createElement('tr');

    row.dataset.index = index;

    row.innerHTML = `
        <td>${task}</td>
        <td>
            <button type="button" class="delete-btn">Delete</button>
            <button type="button" class="edit-btn">Edit</button>
        </td>
    `;

    myData.appendChild(row);
});
}

myData.addEventListener('click', (e) => {

    // DELETE
    if (e.target.classList.contains('delete-btn')) {

        const row = e.target.closest('tr');
        const index = row.dataset.index;

        tasks.splice(index, 1);

        localStorage.setItem('tasks', JSON.stringify(tasks));

        row.remove();
    }

    // EDIT
    if (e.target.classList.contains('edit-btn')) {

        const row = e.target.closest('tr');
        const index = row.dataset.index;

        const updatedTask = prompt(
            'Enter updated task:',
            tasks[index]
        );

        if (updatedTask && updatedTask.trim() !== '') {

            tasks[index] = updatedTask.trim();

            localStorage.setItem(
                'tasks',
                JSON.stringify(tasks)
            );

            row.children[0].innerText = updatedTask;
        }
    }
});
