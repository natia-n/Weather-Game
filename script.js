// გევალებათ რომ ააწყოთ თამაში, როგორც ვიდეოშია.
// fetch-ის საშუალებით წამოიღოთ სერვერიდან ორი სხვადასხვა ქალაქის ახლანდელი ამინდი 
// მომხარებელმა უნდა გამოიცნოს რომელ ქალაქში უფრო ცხელა ახლაა. 
// დაკლიკების შემდეგ აჩვენეთ სწორი პასუხი და შესაბამისი ტემპერატურები.
// თუ გამოიცნობს მოუმატეთ ქულა, თუ ვერ გამოიცნობს დააკელით. 
// თუ 5 ქულაზე ავა მოიგოს, თუ -5ზე ჩამოვა წააგოს. 
// ქალაქის მონაცემებს წამოიღებთ ამ მისამართიდან: 
// https://api.openweathermap.org/data/2.5/weather?q={city}&units=metric&appid=c8ad92304c65c233f74e2bc8f8fc3a53 
// სადაც {city} უნდა შეცვალოთ ქალაქის სახელი.
// ხოლო ქალაქების და ქვეყნების სია შეგიძლიათ აიღოთ აქედან მასივის სახით:
// https://raw.githubusercontent.com/vakhovakho/canvas/master/capitals.js

const changeTime = 500;
const winningPoints = 5;
const lossPoints = -5;
const divCity1 = document.getElementById('div-city1');
const divCity2 = document.getElementById('div-city2');
const city1 = document.getElementById('city1');
const city2 = document.getElementById('city2');
const country1 = document.getElementById('country1');
const country2 = document.getElementById('country2');
const temperature1 = document.getElementById('temperature1');
const temperature2 = document.getElementById('temperature2');
const spanScore = document.getElementById('score');
let score = 0;
let activCity1 = null
let activCity2 = null
let activCountry1 = null
let activCountry2 = null
let cityTemp1 = null;
let cityTemp2 = null;
let index1 = null;
let index2 = null;

classRemove();
randomIndex();
saveDate();
let city1Promise = fetch(link(activCity1));
let city2Promise = fetch(link(activCity2));
cityPromise();
textContentAdd();

divCity1.addEventListener('click', () => {
    temperature1.textContent =cityTemp1 +' -C';
    temperature2.textContent =cityTemp2 +' -C';
    addScore1();
    timer();
});

divCity2.addEventListener('click', () => {
    temperature1.textContent =cityTemp1 +' -C';
    temperature2.textContent =cityTemp2 +' -C';
    addScore2();
    timer();
});

// function
function classRemove(){
    divCity1.classList.remove('shadowFolse');
    divCity1.classList.remove('shadowTrue');
    divCity2.classList.remove('shadowFolse');
    divCity2.classList.remove('shadowTrue');
}

function randomIndex (){
    index1 = Math.floor(Math.random()*countryCapitals.length);
    index2 = Math.floor(Math.random()*countryCapitals.length);
    while(index1 === index2){
        index2 = Math.floor(Math.random()*countryCapitals.length);
    }    
}

function saveDate(){
    activCity1 = countryCapitals[index1].city;
    activCountry1 = countryCapitals[index1].country;
    activCity2 = countryCapitals[index2].city;
    activCountry2 = countryCapitals[index2].country;
}

function timer(){
    setTimeout(() => {
        gameFinish();
        classRemove();  
        randomIndex();
        saveDate();
        city1Promise = fetch(link(activCity1));
        city2Promise = fetch(link(activCity2));
        cityPromise();
        textContentAdd();
    }, changeTime);
}

function cityPromise(){
    city1Promise.then(resolve => {
        return resolve.json();
    }).then(date => {
        cityTemp1 = date.main.temp;
        temperature1.textContent =' -C';
    })
    
    city2Promise.then(resolve => {
        return resolve.json();
    }).then(date => {
        cityTemp2 = date.main.temp;
        temperature2.textContent =' -C';
    })
}

function link(city){
    link2 = 'https://api.openweathermap.org/data/2.5/weather?q={city}&units=metric&appid=c8ad92304c65c233f74e2bc8f8fc3a53';
    return link2.replace('{city}',city); // replace ერთი სექსტი ჩაანაცვლოს მეორეთი
}

function textContentAdd (){
    city1.textContent = activCity1;
    city2.textContent = activCity2;
    country1.textContent  = activCountry1;
    country2.textContent  = activCountry2;
    spanScore.textContent = score;
}

function addScore1(){
    if(cityTemp1 > cityTemp2){
        score ++;        
        spanScore.textContent = score;
        divCity1.classList.add('shadowTrue'); 
    }
    if(cityTemp1 < cityTemp2){
        score --;
        spanScore.textContent = score; 
        divCity1.classList.add('shadowFolse');   
    }
}

function addScore2(){
    if(cityTemp1 > cityTemp2){
        score --;
        spanScore.textContent = score; 
        divCity2.classList.add('shadowFolse');       
    }
    if(cityTemp1 < cityTemp2){
        score ++;
        spanScore.textContent = score;  
        divCity2.classList.add('shadowTrue');      
    }
}

function gameFinish() {
    if(score === winningPoints){
        score = 0;
        alert('მოიგეთ :)');
    }
    if(score === lossPoints){
        score = 0;
        alert('წააგეთ :(');
    }
}
