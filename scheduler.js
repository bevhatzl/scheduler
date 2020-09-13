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
            let currentElVal = Number(currentEl.attr("id"));
            if (currentHour > currentElVal) {
                currentEl.addClass("past");
            } else if (currentHour === currentElVal) {
                currentEl.addClass("present");
            } else {
                currentEl.addClass("future");
            }
        }
    }

    function getStoredTodos() {
    // If Todos were retrieved from localStorage, set it to the array
        if (storedTodos != null) {
            storedTodosArray = storedTodos;
            // display the Todo list based on data in local storage
            for (let i = 0; i < storedTodosArray.length; i++) {
                // let blockDiv = document.getElementById(storedTodosArray[i].id); Vanilla JS                
                // blockDiv.firstChild.nextSibling.value = storedTodosArray[i].value;  Vanilla JS
                $("#"+storedTodosArray[i].id).children().first()[0].value = storedTodosArray[i].value;
                // jQuery to replace the 2 lines of Vanilla JS above
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