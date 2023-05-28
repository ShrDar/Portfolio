
/*
check=localStorage.getItem("score");
if(check==null){
    wincount={
    win: 0,
    draw: 0,
    lose: 0
}
}
else{
    wincount=JSON.parse(check);
}
*/
//Shortcut:
let wincount;
    check=JSON.parse(localStorage.getItem("score")) || {
    win: 0,
    draw: 0,
    lose: 0
    } 
    wincount=check;

    function lose(){
        statuus=document.querySelector('.status');
        statuus.innerHTML=("<p>You Lose</p><img class='loss' src=dead.png>");
    }
    function winn(){
        statuus=document.querySelector('.status');
        statuus.innerHTML=("<p>You Win</p><img class='loss' src=happy.png>");
    }
function compmove(move){
    cmoves=["rock",'paper','scissors'];
    randmove=Math.floor(Math.random()*3);
    cmove=cmoves[randmove];
    console.log(cmove);
    if(move==='rock'){
        moveimg="<img class='moveimg' src='punch.png'>"
    }
    else if(move==='scissors'){
        moveimg="<img class='moveimg' src='scissors.png'>"
    }
    else if(move==='paper'){
        moveimg="<img class='moveimg' src='paper.png'>"
    }

    
    if(cmove==='rock'){
        cmoveimg="<img class='moveimg' src='punch.png'>"
    }
    else if(cmove==='scissors'){
        cmoveimg="<img class='moveimg' src='scissors.png'>"
    }
    else if(cmove==='paper'){
        cmoveimg="<img class='moveimg' src='paper.png'>"
    }
    document.querySelector('.umove').innerHTML="<div class='mimg'><p>Your Move:</p>"+moveimg+"</div>";
    document.querySelector('.cmove').innerHTML="<div class='mimg'><p>P.C Move:</p>"+cmoveimg+"</div>";
    statuus=document.querySelector('.status');
    if(cmove=="rock" && move=="scissors"){
        wincount.lose+=1;
        lose();
        displayboard();
    }
    if(cmove=="scissors" && move=="rock"){
        wincount.win+=1;
        winn();
        displayboard();
    }
    if(cmove=="rock" && move=="paper"){
        wincount.win+=1;
        winn();
        displayboard();
    }
    if(cmove=="paper" && move=="rock"){
        wincount.lose+=1;
        lose();
        displayboard();
    }
    if(cmove=="paper" && move=="scissors"){
        wincount.win+=1;
        winn();
        displayboard();
    }
    if(cmove=="scissors" && move=="paper"){
        wincount.lose+=1;
        lose();
        displayboard();
    }
    if(cmove==move){
        wincount.draw+=1;
        statuus.innerHTML=("<p>Draw</p><img class='loss' src=draw.png>");
        displayboard();
    }
}
function displayboard(){
    setTimeout(function(){
        score=document.querySelector(".score");
        result=`Win: ${wincount.win}, Loss: ${wincount.lose}, Draw: ${wincount.draw}`;
        score.innerHTML=result;
    },200);
    localStorage.setItem("score",JSON.stringify(wincount));
}
function reset(){
    document.querySelector(".umove").innerHTML="";
    document.querySelector(".cmove").innerHTML="";
    document.querySelector('.status').innerHTML="";
    wincount.win=0;
    wincount.lose=0;
    wincount.draw=0;
    displayboard();
} 
function mymove(){
    let moves=['rock','paper','scissors'];
    let rmove=Math.floor(Math.random()*3);
    let fmoves=moves[rmove];
    return fmoves;
}
function auto(){
    move=mymove();
    compmove(move);
    autobtn=document.querySelector('.abtn');
    let conn=autobtn.innerText;
    if(conn=='Auto-Play'){
        autobtn.innerText='Stop';
    };
}
let autoplay=false;
let intervalid;
function abtn(){
    auto();
    conn=document.querySelector('.abtn');
    if(!autoplay){
        intervalid=setInterval(auto,1000);
        autoplay=true;
    }
    else{
        conn.innerText='Auto-Play';
        clearInterval(intervalid);
        autoplay=false;
    }
}
displayboard();