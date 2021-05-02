
  const time = document.querySelector('.time'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus'),
  date = document.querySelector('.date');
  const body = document.querySelector('body');
  const btn = document.querySelector('.btnnext');
  const blockquote = document.querySelector('blockquote');
  const figcaption = document.querySelector('figcaption');
  const btnquote = document.querySelector('.btn'); 
  const humidity = document.querySelector('.relativehumidity');
  const city = document.querySelector('.city');
  const weatherIcon = document.querySelector('.weather-icon');
  const temperature = document.querySelector('.tmp');
  const weatherDescription = document.querySelector('.weather-description');
  const windspeed = document.querySelector('.windspeed');
  var weekday=new Array(7);
  fillArrayByWeekdays(weekday);
  var months=new Array(12);
  fillArrayByMonths(months);
  var evening=new Array(20);
  var morning=new Array(20);
  var afternoon=new Array(20);
  var night=new Array(20);
  var backgroundImages=new Array(24);
  loadAllImages();
  shuffleAllArrays();
  var ind =0;
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();
    dayofweek = getDayOfWeek(today);
    dayofmonth = today.getDate();
    month = getMonth(today);
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    sec
  )} `;
  date.textContent = `${dayofmonth} ${month}, ${dayofweek}`;
  setTimeout(showTime, 1000);
}
function getDayOfWeek(today){
  return (weekday[today.getDay()])
}
function getMonth(today){
  return (months[today.getMonth()])
}
function fillArrayByMonths(months){
  months[0]="January";
  months[1]="February";
  months[2]="March";
  months[3]="April";
  months[4]="May";
  months[5]="June";
  months[6]="July";
  months[7]="August";
  months[8]="September";
  months[9]="October";
  months[10]="November";
  months[11]="December";
}
function fillArrayByWeekdays(weekday){
  weekday[0]="Sunday";
  weekday[1]="Monday";
  weekday[2]="Tuesday"; 
  weekday[3]="Wednesday";
  weekday[4]="Thursday";
  weekday[5]="Friday";
  weekday[6]="Saturday";
}
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}
function loadAllImages(){
  evening=getImages(20,'evening');
  morning=getImages(20,'morning');
  afternoon=getImages(20,'day');
  night=getImages(20,'night');
}
function setBgGreet() {
  let today = new Date(),
  hour = today.getHours();
  loadArrayByImages(hour);
    minutes=today.getMinutes();
    seconds=today.getSeconds();
    var bool=0;
    if(bool==0){
    var milliseconds=3600000-(minutes*60000+seconds*1000);
    bool==1;
    }else{
      millisecondsc=3600000;
    }
    if(hour >=6){
    document.body.style.backgroundImage ="url(" +  backgroundImages[ind] + ")";
    greeting.textContent = 'Good Morning, ';
    ind++;
    }
else if (hour >= 12) {
    document.body.style.backgroundImage ="url(" + backgroundImages[ind] + ")";
    greeting.textContent = 'Good Afternoon, ';
    ind++;
  } else if (hour >= 18) {
    if(hour==23&&min==59&&sec==59){
      shuffleAllArrays();
    }
    document.body.style.backgroundImage ="url(" + backgroundImages[ind] + ")";
    greeting.textContent = 'Good Evening, ';
    ind++;  
  } else {
    document.body.style.backgroundImage ="url(" +  backgroundImages[ind] + ")";
    greeting.textContent = 'Good Night, ';
    ind++;
  }
  setTimeout(setBgGreet, milliseconds);
}
function viewBgImage(src) {  
  const img = new Image();
  img.src = src;
  img.onload = () => {      
    body.style.backgroundImage = `url(${src})`;
  }; 
}
var bool = false;
var imageInd=0;
function getImage() {
  let today = new Date(),
  hour = today.getHours();
  imageInd=imageInd%(24-hour);
  if(bool==false&&imageInd==0){
    imageInd++;
    bool=true;
  }
  viewBgImage(backgroundImages[imageInd]);
  imageInd++;
  ind++;
  btn.disabled = true;
  setTimeout(function() { btn.disabled = false }, 1000);
} 
function loadArrayByImages(hour,min,sec){
  if(hour==23&&min==59&&sec==59){
    backgroundImages=[];
  }
  var ind=0;
  var z=0;
  var hour1=hour;
  var mor=0;
  var aft=0;
  var eve =0;
  var nig=0;
  while(z!=24-hour){
      if(hour1 >=6){
        backgroundImages[ind]=morning[mor];
        ind++;
        mor++;
        hour1++;
      }else if (hour1 >= 12) {
        backgroundImages[ind]=afternoon[aft]; 
        ind++;
        aft++;
        hour1++;
    } else if (hour1 >= 18) {
      backgroundImages[ind]=evening[eve];
      ind++;
      eve++;
      hour1++;
  } else {
    backgroundImages[ind]=night[nig];
  ind++;
  nig++;
  hour1++;
  }
  z++;
  }
}
function getCity() {
  if (localStorage.getItem('city') === null) {
    city.textContent = '[Enter city]';
  } else {
    city.textContent = localStorage.getItem('city');
  }
}
function setCity(event) {
  var sourceCity=city.textContent;
  if (event.code === 'Enter'&&city.textContent.trim() != '') {
    getWeather();
    city.blur();
    city.textContent =city.textContent.trim();
    localStorage.setItem('city', event.target.innerText.trim());
  }
  if (event.code === 'Enter'&&city.textContent.trim() == '') {
    city.textContent = localStorage.getItem('city');
  }
}
async function getWeather() {
  weatherIcon.className = 'weather-icon owf';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=997bcb6855fe2e7cf4aaed97561a96f3&units=imperial`;
  const res = await fetch(url);
  const data = await res.json();
  if(data.cod==404){  
    alert(data.message);
  }
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp} °F`;
  weatherDescription.textContent=data.weather[0].description;
  humidity.textContent=data.main.humidity +' %';
  windspeed.textContent=data.wind.speed+' km / h';
}
function getImages(n,times){
    for( var image, array = [], i = 1; i <= n; i++ ){
      image = new Image;
      image.src = "../img/"+times+"/" + i + ".jpg";
      array.push(image.src);
    };
    return array;
  };
  function shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
  function shuffleAllArrays(){
    shuffleArray(evening);
    shuffleArray(morning);
    shuffleArray(afternoon);
    shuffleArray(night);
  }
function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

function setName(e) {
  var originalName=name.textContent;  
  if(e.which==1) {
    name.textContent='';
  }
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      if (name.textContent.trim() === ''){
        getName();
      }
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else if(name.textContent.trim() != '') {
    localStorage.setItem('name', originalName);
  }
  if(name.textContent.trim() === '' && e.type === 'blur'){
    getName();
  }
}
async function getQuote() {  
  const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`;
  const res = await fetch(url);
  const data = await res.json();
  blockquote.textContent = data.quoteText;
  figcaption.textContent = data.quoteAuthor;
}

function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}
function setFocus(e) {
  var originalFocus=focus.textContent;
  if(e.which==1) {
    focus.textContent='';
  }
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      if (focus.textContent.trim() === ''){
        getFocus();
      }
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else if(focus.textContent.trim() != '') {
    localStorage.setItem('focus', originalFocus);
  }
  if(focus.textContent.trim() === '' && e.type === 'blur'){
    getFocus();
  }
}

name.addEventListener('click', setName);
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('click', setFocus);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
document.addEventListener('DOMContentLoaded', getWeather);
document.addEventListener('DOMContentLoaded', getQuote);
btnquote.addEventListener('click', getQuote);
city.addEventListener('keypress', setCity);

showTime();
setBgGreet();
getWeather();
getName();
getCity();
getQuote();
getFocus();