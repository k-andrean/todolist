import { onLoadContent } from './js/content.js'; 
import { TaskHandler, TaskStorage } from './js/task.js';
import { 
    initializeSubmitNewTaskListeners, 
    initializeSubmitNewCardListener, 
    initializeSaveLocalStorage,
    initializeCloseDialogButtonListener,
    initializePageButtonListener,
    initializeSortIconListener,
    initializeSortButtonListener
} 
from './js/event.js';
import { isEmpty } from './js/utility.js';
import { updateAddContent } from './js/update.js';
import { renderPage } from './js/pagination.js';
import { currentPage, cardsPerPage } from './js/pagination.js';
import './css/content.css';


export const taskElementsMap = new Map();
export const contentElementsMap = new Map();
const taskStorageJson = localStorage.getItem('taskStorage');
export const taskStorage = taskStorageJson ? TaskStorage.fromJSON(JSON.parse(taskStorageJson)) : new TaskStorage();
const contentContainer = document.querySelector('.main-content');

if (isEmpty(taskStorage)) {
    onLoadContent(emptyCardMap);
} else {
    // updateAddContent(taskStorage);
    
    renderPage(currentPage, taskStorage, contentContainer, cardsPerPage);
}


initializeSubmitNewCardListener(taskStorage);
initializeSubmitNewTaskListeners(taskStorage);
initializeCloseDialogButtonListener();
initializePageButtonListener();
initializeSortIconListener();
initializeSortButtonListener(contentContainer, taskStorage);

initializeSaveLocalStorage(taskStorage);




