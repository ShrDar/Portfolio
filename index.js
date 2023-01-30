function validation(){
    var username=document.getElementById("Email").value;
    var password=document.getElementById("Password").value;
    if(username==""){
        alert("Username not entered");
        return false;
    }
    else if(password==""){
    alert("Password not entered");
    return false;
    }
    else if(password.length<5){
        alert("Min. length 5 words");
        return false;
    }
    else if(username=="Darshan" && password=="12345"){
        alert("Log in Successful");
    }
    else{
        alert("Incorrect E-mail or Password")
        return false;
    }
}