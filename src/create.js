import { 
    initializeAddTaskListener, 
    initializeTaskCheckboxListener, 
    initializeCheckboxContainerListener,
    initializeHandleDeleteTaskListener,
    initializeHandleDeleteCardListener, 
    initializeAddCardListener
} 
from './event.js';

import { taskStorage, taskElementsMap, contentElementsMap } from './index.js';
import Delete from './images/delete.svg';
import DeleteIcon from './images/deletecard.svg';

export function createCard(taskHandler) {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    cardDiv.dataset.id = taskHandler.taskStorageId;
   
    
    createCardTitle(cardDiv, taskHandler.title);

    taskHandler.getTasks().forEach((task) => {
        const checkboxContainer = createCheckboxContainer(taskHandler.taskStorageId, task, taskHandler);
        cardDiv.appendChild(checkboxContainer);
    });

    const deleteIcon = createDeleteCard(DeleteIcon, 'Delete-card', 'icon');
    cardDiv.appendChild(deleteIcon);

    const addTaskButton = createAddTaskButton();
    initializeAddTaskListener(addTaskButton);
    cardDiv.appendChild(addTaskButton);

    contentElementsMap.set(taskHandler.taskStorageId, cardDiv);


    return cardDiv;
}


function createCardTitle(cardDiv, title) {
    const cardTitle = document.createElement('h3');
    cardTitle.textContent = title;
    cardDiv.appendChild(cardTitle);
}

export function createEmptyCard(){
    const emptyCard = document.createElement('div');
    emptyCard.classList.add('card', 'empty');

    initializeAddCardListener(emptyCard);

    return emptyCard;
}


export function createCheckboxContainer(taskHandlerId, task, taskHandler) {
    const taskCheckbox = document.createElement('input');
    taskCheckbox.type = 'checkbox';
    taskCheckbox.id = `task-${task.id}`;
    taskCheckbox.checked = task.completed;

    initializeTaskCheckboxListener(taskCheckbox, task, taskHandler);

    const taskDescription = document.createElement('label');
    taskDescription.textContent = task.description;


    if (task.important) {
        taskDescription.classList.add('important-task');
    }

    const imgElement = createDeleteTask(Delete, 'Delete Icon', 'small-icon', task.id, taskElementsMap);

    const checkboxContainer = document.createElement('div');
    checkboxContainer.classList.add('check-task');
    checkboxContainer.dataset.id = taskHandlerId;
    checkboxContainer.appendChild(taskCheckbox);
    checkboxContainer.appendChild(taskDescription);
    checkboxContainer.appendChild(imgElement);

    taskElementsMap.set(task.id, checkboxContainer);

    initializeCheckboxContainerListener(checkboxContainer, imgElement);

    return checkboxContainer;
}


function createAddTaskButton() {
    const addTaskButton = document.createElement('button');
    addTaskButton.classList.add('sub-task');
    addTaskButton.textContent = 'Add Sub Task';
    return addTaskButton;
}

function createDeleteTask(image, altText, className, taskId, taskElementsMap) {
    const img = document.createElement('img');
    img.classList.add(className);
    img.src = image;

    img.setAttribute('alt', altText);

    // Add click event listener to the button
    initializeHandleDeleteTaskListener(img, taskStorage, taskId, taskElementsMap)

    return img;
}


function createDeleteCard(image, altText, className) {
    const img = document.createElement('img');
    img.classList.add(className);
    img.src = image;

    img.setAttribute('alt', altText);

    // Add click event listener to the button
    initializeHandleDeleteCardListener(img, taskStorage)

    return img;
}