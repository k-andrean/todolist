import { taskStorage } from "../index.js";
import { createCard, createEmptyCard } from "./create.js";
import { removeCardElements } from "./utility.js";

export let currentPage = 1; 
export const cardsPerPage = 2;


export function renderPage(currentPage, taskStorage, contentContainer, cardsPerPage) {
    removeCardElements(contentContainer);

    const taskHandlers = taskStorage.getAllTaskHandlers();
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;

    taskHandlers.slice(startIndex, endIndex).forEach((taskHandler) => {
        const cardDiv = createCard(taskHandler);
        contentContainer.appendChild(cardDiv);
    });

    const emptyCard = createEmptyCard();
    contentContainer.appendChild(emptyCard);

    updatePagination();
}

export function renderSortPage(currentPage, filteredResult, contentContainer, cardsPerPage) {
    removeCardElements(contentContainer);

    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;

    filteredResult.slice(startIndex, endIndex).forEach((taskHandler) => {
        const cardDiv = createCard(taskHandler);
        contentContainer.appendChild(cardDiv);
    });

    const emptyCard = createEmptyCard();
    contentContainer.appendChild(emptyCard);

    updatePagination();
}


export function goToPage(page) {
    const contentContainer = document.querySelector('.main-content');
    currentPage = Math.min(Math.max(page, 1), Math.ceil(taskStorage.getAllTaskHandlers().length / cardsPerPage) + 1);
    renderPage(currentPage, taskStorage, contentContainer, cardsPerPage);
 }

 
export function sortByDate(contentContainer, taskStorage) {
    const taskHandlers = taskStorage.getAllTaskHandlers();
    console.log(taskStorage);
    // Sort task handlers by date in descending order
    const sortedTaskHandlers = taskHandlers.slice().sort((a, b) => b.dateCreated - a.dateCreated);

    renderSortPage(currentPage, sortedTaskHandlers, contentContainer, cardsPerPage);
}

export function sortByPriority(contentContainer, taskStorage) {
    const taskHandlers = taskStorage.getAllTaskHandlers();

    // Filter task handlers with tasks marked as important
    const importantTaskHandlers = taskHandlers.filter(taskHandler =>
        taskHandler.getTasks().some(task => task.important)
    );

    renderSortPage(currentPage, importantTaskHandlers, contentContainer, cardsPerPage);
}


function updatePagination() {
    const totalCards = taskStorage.getAllTaskHandlers().length + 1; // Including the empty card
    const totalPages = Math.ceil(totalCards / cardsPerPage);
    const pageIndicator = document.querySelector('.page-indicator');
    const prevPageButton = document.querySelector('.prev-page');
    const nextPageButton = document.querySelector('.next-page');
 
    pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
 
    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = currentPage === totalPages;
 }


