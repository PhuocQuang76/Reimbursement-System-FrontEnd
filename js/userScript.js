
const URL = 'http://localhost:7000';

let loginUser = async () => {
    let username = document.getElementById('signinSrEmail').value;
    let password = document.getElementById('signinSrPassword').value;

    //validate input username and password

    let itemObj = {
        'email': username,
        'password': password,
    }

    let req = await fetch(`${URL}/login`, {
        credentials: "include",
        method: 'POST',
        body: JSON.stringify(itemObj)
    });
    if (req.status === 200) {
        console.log("req: " + req);
        console.log(req.headers.get('X-Next-Page'));
        window.location = req.headers.get('x-next-page');
    }
    else{
        document.getElementById("emailSpan").style.visibility = "visible";
        document.getElementById("passwordSpan").style.visibility = "visible";

    }
}


