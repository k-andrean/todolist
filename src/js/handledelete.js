import { updateCard, updateRemainingContent } from "./update.js";
import { contentElementsMap } from '../index.js';
import { currentPage, cardsPerPage } from "./pagination.js";
import { renderPage } from "./pagination.js";

export function handleDeleteTaskClick(img, taskStorage, taskId, taskElementsMap) {

    const taskHandlerIdString = img.parentElement.dataset.id;
    const taskHandlerId = parseInt(taskHandlerIdString, 10);


    // Get the taskHandler instance from taskStorage
    const taskHandler = taskStorage.getTaskHandlerById(taskHandlerId);

    // Remove the task from the taskHandler
    taskHandler.removeTask(taskId);

    console.log(taskElementsMap);

    updateCard(taskHandler, taskId, taskElementsMap);


}

export function handleDeleteCardClick(img, taskStorage) {
    const taskHandlerIdString = img.parentElement.dataset.id;
    const taskHandlerId = parseInt(taskHandlerIdString, 10);
    const contentContainer = document.querySelector('.main-content');


    // Show the delete task dialog
    const deleteTaskDialog = document.getElementById('deletetaskDialog');
    deleteTaskDialog.showModal();

    // Add event listener to the form submit
    const deleteForm = document.getElementById('delete-form');
    deleteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get the selected radio button value
        const confirmValue = document.querySelector('input[name="confirmation"]:checked').value;

        if (confirmValue === 'yes') {
            // User confirmed, proceed with removing the task handler
            taskStorage.removeTaskHandler(taskHandlerId);

            console.log(contentElementsMap);

            contentElementsMap.delete(taskHandlerId);

            // Close the delete task dialog
            deleteTaskDialog.close();

            // updateRemainingContent(contentElementsMap);
            renderPage(currentPage, taskStorage, contentContainer, cardsPerPage);

        } else {
            
            deleteTaskDialog.close();
        }
    });
}
