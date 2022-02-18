const URL = 'http://localhost:7000';

let submitReimbursement = async () => {
    // let userId = document.getElementById('id').value;
    let type = document.getElementById('a1').value;
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let amount = document.getElementById('b1').value;
    let transactionDate = document.getElementById('c1').value;

    let itemObj = {
        'userId': 0,
        'managerId': 0,
        'title': title,
        'description':description,
        'status':2,
        'submittedDate': new Date(),
        'transactionDate': transactionDate,
        'typeId': type,
        'amount': amount
    }

    let req = await fetch(`${URL}/reimbursement`, {
        credentials: "include",
        method: 'POST',
        body: JSON.stringify(itemObj)
    });

    let res = await req.json();
    alert("Reimbursement created !!!")
    console.log(res);

    document.getElementById('reimbDetail').style.display = 'none';
    document.getElementById('submit').style.display = 'none';

};



function getPendingReimbursement(){
    //Step 1. Create the new XHR object
    let xhttp = new XMLHttpRequest();

    //Step 2. Create a callback function for readystatechange
    xhttp.onreadystatechange = getData = () => {
        if(xhttp.readyState === 4 && xhttp.status === 200){
            // console.log(xhttp.responseText);
            let res = xhttp.responseText;
            let data =  JSON.parse(res);
            // console.log("getPendingReimbursement->res: " + data);
            displayPendingReimbursement(data);
        }
    }
    let apiUrl = `${URL}/reimbursement/pending`;
    xhttp.withCredentials = true;
    console.log("apiUrl:" +apiUrl);

    //Step 3. Open the request
    xhttp.open('GET', apiUrl);

    //Step 4. Send the request
    xhttp.send();
}

function displayPendingReimbursement(data){
    addTable('userPendingListTable', data);
}

function getResolvedReimbursement(){
    //Step 1. Create the new XHR object
    let xhttp = new XMLHttpRequest();

    //Step 2. Create a callback function for readystatechange
    xhttp.onreadystatechange = getData = () => {
        if(xhttp.readyState === 4 && xhttp.status === 200){
            console.log(xhttp.responseText);
            let res = xhttp.responseText;
            let data =  JSON.parse(res);
            console.log("getResolvedReimbursement->res: " + data);
            displayResolvedReimbursement(data);
        }
    }
    let apiUrl = `${URL}/reimbursement/resolved`;
    xhttp.withCredentials = true;
    console.log("apiUrl:" +apiUrl);

    //Step 3. Open the request
    xhttp.open('GET', apiUrl);

    //Step 4. Send the request
    xhttp.send();
}

function displayResolvedReimbursement(data){
    addTable('resolvedListTable', data);
}

function addTable(tableName,data) {
    let table = document.getElementById(tableName);
    for (let list of data) {
        var tableRow1 = document.createElement('tr');

        var td1 = document.createElement('td');
        td1.appendChild(document.createTextNode(list.userId));
        var td2 = document.createElement('td');
        td2.appendChild(document.createTextNode(list.reimbursementId))
        var td3 = document.createElement('td');
        td3.appendChild(document.createTextNode(list.firstName));
        var td4 = document.createElement('td');
        td4.appendChild(document.createTextNode(list.lastName))
        var td5 = document.createElement('td');
        td5.appendChild(document.createTextNode(list.status))
        let td6 = document.createElement('td');
        td6.appendChild(document.createTextNode(list.submittedDate));
        let td7 = document.createElement('td');
        td7.appendChild(document.createTextNode(list.title))
        let td8 = document.createElement('td');
        td8.appendChild(document.createTextNode(list.reimbursementType))
        let td9 = document.createElement('td');
        td9.appendChild(document.createTextNode(list.amount))
        let td10 = document.createElement('td');
        td10.appendChild(document.createTextNode(list.transactionDate))
        let td11 = document.createElement('td');
        td11.appendChild(document.createTextNode(list.approvedDate))
        let td12 = document.createElement('td');
        let td13 = document.createElement('td');

        if (tableName == "a")  {
            //Append button into table
            let btn1 = document.createElement("button");
            btn1.innerHTML = "Approve";
            td12.appendChild(btn1);

            let btn2 = document.createElement("button");
            btn2.innerHTML = "Deny";
            td13.appendChild(btn2);
        }else{
            // let btn1 = document.createElement("button");
            // btn1.innerHTML = "";
            // td12.appendChild(btn1);
            //
            // let btn2 = document.createElement("button");
            // btn2.innerHTML = "";
            // td13.appendChild(btn2);
        }

        tableRow1.appendChild(td1);
        tableRow1.appendChild(td2);
        tableRow1.appendChild(td3);
        tableRow1.appendChild(td4);
        tableRow1.appendChild(td5);
        tableRow1.appendChild(td6);
        tableRow1.appendChild(td7);
        tableRow1.appendChild(td8);
        tableRow1.appendChild(td9);
        tableRow1.appendChild(td10);
        tableRow1.appendChild(td11);
        tableRow1.appendChild(td12);
        tableRow1.appendChild(td13);
        table.appendChild(tableRow1);

        td1.classList.add('border');
        td2.classList.add('border');
        td3.classList.add('border');
        td4.classList.add('border');
        td5.classList.add('border');
        td6.classList.add('border');
        td7.classList.add('border');
        td8.classList.add('border');
        td9.classList.add('border');
        td10.classList.add('border');
        td11.classList.add('border');


    }
}




