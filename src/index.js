import { onLoadContent } from './content.js'; 
import { TaskHandler, TaskStorage } from './task.js';
import { initializeSubmitNewTaskListeners, initializeSubmitNewCardListener, initializeSaveLocalStorage} from './event.js';
import { isEmpty } from './utility.js';
import { updateAddContent } from './update.js';


export const taskElementsMap = new Map();
export const contentElementsMap = new Map();
const taskStorageJson = localStorage.getItem('taskStorage');
export const taskStorage = taskStorageJson ? TaskStorage.fromJSON(JSON.parse(taskStorageJson)) : new TaskStorage();


if (isEmpty(taskStorage)) {
    onLoadContent(emptyCardMap);
} else {
    updateAddContent(taskStorage);
}


initializeSubmitNewCardListener(taskStorage);
initializeSubmitNewTaskListeners(taskStorage);

initializeSaveLocalStorage(taskStorage);




