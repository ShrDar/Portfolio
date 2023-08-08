const movieDetails = [{
    name: 'Spider-Man Across The Spider-Verse',
    synopsis: "After reuniting with Gwen Stacy, Brooklyn's full-time, friendly neighborhood Spider-Man is catapulted across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.",
    img_src: 'Images/spideracross.jpg'
}, {
    name: 'Guardians OF The Galaxy (Vol. 3)',
    synopsis: 'Still reeling from the loss of Gamora, Peter Quill must rally his team to defend the universe and protect one of their own. If the mission is not completely successful, it could possibly lead to the end of the Guardians as we know them.',
    img_src: 'Images/guardians3.jpg'
}, {
    name: 'Transformers: Rise Of The Beasts',
    synopsis: 'Optimus Prime and the Autobots take on their biggest challenge yet. When a new threat capable of destroying the entire planet emerges, they must team up with a powerful faction of Transformers known as the Maximals to save Earth.',
    img_src: 'Images/transformers.jpg'
}, {
    name: 'John Wick: Chapter 4',
    synopsis: 'With the price on his head ever increasing, legendary hit man John Wick takes his fight against the High Table global as he seeks out the most powerful players in the underworld, from New York to Paris to Japan to Berlin.',
    img_src: 'Images/johnwick.jpg'
}];

const comingSoon = [{
    name: 'Adipurush',
    synopsis: 'Adaptation of Indian mythology depicting the triumph of good over evil.',
    img_src: 'Images/adipurush.jpg',
    //trailer_url: ''
}, {
    name: 'Jawan',
    synopsis: "A man is driven by a personal vendetta to rectify the wrongs in society, while keeping a promise made years ago. He comes up against a monstrous outlaw with no fear, who's caused extreme suffering to many.",
    img_src: 'Images/jawan.jpg'
}, {
    name: "Animal",
    synopsis: "A gangster drama that explores the turbulent relationships between all the characters that eventually lead to the protagonist becoming an 'animal' in nature.",
    img_src: "Images/animal.jpg"
}, {
    name: 'Oppenheimer',
    synopsis: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
    img_src: "Images/oppenheimer.jpg"
}];

let favourites = [];

let selectedSeats=[];

let ticketsBought = [];

let ticketsReserved = [];

const designTop = document.getElementById('design-top');
const designBottom = document.getElementById('design-bottom');
const curved1 = document.getElementById("curved1");
const curved2 = document.getElementById("curved2");
const curved3 = document.getElementById("curved3");
const curved4 = document.getElementById("curved4");
const curved5 = document.getElementById("curved5");

//Now-showing Section:-------

let movieHtml = '';

movieDetails.forEach((data, index) => {
    let name = data.name;
    let url = data.img_src;
    let details = data.synopsis;
    let html = `
    <div class="movie">
        <img src="${url}" alt="" class="poster">
        <p class="movie-name">${name}</p>
        <p class="synopsis">${details}</p>
        <div class="ticket_heart">
        <button class='ticket' data-movie-id="${name}">Tickets</button>
        <button class='add_favourites' data-movie-id="${index}" data-movie-title="${name}"></button>
        </div>
    </div>
    `
    movieHtml += html;
});

const nowShowing = document.querySelector('.now-showing');
nowShowing.innerHTML = movieHtml;

//Coming Soon Section:-------

let comingsoonHtml = '';
comingSoon.forEach((data, index) => {
    let name = data.name;
    let url = data.img_src;
    let details = data.synopsis;
    let html = `
    <div class="movie">
        <img src="${url}" alt="" class="poster">
        <p class="movie-name">${name}</p>
        <p class="synopsis">${details}</p>
        <div class="ticket_heart">
        <button class='add_favourites' data-movie-id="${index}" data-movie-title="${name}"></button>
        </div>
    </div>
    `
    comingsoonHtml += html;
});
const cominSoon = document.querySelector('.comingSoon');
cominSoon.innerHTML = comingsoonHtml;
const comingHead = document.querySelector('.comingHeading');

const navcomingSoon = document.querySelector('.navcomingSoon');
navcomingSoon.addEventListener('click', () => {
    favStatus = 'comingSoon';
    cominSoon.classList.toggle('comingDisplay');
    nowShowing.classList.toggle('nodisplay');
    document.querySelector('.heading').classList.toggle('nodisplay');
    comingHead.classList.toggle('comingheadDisplay');
});

const returnn = document.querySelector('.chead1');
returnn.addEventListener('click', () => {
    favStatus = 'nowShowing';
    cominSoon.classList.toggle('comingDisplay');
    nowShowing.classList.toggle('nodisplay');
    document.querySelector('.heading').classList.toggle('nodisplay');
    comingHead.classList.toggle('comingheadDisplay');
});



//Favorite Movies Section:--------

const heart = document.querySelectorAll('.add_favourites');
let heartCount = 0;
heart.forEach((data) => {
    let condition=true;
    let movieId = Number(data.dataset.movieId);
    data.addEventListener('click', () => {
        let statusIdentifier = data.dataset.movieTitle;
        let movie;
        movieDetails.forEach((nowshowing) => {
            
            if(nowshowing.name === statusIdentifier){
                movie = movieDetails;
            }
            comingSoon.forEach((upcoming) => {
                if(upcoming.name === statusIdentifier){
                    movie  = comingSoon;
                }
            });
        })
        
        if(condition){
            data.classList.add('add_favourites2');
            favourites.push(Object.assign(movie[movieId], {id: movieId}));
            heartCount +=1;
            condition = false;
        }
        else{
            data.classList.remove('add_favourites2');
            favourites.forEach((favmovie, index) => {
                if(favmovie.id===movieId){
                    favourites.splice(index, 1);
                };
            });
            heartCount -=1;
            condition = true;

        }
        document.querySelector('.heart-counter').innerHTML = heartCount;
    })    

});


const favDis = document.querySelector('.favouriteLists');
const nofavFound = document.querySelector('.nofavFound');
document.querySelector('.favourites').addEventListener('click', () => {
    let favmovieHtml = '';

    if(favourites.length === 0){
        nofavFound.classList.add('nofavdisplay');
    }

    favourites.forEach((movie) => {
        let name = movie.name;
        let url = movie.img_src;
        let details = movie.synopsis;
        let html = `
        <div class="movie">
            <img src="${url}" alt="" class="poster">
            <p class="movie-name">${name}</p>
            <p class="synopsis">${details}</p>
        </div>
        `
        favmovieHtml += html;
    });
    
    favDis.innerHTML = favmovieHtml;
    favDis.classList.toggle('favDisplay');
    nowShowing.classList.toggle('nodisplay');
    document.querySelector('.heading').classList.toggle('nodisplay');
    favHeading.classList.toggle('favDisplayflex');

    curved1.style.background = '#f58895';
    curved1.style.borderRadius = '50% 50% 16% 84% / 36% 56% 44% 64%  '
    curved2.style.background = '#c0c3c2';
    curved2.style.borderRadius = '70% / 50%';
    curved3.style.borderRadius = '50% / 50%'
    curved3.style.background = '#f5f588';
    curved4.style.background = '#88f3f5';
    curved5.style.background = '#2BC48A';

});

const favHeading = document.querySelector('.favheading');


// Ticket Purchasing J.S:----


let seats = [];
noSeats = 0;
seatInitials=['A', 'B' ,'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
while(noSeats!==10){
    for(i=1;i<=10;i++){
        seats.push({
            seatName: `${seatInitials[noSeats]}${i}`
        })
    }

    noSeats += 1;
}

let seatHtml = '';

seats.forEach((data) => {
    seatName = data.seatName;
    html = `<button class="seat_no">${seatName}</button>`;
    seatHtml += html;
});

document.querySelector('.seats').innerHTML = seatHtml;

let seatselectorId;

document.querySelectorAll('.seat_no').forEach((seatNo) => {
    seatNo.addEventListener('click', () => {
        seatNo.classList.toggle('selected');
        let count = 0;
        selectedSeats.forEach((data, index) => {
            
            if(seatNo.innerHTML === data){
                count += 1;
                selectedSeats.splice(index, 1);
            }
        });
        if(count===0){
            selectedSeats.push(seatNo.innerHTML);
        }
        

        let selectedSeatsHtml = '';
        selectedSeats.forEach((data) => {
            selectedSeatsHtml += data+'  ';
        });
        
        let showSelected = document.querySelector('.selectedSeats');
        showSelected.innerHTML=`<p class="screenText">Selected Seats: ${selectedSeatsHtml}</p>`;
        if(selectedSeats.length==0){
            showSelected.innerHTML='';
        }
        console.log(selectedSeats);
    });
});

//for seat selection
function seatselection(status){
    if(status === 'bought'){
        tickets = ticketsBought;
        classcolor = 'selectedred';
    }
    else if(status === 'reserved'){
        tickets = ticketsReserved;
        classcolor = 'selectedblue'
    }
    let seats = document.querySelectorAll('.seat_no');
    tickets.forEach((data) => {
        (data.seats).forEach((seatnumber) => {
            seats.forEach((seat) => {
                if(seatselectorId === data.movieName && seat.innerHTML === seatnumber && status === 'bought'){
                    seat.classList.add(classcolor);
                }
                if(seatselectorId === data.movieName && seat.innerHTML === seatnumber && status === 'reserved'){
                    seat.classList.add(classcolor);
                    
                }
            })
        });
    })
}


function clearSeats(){
    let seats = document.querySelectorAll('.seat_no');
    seats.forEach((seat) => {
        
        classNo_s = seat.classList['length'];
        className = seat.classList['value'];
        if(classNo_s > 1){
            console.log(className);
            if(className=='seat_no selectedred'){
                seat.classList.remove('selectedred');
            }
            else if(className=='seat_no selectedblue'){
                seat.classList.remove('selectedblue');
            }
            else if(className=='seat_no selected selectedred'){
                seat.classList.remove('selectedred');
                seat.classList.remove('selected');
            }
            else if(className=='seat_no selected selectedblue'){
                seat.classList.remove('selectedblue');
                seat.classList.remove('selected');
            }
            else if(className == 'seat_no selected'){
                seat.classList.remove('selected');
            }
        }
    })
}

let currentMovie = '';
const buyTickets = document.querySelector('.buyTickets');
const ticketButton = document.querySelectorAll('.ticket');
ticketButton.forEach((buttons) => {
    buttons.addEventListener('click', () => {    
        seatselectorId = buttons.dataset.movieId; 
        currentMovie = seatselectorId;
        clearSeats();
        seatselection('bought');
        seatselection('reserved');
        selectedSeats = [];
        curved1.style.background = '#88f3f5';
        curved2.style.background = '#2BC48A';
        curved3.style.background = '#f5f588';
        curved4.style.background = '#88f3f5';
        curved5.style.background = '#2BC48A';
        nowShowing.classList.toggle('nodisplay');
        buyTickets.classList.toggle('ticketsdisplay');
        heading.classList.toggle('nodisplay');
        try{
            document.querySelector('.screenText').innerHTML = '';
        } catch{};
    });
});

const heading = document.querySelector('.heading');
const cross = document.querySelector('.cross');
cross.addEventListener('click', () => {
    buyTickets.classList.toggle('ticketsdisplay');
    nowShowing.classList.toggle('nodisplay');
    heading.classList.toggle('nodisplay');
});

function successPopcorn(){
    document.querySelector('.buyTickets').classList.toggle('blur');
    document.querySelector('.sucessfullyBooked').classList.toggle('display');
}

const buyButton = document.querySelector('.buy_button');
buyButton.addEventListener('click', () => {
    try{
        document.querySelector('.screenText').innerHTML = '';
    }catch{}
    if(selectedSeats.length!=0){
        ticketsBought.push({
            movieName: seatselectorId,
            seats: selectedSeats, 
            status: 'bought'
        });
        seatselection('bought');
        selectedSeats=[];
        successPopcorn();
        
    }
    else{
        alert('Please Select the Seats');
    }
     console.log(ticketsBought);
});

const reserveButton = document.querySelector('.reserve_button');
reserveButton.addEventListener('click', () => {
    document.querySelector('.screenText').innerHTML = '';
    if(selectedSeats.length!=0){
        ticketsReserved.push({
            movieName: seatselectorId,
            seats: selectedSeats,
            status: 'reserved'
        });
        seatselection('reserved');
        selectedSeats=[];
        successPopcorn();
    }
    else{
        alert('Please Select the Seats');
    }
    console.log(ticketsReserved);
});

document.querySelector('.sucessfulcross').addEventListener('click', () => {
        successPopcorn();
});

const exit = document.querySelector('.divexit');
const MyTickets = document.querySelector('.reservation');
MyTickets.addEventListener('click', () => {
    document.querySelector('.SoldorReserved').classList.add('Showdisplay');
    document.querySelector('.heading').classList.toggle('nodisplay');
    exit.classList.toggle('Showdisplay');
    nowShowing.classList.toggle('nodisplay');
});

const PuchasedTickets = document.querySelector('.PurchasedTickets');
const ReservedTickets = document.querySelector('.ReservedTickets');
let ticketsHtml = '';

function navTicketsSection(status){
    let html = '';
    let movie;
    let seats = '';
    if(status === 'bought'){
        tickets = ticketsBought;
    }
    else if(status === 'reserved'){
        tickets = ticketsReserved;
    }
    if(tickets.length === 0){
        alert('No Tickets Found');
        nowShowing.classList.toggle('nodisplay');
        exit.classList.toggle('Showdisplay');
        document.querySelector('.heading').classList.toggle('nodisplay');
        document.querySelector('.myTicket').classList.remove('Showdisplay2');
        document.querySelector('.SoldorReserved').classList.remove('Showdisplay');
        return false;
    }
    tickets.forEach((soldTickets) => {
        movieDetails.forEach((moviename) => {
            if(soldTickets.movieName === moviename.name){
                movie = moviename;
            }
        });
        soldTickets.seats.forEach((seat) => {
            seats += seat + '  '; 
        });
        console.log(seats);
        console.log(movie);
        html = `
            <div class="BookedMovie">
                <img class="myTicketimg" src="${movie.img_src}">
                <p class="BookedName">${movie.name}</p>
                <p class="BookedSeats">Seats - ${seats}</p>
                <p class="BookedSeats">Auditorium - Theatre 1</p>
            </div>
        `;
        seats = '';
        ticketsHtml += html;
    });
    document.querySelector('.myTicket').innerHTML = ticketsHtml;
    return true;
}

PuchasedTickets.addEventListener('click', () => {
    conn = navTicketsSection('bought');
    if(conn === true){
        document.querySelector('.SoldorReserved').classList.toggle('Showdisplay');
        document.querySelector('.myTicket').classList.add('Showdisplay2');
    }
});

ReservedTickets.addEventListener('click', () => {
    conn = navTicketsSection('reserved');
    if(conn === true){
        document.querySelector('.SoldorReserved').classList.toggle('Showdisplay');
        document.querySelector('.myTicket').classList.add('Showdisplay2');
    }
});

exit.addEventListener('click', () => {
    
    document.querySelector('.SoldorReserved').classList.remove('Showdisplay');
    document.querySelector('.heading').classList.toggle('nodisplay');
    document.querySelector('.myTicket').classList.remove('Showdisplay2');
    exit.classList.toggle('Showdisplay');
    nowShowing.classList.toggle('nodisplay');
    ticketsHtml = '';
});


favHeading.addEventListener('click', () => {

    favDis.classList.toggle('favDisplay');
    nowShowing.classList.toggle('nodisplay');
    document.querySelector('.heading').classList.toggle('nodisplay');
    favHeading.classList.toggle('favDisplayflex');
    nofavFound.classList.remove('nofavdisplay');
});




const navnowShowing = document.querySelector('.navnowShowing');
navnowShowing.addEventListener('click', () => {
    
    nowShowing.classList.toggle('nowShowingscale');
});










