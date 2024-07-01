// HTML'den gerekli elementleri seçiyoruz
const container = document.querySelector('.container'); // Koltukların bulunduğu konteyner
const countElement = document.getElementById('count'); // Seçilen koltuk sayısını gösteren element
const amountElement = document.getElementById('amount'); // Toplam ücreti gösteren element
const movieSelect = document.getElementById('movie'); // Film seçimini yapan dropdown
const seats = document.querySelectorAll('.seat:not(.reserved)'); // Rezerve edilmemiş koltukları seçiyoruz

// Sayfa yüklendiğinde localStorage'den verileri alıyoruz ve ekranı güncelliyoruz
getFromLocalStorage();
calculateTotal();
updateScreen();

// Koltuklara tıklama event'i ekliyoruz
container.addEventListener('click', (e) => {
    // Tıklanan element bir koltuksa ve rezerve edilmemişse
    if (e.target.classList.contains('seat') && !e.target.classList.contains('reserved')) {
        e.target.classList.toggle('selected'); // Seçili durumu toggle yaparak değiştiriyoruz
        calculateTotal(); // Toplamı yeniden hesaplıyoruz
    }
});

// Film seçimi değiştiğinde
movieSelect.addEventListener('change', () => {
    calculateTotal(); // Toplamı yeniden hesapla
    updateScreen(); // Ekran üzerinde film adını güncelle
});

// Seçilen koltuk sayısını ve toplam ücreti hesaplayan fonksiyon
function calculateTotal() {
    const selectedSeats = container.querySelectorAll('.seat.selected'); // Seçili koltukları al
    const selectedSeatCount = selectedSeats.length; // Seçili koltuk sayısını hesapla
    const seatPrices = parseInt(movieSelect.value); // Seçilen filmin fiyatını al

    countElement.innerText = selectedSeatCount; // Seçili koltuk sayısını ekrana yaz
    amountElement.innerText = selectedSeatCount * seatPrices + '₺'; // Toplam ücreti ekrana yaz

    // Seçilen koltukların index'lerini localStorage'a kaydet
    const selectedSeatIndexes = Array.from(selectedSeats).map(seat => Array.from(seats).indexOf(seat));
    saveToLocalStorage(selectedSeatIndexes);
}

// localStorage'dan verileri alıp sayfaya yükleyen fonksiyon
function getFromLocalStorage() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    // Eğer seçili koltuklar varsa, onları işaretle
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

// Seçili koltuk index'lerini localStorage'a kaydeden fonksiyon
function saveToLocalStorage(indexes) {
    localStorage.setItem('selectedSeats', JSON.stringify(indexes));
    localStorage.setItem('selectedMovieIndex', movieSelect.selectedIndex);
}

// Ekran üzerinde seçilen filmi gösteren fonksiyon
function updateScreen() {
    const selectedMovie = movieSelect.options[movieSelect.selectedIndex].text; // Seçili filmi al
    const screenElement = document.getElementById('screen');
    screenElement.innerText = selectedMovie; // Ekran üzerine film adını yaz
}

// Sayfa yüklendiğinde mevcut film adını ekran üzerine yazdırmak için
document.addEventListener('DOMContentLoaded', (event) => {
    updateScreen();
});

// Arka plan hareketi için mouse hareketini dinleyen event
document.addEventListener('mousemove', (event) => {
    const { clientX, clientY } = event;
    const moveX = (clientX / window.innerWidth) * 0.5; // Hareket hızını düşürdük
    const moveY = (clientY / window.innerHeight) * 0.5; // Hareket hızını düşürdük

    const background = document.querySelector('.background');
    background.style.transform = `translate(-${moveX}%, -${moveY}%)`;
});
