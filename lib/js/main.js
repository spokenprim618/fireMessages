const usernameElement = document.getElementById("username");
const messageElement = document.getElementById("message");
const button = document.getElementById("submitButton");
button.addEventListener("click",updateDB);

//Set database object here
let database=firebase.database().ref();

/**
 * Updates the database with the username and message.
 */
function updateDB(event){
    event.preventDefault();
    const username        = usernameElement.value;
    const message         = messageElement.value;

    usernameElement.value = "";
    messageElement.value  = "";

    console.log(username + " : " + message);

    //Update database here
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    let value={
        NAME:username,
        MESSAGE:message,
        TIME:dateTime
    }
    database.push(value);
}

// Set database "child_added" event listener here
database.on("child_added",addMessageToBoard);
function addMessageToBoard(rowData){
let row = rowData.val();
console.log(row);
const pElement=document.createElement('p');
pElement.innertext=`${row.TIME}:${row.NAME}:${row.MESSAGE}`;
let messageContainer=document.querySelector('.allMessages');
messageContainer.appendChild(pElement);

}
