const URL = 'http://localhost:7000';

function createLodging(){
    let lodging = document.getElementById('lodging');
    // lodging.style.display = 'block';
    lodging.setAttribute('class', 'visible');
}


function rowClicked(element){
    var rowJavascript = element.parentNode.parentNode;
    //var rowjQuery = $(element).closest("tr");

    var rowIndexJavascript = rowJavascript.rowIndex-1;
    //var rowIndexjQuery = rowjQuery[0].rowIndex-1;

    console.log("rowIndexJavascript : ",rowIndexJavascript);
    var cell = element.parentNode.parentNode;
    console.log("cell: " + cell);

    //console.log("rowIndexjQuery : ",rowIndexjQuery);
}