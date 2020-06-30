//Bugs :-
// Why the jQuery() is not activating when reminder is enterted using the enter key ?
// How to nest select-lists ??



const addExtnBttn = document.getElementById("addExtensions");
const addRemBttn = document.getElementById("addReminder");
const inputReminder = document.getElementById("input-reminder");
const reminderList = document.getElementById("reminderList");
const Extensions = document.getElementById("extensions");
const extnDescription = document.getElementById("description");
const dateButton = document.getElementById("dateButton");
const timeButton = document.getElementById("timeButton");
const dayButton = document.getElementById("dayButton");

var new_ionItem;
var new_ionCard;    // The card inside the ion-item
var extn_body;  // The ion-list containing all the categories and description
var extn_bttns; // The ion-list containing the ion-items which inturn contains the big-buttons
var buttonItem; // The big buttons

var deleteIcon; 
var completeIcon;
var modifyIcon;
var burgerIcon;

var priorityItem; 
var categoryItem;
var repetitionItem;
var typeItem;
var descriptionItem;

var selectedRepeat;
var Category;   // The dictionary
var selectedCategory;   // The selected value 
var Type;   // The dictionary
var selectedType;   // The selected value 

var selectedDate;
var selectedTime;
var displayTime;

//Showing the extensions 
addExtnBttn.addEventListener("click" ,function(){
    $(Extensions).slideToggle(500)

    if(selectedRepeat == "Daily" || selectedRepeat == "Weekly"){
        dateButton.setAttribute("disabled : true")
    } else if(selectedRepeat == "Once" || selectedRepeat == "Yearly"){
        dayButton.setAttribute("disabled : true")
    }

})

addRemBttn.addEventListener("click" ,addReminder)
addRemBttn.addEventListener("click" ,jQuery)
addRemBttn.addEventListener("click" ,addPriority)
addRemBttn.addEventListener("click" ,addCategory)
addRemBttn.addEventListener("click" ,addRepeat)
addRemBttn.addEventListener("click" ,addType)
addRemBttn.addEventListener("click" ,addDescribtion)
//This to hide the extension div, so that it does not remain open
addRemBttn.addEventListener("click" ,function(){
    $(Extensions).slideUp(500)
})

inputReminder.addEventListener("keypress", function(e){
    if(e.which == 13)
    {   // Carry out the following functions
        jQuery() && addReminder() && addPriority() && addCategory() && addRepeat() && addDescribtion() ;
    }
})

function addReminder ()
{
    //checking for a valid input
    if(!(inputReminder.value) || !(document.getElementsByClassName("aux-input")[5].value))
    {
        alert("You cannot leave the title and/or the time empty !!")
        return;
    }

    //creating the new ion-item
    new_ionItem = document.createElement("ion-item");
    new_ionCard = document.createElement("ion-card")
    new_ionItem.textContent = inputReminder.value
    new_ionItem.classList.add("newItem")
    new_ionItem.setAttribute("lines", "none")
    //appending delete icon, modify icon, complete icon and the burger i.e. minibar
    $(new_ionItem).append('<ion-button slot="end" style="margin:0" fill="clear"><ion-icon name="trash-outline" size="large" style="height:28px;color:red" class="delete"></ion-icon></ion-button>')
    $(new_ionItem).append('<ion-button slot="end" style="margin:0" fill="clear"><ion-icon name="pencil-sharp" size="large" style="height:28px;color:darkorange" class="modify"></ion-icon></ion-button>')
    $(new_ionItem).append('<ion-button slot="end" style="margin:0" fill="clear"><ion-icon name="checkmark-done" size="large" style="height:28px;color:green" class="complete"></ion-icon></ion-button>')
    $(new_ionItem).append('<ion-button slot="end" style="margin:0" fill="clear"><ion-icon name="menu" size="large" style="height:28px" id="burger"></ion-icon></ion-button>')

    //Creating the extension list
    extn_list = document.createElement("ion-list")
    $(extn_list).css({"display" : "none"})
    extn_body = document.createElement("ion-list") //This will contain all the details
    extn_bttns = document.createElement("ion-list") //This will contai all the buttons

    // Creating the big buttons    
    buttonItem = document.createElement("ion-item");
    buttonItem.setAttribute("lines", "none")
    $(buttonItem).append('<ion-button class="delete" fill="outline" color="danger" slot="start" style="margin:0 3px; height: 35px; width: 95px;"> <h6 style="margin:0;color:red;">Delete</h6></ion-button>')

    $(buttonItem).append('<ion-button class="modify" fill="outline" color="warning" slot="start" style="margin:0 3px; height: 35px; width: 95px;"> <h6 style="margin:0;color:darkorange;">Modify</h6></ion-button>')

    $(buttonItem).append('<ion-button class="complete" fill="outline" color="success" slot="start" style="margin:0 3px; height: 35px; width: 105px;"> <h6 style="margin:0;color:green">Complete</h6></ion-button>')
    extn_bttns.appendChild(buttonItem)

    // First adding the extn_body, then adding the extn_bttns
    extn_list.appendChild(extn_body)
    extn_list.appendChild(extn_bttns)


    //Appending the name/title(new_ionItem) and the describtion(extm_item) to the card
    new_ionCard.appendChild(new_ionItem)
    new_ionCard.appendChild(extn_list)

    //Appending the final card to the list
    reminderList.appendChild(new_ionCard)

    //Resetting the text values
    inputReminder.value = "";
    return;
}

function addPriority(){
    priorityItem = document.createElement("ion-item")
    priorityItem.setAttribute("lines", "none")
    $(priorityItem).append('<ion-icon slot="start" size="large" name="flag-sharp" style="margin:0 5px; color:red;"></ion-icon>')
    $(priorityItem).append(' <h4 style="margin: 0 65px; color:red ">IMPORTANT</h4> ')
    $(priorityItem).append('<ion-icon slot="end" size="large" name="flag-sharp" style="margin:0 5px; color:red;"></ion-icon>')

    if(document.getElementsByClassName("aux-input")[1].value == "on"){
        extn_body.appendChild(priorityItem)
    }
}

function addCategory(){
    categoryItem = document.createElement("ion-item")
    selectedCategory = document.getElementsByClassName("aux-input")[0].value
    Category = {
        "General" : '<ion-icon slot="start" size="large" style="margin:0" name="apps-outline"></ion-icon><h6 style="margin-left:20px">General</h6>',

        "Home" : '<ion-icon slot="start" size="large" style="margin:0" name="home-outline"></ion-icon><h6 style="margin-left:20px">Home</h6>',

        "Work" : '<ion-icon slot="start" size="large" style="margin:0" name="folder-outline"></ion-icon><h6 style="margin-left:20px">Work</h6>',

        "Personal" : '<ion-icon slot="start" size="large" style="margin:0" name="person-outline"></ion-icon><h6 style="margin-left:20px">Personal</h6>',

        "Birthday" : '',

        "Fest" : '<ion-icon slot="start" size="large" style="margin:0" name="calendar-outline"></ion-icon><h6 style="margin-left:20px">Festival / Holiday</h6>'
    }

    $(categoryItem).append(Category[selectedCategory])
    extn_body.appendChild(categoryItem)
}

function addRepeat(){
    repetitionItem = document.createElement("ion-item")
    selectedRepeat = document.getElementsByClassName("aux-input")[2].value
    $(repetitionItem).append('<ion-icon slot="start" size="large" name="repeat" style="margin:0">         </ion-icon><h6 style="margin-left:20px">' + selectedRepeat + '</h6>' )
    extn_body.appendChild(repetitionItem)
}

function addType(){
    typeItem = document.createElement("ion-item")
    selectedType = document.getElementsByClassName("aux-input")[3].value;
    Type = {
        "Alarm" : '<ion-icon slot="start" size="large" name="alarm-outline" style="margin:0"></ion-icon><h6 style="margin-left:20px"> Alarm ',

        "Notification" : '<ion-icon slot="start" size="large" name="notifications-outline" style="margin:0"></ion-icon><h6 style="margin-left:20px"> Notification '
    }
    // Getting the date from the user
    selectedDate = new Date(document.getElementsByClassName("aux-input")[4].value);
    year = selectedDate.getFullYear();
    month = selectedDate.toLocaleString('default', { month: 'short' })
    date = selectedDate.getDate();

    //Getting the time from the user
    selectedTime = new Date(document.getElementsByClassName("aux-input")[5].value);
    hours = selectedTime.getHours()
    mins = selectedTime.getMinutes()
    if(mins < 10){
        minutes = '0' + mins
    }
    else{
        minutes = mins
    }
    if(hours == 0 ){
        displayTime = (hours+12) + ':' + minutes  + ' AM'
    }
    else if(hours < 12){
        displayTime = hours + ':' + minutes  + ' AM'
    }
    else if(hours > 12){
        displayTime = (hours-12) + ':' + minutes + ' PM'
    }
    else if( hours == 12 && minutes == 00 ){
        displayTime = hours + ':' + minutes  + ' Noon'
    }
    else if( hours == 12 && minutes > 0 ){
        displayTime = hours + ':' + minutes  + ' PM'
    }
    console.log(displayTime)
    $(typeItem).append(Type[selectedType] + '  ( ' + date + ' ' + month + ', ' + year + ' | ' + displayTime + ' )</h6>')
    extn_body.appendChild(typeItem)
}

function addDescribtion(){ // DONE !!
    descriptionItem = document.createElement("ion-item")
    $(descriptionItem).append('<ion-icon slot="start" size="large" name="clipboard-outline" style="margin:0"></ion-icon>')
    // Importing the description text
    if(!(extnDescription.value)) { $(descriptionItem).append('<h6 style="margin: 0 20px"> --- </h6>') }
    else { descriptionItem.append(extnDescription.value) }

    extn_body.appendChild(descriptionItem)
}

function jQuery()
{
    $($(new_ionItem).children()[3]).click(function(){
        for (let i = 0; i < 3; i++) {
            $($(this).parent().children()[i]).fadeToggle(500)
        }
        $($(this).parent().parent().children()[1]).fadeToggle(500)

    })
}

//
//
//
//
//
//<ion-icon name="notifications-outline"></ion-icon>
//