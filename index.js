hamburger=document.querySelector(".hamburger");
        hamburger.onclick=function(){
            navBar=document.querySelector(".nav-bar");
            navBar.classList.toggle("active");
        }
var icon= document.getElementById("icon");
icon.onclick=function(){
    document.body.classList.toggle("dark-theme");
    if(document.body.classList.contains("dark-theme")){
        b=document.getElementById("seci");
        if(b.src.match("comp.png")){
            b.src="darkcomp.gif";
            b.style.width="270px";
            b.style.height="200px";
            var mediaQueryCondition= window.matchMedia('(max-width: 900px)');
            if(mediaQueryCondition.matches){
                b.style.width="220px";
                b.style.height="160px";
            }
        }
    }
    else{
        b=b=document.getElementById("seci");
        b.src="comp.png";
        b.style.width="240px";
        b.style.height="210px";
        var mediaQueryCondition= window.matchMedia('(max-width: 900px)');
            if(mediaQueryCondition.matches){
                b.style.width="180px";
                b.style.height="150px";
            }
    }
}        