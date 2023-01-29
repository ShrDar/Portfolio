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
        alert("Passsword too short!!")
        return false;
    }
    else{
        alert("Log in Successful")
    }
}