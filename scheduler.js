$(document).ready(function() {
    // get stored Todo List from local storage
    let storedTodos = JSON.parse(localStorage.getItem("todo"));
    let storedTodosArray = [];
    const localStorageName = "todo"

    initialiseCalendar();
    
    getStoredTodos();

    function initialiseCalendar() {
        // display current date
        $("#currentDay").text(moment().format('Do MMMM YYYY'));
        // get time of day
        let currentHour = moment().get('hour');   // returns a number
        let timeBlockEls = $('.time-block');
        // set colour codes to time blocks
        for (let i = 0; i <= 9; i++) {
            let currentEl = timeBlockEls.eq(i);
            let currentElVal = Number(currentEl.attr("value"));
            if (currentHour > currentElVal) {
              currentEl.css('background-color', '#e6e6e6');
            } else if (currentHour === currentElVal) {
                currentEl.css('background-color', '#ff4d4d');
            } else {
                currentEl.css('background-color', '#5cd65c');
            }
        }
    }

    function getStoredTodos() {
    // If Todos were retrieved from localStorage, set it to the array
        if (storedTodos != null) {
            storedTodosArray = storedTodos;
            // display the Todo list based on data in local storage
            for (let i = 0; i < storedTodosArray.length; i++) {
                let blockDiv = document.getElementById(storedTodosArray[i].id);
                blockDiv.firstChild.nextSibling.value = storedTodosArray[i].value;
            }
        }
    }

    function saveLocalStorage(id, value){
        // check if the time-block already has text content
        const result = validateArrayFound(id, value);
        // if no content, push new item to the array & send to storage
        if (!result){
            storedTodosArray.push({id, value});
        }        
        localStorage.setItem(localStorageName, JSON.stringify((storedTodosArray)));
    }

    function validateArrayFound(idValue, newValue){
        // search through array based on time-block id
        const objectFound = storedTodosArray.find(({ id }) => id === idValue);
        // if time-block already has content... update the value instead of push to array
        if (objectFound != undefined) {
            storedTodosArray[storedTodosArray.indexOf(objectFound)].value = newValue;
            return true;
        } 
    }

    /*
    // event listener for clicking on timeblock
    $(".time-block").on("click", function(event) {
        event.preventDefault();
        // get the id of the clicked element
        let index = $(this).attr('value');
        let inputId = "input-" + index;           
    });    */

    
    // event handler for clicking on save button
    $(".saveBtn").on("click", function(event) {
        event.preventDefault();
        // get the key and value pairs
        let storedIndex = $(this).prev()[0].id;
        let storedValue = $(this).prev()[0].firstChild.nextSibling.value;
        // send the key value pair to local storage
        saveLocalStorage(storedIndex, storedValue);
    });

});