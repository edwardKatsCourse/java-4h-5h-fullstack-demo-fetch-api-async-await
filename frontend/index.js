function Person(id, firstName, lastName) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
}

let persons = [];

function getAllPersons() {

    let url = 'http://localhost:8080';

    //fetch API
    //fetch() - promise: resolved/rejected

    //promise
    //.then .then .then
    //async/await

    fetch(url + '/persons')
        .then((response) => {

            return response.json(); //10 Byte | 10 MByte
        })
        .then((body) => {


            let persons = body;
            clearTable();
            drawTable(persons);
        });
}

async function getAllPersonsRequest() {

    try {
        let response /*: Promise */ = await fetch('http://localhost:8080/persons'); //promise



        let responseBody /*: Promise */ = await response.json(); //promise
        debugger;

        if (response.status !== 200) {
            throw new Error(responseBody.message);
        }
        return responseBody; //promise

    } catch (e) {
        debugger;
        return new Promise((resolved, rejected) => {
            console.error("Error occurred: " + e);
            rejected(e);
        })
    }

}

function savePerson() {
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;

    let person = new Person(null, firstName, lastName);

    savePersonRequest(person)
        .then(successfulResponse => {
            window.location.href = '/java-4h-5h-fullstack-demo/frontend/index.html';
        });


    //savePersonRequest
}

async function savePersonRequest(person) {
    let options = {
        method: 'POST',
        body: JSON.stringify(person), //JSON as string
        headers : {
            'Content-Type': 'application/json'
        }
    };

    let response = await fetch('http://localhost:8080/persons', options);
    let body = await response.json();
    return body;
}





function initialize() {
    getAllPersonsRequest()
        .then(
            (success) => { clearTable(); drawTable(success); },
            (error) => {
                document.getElementsByTagName('body')[0].innerHTML += '' +
                    '<div class="alert alert-danger alert-dismissible">\n' +
                    '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
                    '  <strong>Error!</strong> ' + error + '\n' +
                    '</div>';
            }

        );
}


function drawTable(persons) {
    let table = document.getElementById('personsTable');
    for (let person of persons) {
        let row = table.insertRow();
        row.insertCell().innerText = person.id;
        row.insertCell().innerText = person.firstName;
        row.insertCell().innerText = person.lastName;
    }
}

function clearTable() {
    let table = document.getElementById('personsTable');
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
    //0 - header - .length = 1
}