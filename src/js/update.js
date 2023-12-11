import { createCheckboxContainer, createCard, createEmptyCard } from "./create.js";
import { removeCardElements } from "./utility.js";
import { contentElementsMap } from '../index.js';
import '../css/content.css';

export function updateCard(taskHandler, removedTaskId, taskelementsMap) {
    const cardId = taskHandler.taskStorageId;
    const cardDiv = document.querySelector(`.card[data-id="${cardId}"]`);

    // Store references to child elements
    const childElements = {
        title: cardDiv.querySelector('h3'), 
        button: cardDiv.querySelector('.sub-task'), 
        icon: cardDiv.querySelector('.icon'), 
    };

    // Clear the contents of the cardDiv
    cardDiv.innerHTML = '';
    



    if (taskelementsMap.has(removedTaskId)) {
        taskelementsMap.delete(removedTaskId);
    }

    

    // Re-append child elements
    cardDiv.appendChild(childElements.title);
    cardDiv.appendChild(childElements.button);
    cardDiv.appendChild(childElements.icon);


    taskelementsMap.forEach((checkboxContainer, taskId) => {
        // Check if the dataset ID of the task element matches the card ID
        const taskDatasetId = parseInt(checkboxContainer.dataset.id, 10);
      
        if (taskDatasetId === cardId) {
            cardDiv.appendChild(checkboxContainer);
        }
    });

}


export function updateRemainingContent() {
    const contentContainer = document.querySelector('.main-content');

    removeCardElements(contentContainer);
    
    // Loop through contentElementMap and re-add card elements to the content container
    contentElementsMap.forEach((cardDiv) => {
        contentContainer.appendChild(cardDiv);
    });

    const emptyCard = createEmptyCard();

    contentContainer.appendChild(emptyCard);


}

export function updateAddContent(taskStorage) {
    const contentContainer = document.querySelector('.main-content');

    removeCardElements(contentContainer);

 

    taskStorage.getAllTaskHandlers().forEach((taskHandler) => {
        const cardDiv = createCard(taskHandler);
        contentContainer.appendChild(cardDiv);
    });

    const emptyCard =  createEmptyCard();

    contentContainer.appendChild(emptyCard);


    
}



export function updateTaskCard(taskHandler, newTask) {
    const cardId = taskHandler.taskStorageId;
    const cardDiv = document.querySelector(`.card[data-id="${cardId}"]`);

    // Create checkbox container for the added task

    const checkboxContainer = createCheckboxContainer(taskHandler.taskStorageId, newTask, taskHandler);

    // Append the new checkbox container to the card div
    cardDiv.appendChild(checkboxContainer);
}