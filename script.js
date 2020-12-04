let div1 = document.getElementById('city1');
let div2 = document.getElementById('city2');
let city1 = document.createElement('h2');
let city2 = document.createElement('h2');
let country1 = document.createElement('h3');
let country2 = document.createElement('h3');
let temperature1 = document.createElement('h4');
let temperature2 = document.createElement('h4');
let divScore = document.getElementById('score');
let score = document.createElement('span');
let activScore = 0;

div1.appendChild(city1);
div1.appendChild(country1);
div1.appendChild(temperature1);
div2.appendChild(city2);
div2.appendChild(country2);
div2.appendChild(temperature2);
divScore.appendChild(score);

//წამოსაღების სერვერიდან
city1.textContent = 'Tbilisi';
city2.textContent = 'Batumi';
country1.textContent  = 'Georgia';
country2.textContent  = 'Georgia';
temperature1.textContent = '10';
temperature2.textContent = '13';
//

score.textContent = activScore;
let cityTemp1 = +temperature1.textContent;
let cityTemp2 = +temperature2.textContent;

