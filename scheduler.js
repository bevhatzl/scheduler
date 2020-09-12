$(document).ready(function() {
    // get stored plans from local storage
    let storedTodos = JSON.parse(localStorage.getItem("storedTodos"));
    let storedTodosArray = [];

    initialiseCalendar();
    
    // function call here for a function to get data from and display local storage
    getStoredTodos();



// display current date and get time of day and set colour codes to timeblocks
    function initialiseCalendar() {
        $("#currentDay").text(moment().format('Do MMMM YYYY'));
        let currentHour = moment().get('hour');   // returns a number
        let timeBlockEls = $('.time-block');
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
    // If plans were retrieved from localStorage, update the plan array to it
        if (storedTodos !== null) {
            storedTodosArray = storedTodos;
        } 
    }


    //event listener for clicking on timeblock
    $(".time-block").on("click", function(event) {
        event.preventDefault();
        // get the id of the clicked element
        let index = $(this).attr('value');
        let inputId = "#input-" + index;
        // enable the text box in that element
        $(inputId).removeAttr("disabled");
        // validate text to make sure code is not entered
        // concatentate the text entered to existing text
        //$(inputId).text += $(this).value;


           //   secondNumber += $(this).val();
          //    $("#second-number").text(secondNumber);
        //  let inputId = '#input-' + index;
       //   let value = $(inputId).val();

        localStorage.setItem("storedTodos", JSON.stringify(storedTodosArray));
            
    });



    // event handler for clicking on save button




});