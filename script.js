// გევალებათ რომ ააწყოთ თამაში, როგორც ვიდეოშია.
// fetch-ის საშუალებით წამოიღოთ სერვერიდან ორი სხვადასხვა ქალაქის ახლანდელი ამინდი და 
// მომხარებელმა უნდა გამოიცნოს რომელ ქალაქში უფრო ცხელა ახლაა. 
// დაკლიკების შემდეგ აჩვენეთ სწორი პასუხი და შესაბამისი ტემპერატურები.
// თუ გამოიცნობს მოუმატეთ ქულა, თუ ვერ გამოიცნობს დააკელით. 
// თუ 5 ქულაზე ავა მოიგოს, თუ -5ზე ჩამოვა წააგოს. 
// ქალაქის მონაცემებს წამოიღებთ ამ მისამართიდან: 
// https://api.openweathermap.org/data/2.5/weather?q={city}&units=metric&appid=c8ad92304c65c233f74e2bc8f8fc3a53 
// სადაც {city} უნდა შეცვალოთ ქალაქის სახელი.
// ხოლო ქალაქების და ქვეყნების სია შეგიძლიათ აიღოთ აქედან მასივის სახით:
// https://raw.githubusercontent.com/vakhovakho/canvas/master/capitals.js

let divCity1 = document.getElementById('div-city1');
let divCity2 = document.getElementById('div-city2');
let city1 = document.getElementById('city1');
let city2 = document.getElementById('city2');
let country1 = document.getElementById('country1');
let country2 = document.getElementById('country2');
let temperature1 = document.getElementById('temperature1');
let temperature2 = document.getElementById('temperature2');
let spanScore = document.getElementById('score');
let score = 0;
let activCity1 = null
let activCity2 = null
let activCountry1 = null
let activCountry2 = null
let cityTemp1 = null;
let cityTemp2 = null;
let activLink;
let index1;
let index2;

randomIndex();
function randomIndex (){
    index1 = Math.floor(Math.random()*countryCapitals.length);
    index2 = Math.floor(Math.random()*countryCapitals.length);
}

saveDate();
function saveDate(){
    activCity1 = countryCapitals[index1].city;
    activCountry1 = countryCapitals[index1].country;
    activCity2 = countryCapitals[index2].city;
    activCountry2 = countryCapitals[index2].country;
}

let city1Promise = fetch(link(activCity1));
let city2Promise = fetch(link(activCity2));

city1Promise.then(resolve => {
    return resolve.json();
}).then(date => {
    cityTemp1 = date.main.temp;
    temperature1.textContent = cityTemp1 + ' -C';
})

city2Promise.then(resolve => {
    return resolve.json();
}).then(date => {
    cityTemp2 = date.main.temp;
    temperature2.textContent = cityTemp2 + ' -C';
})

function link(city){
    link2 = 'https://api.openweathermap.org/data/2.5/weather?q={city}&units=metric&appid=c8ad92304c65c233f74e2bc8f8fc3a53';
    return link2.replace('{city}',city); // replace ერთი სექსტი ჩაანაცვლოს მეორეთი
}

city1.textContent = activCity1;
city2.textContent = activCity2;
country1.textContent  = activCountry1;
country2.textContent  = activCountry2;
spanScore.textContent = score;

divCity1.addEventListener('click', addScore1);
divCity2.addEventListener('click', addScore2);

function addScore1(){
    if(cityTemp1 > cityTemp2){
        score ++;
        spanScore.textContent = score;
    }
    if(cityTemp1 < cityTemp2){
        score --;
        spanScore.textContent = score;       
    }
}

function addScore2(){
    if(cityTemp1 > cityTemp2){
        score --;
        spanScore.textContent = score;       
    }
    if(cityTemp1 < cityTemp2){
        score ++;
        spanScore.textContent = score;       
    }
}
