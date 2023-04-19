// Declaration of variable
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
populateUi();

let ticketPrice = +movieSelect.value;

// update seats and counts 
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    // Storing data to localstorage
    const seatsIndex = [...selectedSeats].map((seat) => {
       return [...seats].indexOf(seat);
    });

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatCounts = selectedSeats.length;

    count.innerText = selectedSeatCounts;
    total.innerText = selectedSeatCounts * ticketPrice;
}

// Get data from localStorage
function populateUi(){
    const selectedseats = JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedseats !== null && selectedseats.length > 0){
        seats.forEach((seat, index) => {
            if(selectedseats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        })

    }
}

// Get moviedata from localStorage
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }

// Save selected movie data to localStorage
function setMovieData(movieData, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieData);
    localStorage.setItem('selectedMovieprice', moviePrice);
}

// movie select event
movieSelect.addEventListener('change', (e) => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);

    updateSelectedCount();
})

// Event Listener for seats
container.addEventListener('click', (e) => {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        
        e.target.classList.toggle('selected');

        updateSelectedCount();
    }
});

updateSelectedCount();