const container = document.querySelector('.container');
const countElement = document.getElementById('count');
const amountElement = document.getElementById('amount');
const movieSelect = document.getElementById('movie');
const seats = document.querySelectorAll('.seat:not(.reserved)');

getFromLocalStorage();
calculateTotal();

container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('reserved')) {
        e.target.classList.toggle('selected');
        calculateTotal();
    }
});

movieSelect.addEventListener('change', () => {
    calculateTotal();
});

function calculateTotal() {
    const selectedSeats = container.querySelectorAll('.seat.selected');
    const selectedSeatCount = selectedSeats.length;
    const seatPrices = parseInt(movieSelect.value);

    countElement.innerText = selectedSeatCount;
    amountElement.innerText = selectedSeatCount * seatPrices + '₺';

    const selectedSeatIndexes = Array.from(selectedSeats).map(seat => Array.from(seats).indexOf(seat));
    saveToLocalStorage(selectedSeatIndexes);
}

function getFromLocalStorage() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.includes(index)) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

function saveToLocalStorage(indexes) {
    localStorage.setItem('selectedSeats', JSON.stringify(indexes));
    localStorage.setItem('selectedMovieIndex', movieSelect.selectedIndex);
}
