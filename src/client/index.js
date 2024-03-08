//Import statements
import "./styles/main.scss";

import { addTrip } from "./js/app.js";
import Athens from "../client/image/Athens.jpg";
import Barcelona  from "../client/image/Barcelona.jpg";
import France from "../client/image/France.jpg";
import background from "../client/image/background.jpg";
export { addTrip };


// event listener for the ADD / DELETE Trip buttons
document.addEventListener('DOMContentLoaded', function() {
  const addTripTDButton = document.getElementById('addTripTDButton');
  const deleteTripTDButton = document.getElementById('deleteTripTDButton');
  const tripInput = document.getElementById('tripInput');
  const tripList = document.getElementById('tripList');

  addTripTDButton.addEventListener('click', function(e) {
    e.preventDefault();
    const tripText = tripInput.value.trim();

    if (tripText === '') {
      return;
    }

    const li = document.createElement('li');
    const tripTextElement = document.createTextNode(tripText);
    li.appendChild(tripTextElement);

    const removeButton = document.createElement('button');
    removeButton.innerText = '';
    removeButton.classList.add('removeTaskButton');
    removeButton.addEventListener('click', removeTask);

    li.appendChild(removeButton);
    tripList.appendChild(li);

    tripInput.value = '';
  });

  function removeTask(event) {
    const taskItem = event.target.parentElement;
    taskItem.remove();
  }

  deleteTripTDButton.addEventListener('click', function() {
    tripList.innerHTML = '';
  });
});