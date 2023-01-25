hamburger=document.querySelector(".hamburger");
        hamburger.onclick=function(){
            navBar=document.querySelector(".nav-bar");
            navBar.classList.toggle("active");
        }
var icon= document.getElementById("icon");
icon.onclick=function(){
    document.body.classList.toggle("dark-theme");
    if(document.body.classList.contains(dark-theme)){
        b=document.getElementById("seci")
        if(b.src.match("comp.png")){
            b.src="none";
        }
    }
}        