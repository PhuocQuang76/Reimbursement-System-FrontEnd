const URL = 'http://localhost:7000';

let submitReimbursement = async () => {
    // let userId = document.getElementById('id').value;
    let type = document.getElementById('ReimbType').value;
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let amount = document.getElementById('Amount').value;
    let transactionDate = document.getElementById('TransDate').value;
    transactionDate = new Date(Date.parse(transactionDate));
    transactionDate = transactionDate.toISOString();
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
    alert("Reimbursement created !!!")
    document.getElementById('reimbursementForm').reset();
    let res = await req.json();

    console.log(res);




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
            console.log("displayResolvedReimbursement->res: " + data);
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
 // ============================Manager Pages =========================


getPendingReimbursementManager = () =>{
    //Step 1. Create the new XHR object
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    const userId = params.userId;

    let xhttp = new XMLHttpRequest();

    //Step 2. Create a callback function for readystatechange
    xhttp.onreadystatechange = getData = () => {
        if(xhttp.readyState === 4 && xhttp.status === 200){
            console.log(xhttp.responseText);
            let res = xhttp.responseText;
            let data =  JSON.parse(res);
            console.log("displayPendingReimbursementManager->res: " + data);
            displayPendingReimbursementManager(data);
        }
    }
    let apiUrl
    if (userId) {
        apiUrl = `${URL}/reimbursement/employee/${userId}`;
    } else {
        apiUrl = `${URL}/reimbursement/pending/users`;
    }
    xhttp.withCredentials = true;
    console.log("apiUrl:" +apiUrl);

    //Step 3. Open the request
    xhttp.open('GET', apiUrl);

    //Step 4. Send the request
    xhttp.send();
}

displayPendingReimbursementManager = (data)=> {
    addTable('managerPendingReimbursementTable', data)
}


function getResolvedReimbursementManager(){
    //Step 1. Create the new XHR object
    let xhttp = new XMLHttpRequest();

    //Step 2. Create a callback function for readystatechange
    xhttp.onreadystatechange = getData = () => {
        if(xhttp.readyState === 4 && xhttp.status === 200){
            console.log(xhttp.responseText);
            let res = xhttp.responseText;
            let data =  JSON.parse(res);
            console.log("getResolvedReimbursementManager->res: " + data);
            displayResolvedReimbursementManager(data);
        }
    }
    let apiUrl = `${URL}/reimbursement/resolved/users`;
    xhttp.withCredentials = true;
    console.log("apiUrl:" +apiUrl);

    //Step 3. Open the request
    xhttp.open('GET', apiUrl);

    //Step 4. Send the request
    xhttp.send();
}


  //let a =  [{"userId":3,"reimbursementId":2,"firstName":"name3","lastName":"last3","status":"APPROVED","submittedDate":1644998400000,"title":"trt","reimbursementType":"LODGING","amount":22.0,"transactionDate":null,"approvedDate":1644998400000},{"userId":3,"reimbursementId":4,"firstName":"name3","lastName":"last3","status":"DENIED","submittedDate":1644998400000,"title":"test","reimbursementType":"LODGING","amount":44.0,"transactionDate":null,"approvedDate":1644998400000}]


function displayResolvedReimbursementManager(data){
    addTable('managerResolvedReimbursement', data);
}


function addTable(tableName,data) {
    let table = document.getElementById(tableName);
    for (let list of data) {
        //table body
        var tableBody = document.createElement('tbody');

        //table row
        var tableRow1 = document.createElement('tr');

        //table detail
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
        td6.appendChild(document.createTextNode(new Date(list.submittedDate).toUTCString()));
        // let submittedDate;
        // if (list.submittedDate) {
        //     submittedDate = new Date(list.submittedDate).toUTCString();
        // } else {
        //     submittedDate = "";
        // }
        // td6.appendChild(document.createTextNode(new Date(list.submittedDate).toUTCString()));


        let td7 = document.createElement('td');
        td7.appendChild(document.createTextNode(list.title))
        let td8 = document.createElement('td');
        td8.appendChild(document.createTextNode(list.reimbursementType))
        let td9 = document.createElement('td');
        td9.appendChild(document.createTextNode(list.amount))
        let td10 = document.createElement('td');
        td10.appendChild(document.createTextNode(new Date(list.transactionDate).toUTCString()))
        let td11 = document.createElement('td');
        let approvedDate;
        if (list.approvedDate) {
            approvedDate = new Date(list.approvedDate).toUTCString();
        } else {
            approvedDate = "";
        }

        td11.appendChild(document.createTextNode(approvedDate));
        let td12 = document.createElement('td');
        let td13 = document.createElement('td');


        if (tableName == "managerPendingReimbursementTable")  {
            //Append button into table
            let btn1 = document.createElement("button");
            btn1.innerHTML = "Approve";
            td12.appendChild(btn1);
            btn1.setAttribute("onclick","approvePendingReimbursement(this)");

            let btn2 = document.createElement("button");
            btn2.innerHTML = "Deny";
            td13.appendChild(btn2);
            btn2.setAttribute("onclick","denyPendingReimbursement(this)");
        }else{
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
        tableBody.appendChild(tableRow1);
        table.appendChild(tableBody);

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

    approvePendingReimbursement = async (index) => {
        let refTable = document.getElementById("managerPendingReimbursementTable");
        var row = index.parentNode.parentNode;
        // var cell = index.parentNode.childElementCount;
        var rowIndex = row.rowIndex-1;
        console.log("rowIndex : ",rowIndex);

        let reimbursementId = refTable.rows.item(rowIndex+1).cells.item(1).innerText;
        console.log("value of second column: " + reimbursementId);



        //call another function
        let obj = {
            "reimbursementId":reimbursementId
        }
        let req = await fetch(`${URL}/reimbursement/approve`, {
            credentials: "include",
            method: 'PUT',
            body: JSON.stringify(obj)
        });
    }

    denyPendingReimbursement = async (index) => {
        let refTable = document.getElementById("managerPendingReimbursementTable");
        var row = index.parentNode.parentNode;
        // var cell = index.parentNode.childElementCount;
        var rowIndex = row.rowIndex-1;
        console.log("rowIndex : ",rowIndex);

        let reimbursementId = refTable.rows.item(rowIndex+1).cells.item(1).innerText;
        console.log("value of second column: " + reimbursementId);



        //call another function
        let obj = {
            "reimbursementId":reimbursementId
        }
        let req = await fetch(`${URL}/reimbursement/deny`, {
            credentials: "include",
            method: 'PUT',
            body: JSON.stringify(obj)
        });
    }

}




