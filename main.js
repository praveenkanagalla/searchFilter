// var xhttp = new XMLHttpRequest();
// xhttp.onreadystatechange = function () {
//     if (this.readyState == 4 && this.status == 200) {
//         var resp = JSON.parse(this.responseText);
//         resp.map(r => {
//             populateCards(r);
//         })
//     }
// };
// xhttp.open("GET", "https://jsonplaceholder.typicode.com/posts", true);
// xhttp.send();

var completeSerData = [];
var allCardsData = [],
    currentVisibleCardsData = [];
var pageNumber = 1;
var listingCards = document.querySelector('#listingCards');
fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(resp => {
        allCardsData = resp;
        completeSerData = resp;
        currentVisibleCardsData = allCardsData.slice(0, 10);
        currentVisibleCardsData.forEach(r => {
            populateCards(r);
        })
    })


function populateCards(cardData) {
    var htmlTemplate = `
        <div class="card-conatiner">
            <div class="card">
                <p class="card-user-id">${cardData.userId}</p>
                <p class="card-id">${cardData.id}</p>
                <h4 class="card-title">${cardData.title}</h4>
                <p class="card-body">${cardData.body}</p>
            </div>
        </div>        
    `;

    listingCards.innerHTML += htmlTemplate;
}

function filterData() {
    var filteredNewDate = [];
    this.completeSerData.filter(function (val) {
        if (val.title && val.title.toLowerCase().indexOf(inputData.value) >= 0) {
            filteredNewDate.push(val);
        }
    });
    pageNumber = 1;
    listingCards.innerHTML = '';
    currentVisibleCardsData = filteredNewDate.slice(0, 10);
    currentVisibleCardsData.forEach(r => {
        populateCards(r);
    })
}

function prevClick() {
    if (pageNumber !== 1) {
        currentVisibleCardsData = allCardsData.slice(((pageNumber - 2) * 10), ((pageNumber - 1) * 10));
        if (currentVisibleCardsData && currentVisibleCardsData.length) {
            pageNumber = pageNumber - 1;
            listingCards.innerHTML = '';
            currentVisibleCardsData.forEach(r => {
                populateCards(r);
            })
        }
    }
}

function nextClick() {
    currentVisibleCardsData = allCardsData.slice((pageNumber * 10), ((pageNumber + 1) * 10));
    if (currentVisibleCardsData && currentVisibleCardsData.length) {
        pageNumber = pageNumber + 1;
        listingCards.innerHTML = '';
        currentVisibleCardsData.forEach(r => {
            populateCards(r);
        })
    }
}

var prevBtn = document.getElementById('btnPrev');
var nextBtn = document.getElementById('btnNext');
var inputData = document.getElementById("filterUserId");

nextBtn.addEventListener('click', nextClick);
prevBtn.addEventListener('click', prevClick);
inputData.addEventListener('input', () => filterData(inputData.value));