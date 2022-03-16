
function addUserListTable(users) {
    let table = document.getElementById("userListTable");
    for(let user of users) {
        var tableRow2 = document.createElement('tr');
        let userId = user.userId;
        var tableDetail1 = document.createElement('td');
        tableDetail1.appendChild(document.createTextNode(user.userId));
        var tableDetail2 = document.createElement('td');
        tableDetail2.appendChild(document.createTextNode(user.email))
        var tableDetail3 = document.createElement('td');
        tableDetail3.appendChild(document.createTextNode(user.firstName));
        var tableDetail4 = document.createElement('td');
        tableDetail4.appendChild(document.createTextNode(user.lastName))
        var tableDetail5 = document.createElement('td');
        tableDetail5.appendChild(document.createTextNode(user.role))
        let tableDetail6 = document.createElement('td');
        tableDetail6.appendChild(document.createTextNode(user.passWord))


        let tableDetail7 = document.createElement('td');
        let link = document.createElement("a");
        link.innerHTML = "View Pending";
        tableDetail7.appendChild(link);
        const url = `manager_pending.html?userId=${userId}`;
        link.setAttribute("href", url);
        link.setAttribute("width","150px");


        tableRow2.appendChild(tableDetail1);
        tableRow2.appendChild(tableDetail2);
        tableRow2.appendChild(tableDetail3);
        tableRow2.appendChild(tableDetail4);
        tableRow2.appendChild(tableDetail5);
        tableRow2.appendChild(tableDetail6);
        tableRow2.appendChild(tableDetail7);
        table.appendChild(tableRow2);

        tableDetail1.classList.add('border');tableDetail1.setAttribute('id','td1');
        tableDetail2.classList.add('border');tableDetail2.setAttribute('id','td2');
        tableDetail3.classList.add('border');tableDetail3.setAttribute('id','td3');
        tableDetail4.classList.add('border');tableDetail4.setAttribute('id','td4');
        tableDetail5.classList.add('border');tableDetail5.setAttribute('id','td5');
        tableDetail6.classList.add('border');tableDetail6.setAttribute('id','td6');
        tableDetail6.classList.add('border');tableDetail7.setAttribute('id','td7');
    }
}


function addManagerPendingTable(tableName){
    let pendingReimbursementList = testTable;
    addTable(tableName, pendingReimbursementList);
}

function addManagerHistoryTable(tableName){
    let hisotyReimbursementList = testTable;
    addTable(tableName, hisotyReimbursementList);
}

//Make API call for user form
function fecthDataforManagerTable(){
    //Step 1:  Create the new XHR object
    let xhttp = new XMLHttpRequest();

    //Step 2: Create a callback function for readystatechange
    xhttp.onreadystatechange = getData = ()=> {
        if(xhttp.readyState === 4 && xhttp.status === 200){
            console.log(xhttp.responseText);
            let res = JSON.parse(xhttp.responseText);
            //loadDataIntoManagerPage(res);
            addUserListTable(res);
        }
    }
    let apiUrl = `${URL}/user/employees`

    //Step 3. Open the request
    xhttp.open('GET', apiUrl);

    //Step 4. Send the request
    xhttp.withCredentials = true;
    xhttp.send();
}

viewSpecificPendingRequest = async (index) =>{
    let refTable = document.getElementById("userListTable");
    var rowIndex = row.rowIndex-1;
    console.log("rowIndex : ",rowIndex);
    let userId = refTable.rows.item(rowIndex+1).cells.item(0).innerText;
    console.log("value of second column: " + userId);

    //call another function
    let obj = {
        "userId":userId
    }
    let req = await fetch(`${URL}/reimbursement/specific`, {
        credentials: "include",
        method: 'GET',
        body: JSON.stringify(obj)
    });
    let res = await req.json();
    displayPendingReimbursementManager(res);
}
