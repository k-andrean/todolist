import { TaskHandler, TaskStorage } from './task.js';
import { updateTaskCard, updateAddContent } from './update.js';
import { handleDeleteTaskClick, handleDeleteCardClick } from './handledelete.js';
import { renderPage, goToPage, sortByDate, sortByPriority } from './pagination.js';
import { currentPage, cardsPerPage } from "./pagination.js";


export function initializeSaveLocalStorage(taskStorage){

    const saveButton = document.querySelector('.save-button');

    saveButton.addEventListener('click', () => {
        localStorage.setItem('taskStorage', JSON.stringify(taskStorage.toJSON()));
    });
}


export function initializeAddCardListener(emptyCard){
    const dialog = document.getElementById('todoDialog');
   
    emptyCard.addEventListener('click',()=>{
        dialog.showModal();
    })
    
}

export function initializeSubmitNewCardListener(taskStorage) {
    const dialog = document.getElementById('todoDialog');
    const submitTaskButton = document.querySelector('.submit-task');
    const taskTitleInput = document.getElementById('task-title');
    const taskDescInput = document.getElementById('task-action');
    const radioButtons = dialog.querySelectorAll('form input[name="answer"]');
    const contentContainer = document.querySelector('.main-content');

    submitTaskButton.addEventListener('click', (e) => {
        e.preventDefault();

        const taskTitle = taskTitleInput.value;
        const taskDesc = taskDescInput.value;

        let selectedValue = Array.from(radioButtons).find((radioButton) => radioButton.checked);

        if (selectedValue) {
            selectedValue = selectedValue.value;
        }

        const taskHandler = new TaskHandler(taskTitle);

        taskHandler.addTask(taskDesc, selectedValue);

        taskStorage.addTaskHandler(taskHandler);
        console.log(taskStorage);

        // updateAddContent(taskStorage);
        renderPage(currentPage, taskStorage, contentContainer, cardsPerPage);

        taskTitleInput.value = '';
        taskDescInput.value = '';

        dialog.close();
    });
}


export function initializeSubmitNewTaskListeners(taskStorage) {
    const addTaskDialog = document.getElementById('addtaskDialog');
    const addNewTask = document.getElementById('addsubTask');
    const submitNewTask = document.querySelector('.submit-new');
    const radioButtons = addTaskDialog.querySelectorAll('form input[name="answer"]');


    submitNewTask.addEventListener('click', (e) => {
        e.preventDefault();
        const currentTaskHandlerIdString = e.target.dataset.id;
        console.log(currentTaskHandlerIdString);
        const currentTaskHandlerId = parseInt(currentTaskHandlerIdString, 10);
        const currentTaskHandler = taskStorage.getTaskHandlerById(currentTaskHandlerId);
        const newTask = addNewTask.value;
        let selectedValue = Array.from(radioButtons).find((radioButton) => radioButton.checked);

        if (selectedValue) {
            selectedValue = selectedValue.value;
        }

        const addedTask = currentTaskHandler.addTask(newTask, selectedValue);

        addNewTask.value = '';
        addTaskDialog.close();

        // Update the card after adding a new task
        updateTaskCard(currentTaskHandler, addedTask);
    });
}

export function initializeAddTaskListener(addTaskButton){
    const submitNewTask = document.querySelector('.submit-new');
    const addTaskDialog = document.getElementById('addtaskDialog');

    if (addTaskButton) {
        addTaskButton.addEventListener('click', () => {
            const dataId = addTaskButton.parentElement.dataset.id;
            console.log(dataId);
            submitNewTask.dataset.id = dataId;
            addTaskDialog.showModal();
        });
    }
}

export function initializeTaskCheckboxListener(taskCheckbox, task, taskHandler) {
    taskCheckbox.addEventListener('change', () => {
        const updateTask = taskHandler.getTaskById(task.id);
        updateTask.markComplete();
        taskCheckbox.nextElementSibling.style.textDecoration = 'line-through';
        taskCheckbox.disabled = true;
    });
}

export function initializeCheckboxContainerListener(checkboxContainer, imgElement) {
    checkboxContainer.addEventListener('mouseover', () => {
        imgElement.style.display = 'inline';
    });

    checkboxContainer.addEventListener('mouseout', () => {
        imgElement.style.display = 'none';
    });
}


export function initializeHandleDeleteTaskListener(img, taskStorage, taskId, taskElementsMap){
    img.addEventListener('click', () => {
        handleDeleteTaskClick(img, taskStorage, taskId, taskElementsMap);
    });
}

export function initializeHandleDeleteCardListener(img, taskStorage){
    img.addEventListener('click', () => {
        handleDeleteCardClick(img, taskStorage);
    });
}


export function initializeCloseDialogButtonListener(){
    const closeButtonElements = document.querySelectorAll('.close-button');


    closeButtonElements.forEach((closeButton) => {
        closeButton.addEventListener('click', () => {
            // Get the parent dialog of the clicked close button
            const parentDialog = closeButton.closest('dialog');

            // Check if the parentDialog exists before attempting to close
            if (parentDialog) {
                parentDialog.close();
            }
        });
    });
}


export function initializePageButtonListener(){
    const prevPageButton = document.querySelector('.prev-page');
    const nextPageButton = document.querySelector('.next-page');

    prevPageButton.addEventListener('click', () => {
        goToPage(currentPage - 1);
     });
     
    nextPageButton.addEventListener('click', () => {
        goToPage(currentPage + 1);
     });
}

export function initializeSortIconListener(){
    const sortingIcon = document.getElementById('sortingIcon');
    const sortingContainer = document.querySelector('.sorting-container');

    sortingIcon.addEventListener('click', () => {
        sortingContainer.classList.toggle('show-dropdown');
    });
}

export function initializeSortButtonListener(contentContainer, taskStorage){
    const sortingDropdown = document.getElementById('sortingDropdown');
    const sortingContainer = document.querySelector('.sorting-container');

    sortingDropdown.addEventListener('change', () => {
        const selectedValue = sortingDropdown.value;
    
        if (selectedValue === 'date') {
            sortByDate(contentContainer, taskStorage);
        } else if (selectedValue === 'priority') {
            sortByPriority(contentContainer, taskStorage);
        }
    
        // Hide the dropdown after selecting an option
        sortingContainer.classList.remove('show-dropdown');
    });
    
    // Close the dropdown if the user clicks outside of it
    document.addEventListener('click', (event) => {
        if (!sortingContainer.contains(event.target)) {
            sortingContainer.classList.remove('show-dropdown');
        }
    });
}