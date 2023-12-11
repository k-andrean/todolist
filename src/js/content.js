import '../css/content.css';
import { createEmptyCard } from './create.js';




export function onLoadContent() {
    const contentContainer = document.querySelector('.main-content');
  
    // Check if the empty card is already created
    const emptyCard = createEmptyCard();  
  
  
    contentContainer.appendChild(emptyCard);
  

  }








