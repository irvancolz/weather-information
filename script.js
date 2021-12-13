// import particlesJS from "./rain-app";

const cityNameInput = document.querySelector('.city-name-input');
const container = document.querySelector('.container');
const apikey ='0e84e96aced2ebe0f6b6a49760bb3c85';
const curentIcon = {
    Clouds : 'cloud',
    Haze : 'mist',
    Smoke : 'cloud',
    Mist : 'mist',
    Rain :'rain',
    Thunderstorm :'thunderstorm',
    Clear :'clear',
    Snow : 'snow'
};

const home = document.querySelector('.home');
home.addEventListener('click',()=>{
   getWeatherByCurrentLocation();
})

const enter = document.querySelector('.enter');
enter.addEventListener('click', getWeatherByCityName);

window.addEventListener('onload', getWeatherByCurrentLocation());

//dapatkan koordinat terkini
function getWeatherByCurrentLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    }else{
        alert("your browser didn't support geolocation");
    }
}
//jika posisi bisa di dapat lakukan fetch dengan koordinat
function onSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?&lang=id&lat=${latitude}&lon=${longitude}&appid=0e84e96aced2ebe0f6b6a49760bb3c85`;
    fetchWeather(url);
}
//jika mengalami error
function onError(error){
    const errorContainer = document.querySelector('.error-container')
    const errorMessage = document.querySelector('.error-container p');
    const closeError = document.querySelector('.close-error');
    
    errorContainer.style.display ='block'
    
    errorMessage.innerHTML = `please allow your current location`

    closeError.addEventListener('click',()=>{
    errorContainer.style.display = 'none';
    })
}

//mendapatkan cuaca dengan menggunakan nama kota
function getWeatherByCityName(){
    if(cityNameInput.length != 0){
    const cityName = cityNameInput.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=id&appid=0e84e96aced2ebe0f6b6a49760bb3c85`;
    fetchWeather(url);
    }
    else{
        return;
    }
}


//fungsi utama
function fetchWeather(url){
    fetch(url)
    .then(response => response.json())
    .then(response => {
        const mainWeather = response.weather[0].main;
        const errorContainer = document.querySelector('.error-container');

        errorContainer.style.display ='none';
        setWeatherDetail(response);
        setWeatherIcon(mainWeather);
        setWeatherCondition(curentIcon[mainWeather]);
    })
    .catch(err =>{
        
        const errorContainer = document.querySelector('.error-container');
        const errorMessage = document.querySelector('.error-container p');
        const closeError = document.querySelector('.close-error');
        
        errorContainer.style.display ='block';
        
        errorMessage.innerHTML = `${cityNameInput.value} is not a valid city name`;

        closeError.addEventListener('click',()=>{
        errorContainer.style.display = 'none';
})
    })
}


function setWeatherCondition(condition){
    const particle =  document.querySelector('.particles-js-canvas-el');
    const cityImg =  document.querySelector('.background img');
    if(condition === 'clear'){
        particle.style.display ='none';
       cityImg.style.filter ='none';
    }else if(condition === 'rain'){
        particle.style.display ='block';
        cityImg.style.filter ='brightness(.7)';
    }
    else{
        particle.style.display ='none';
        cityImg.style.filter ='brightness(.7)';
    }
}

function setWeatherIcon(mainWeather){
    const iconSet = document.querySelectorAll('.icon');
    iconSet.forEach(icon=>{
        icon.style.display = 'none';
    })
    const icon = document.getElementById(curentIcon[mainWeather]).style.display = 'block';
    
    
}
function setWeatherDetail(response){
    const loaderContainer = document.querySelector('.loader-container');
    const detail = document.querySelector('.detail');
    cityNameInput.value = response.name;

    detail.style.display= 'none';
    loaderContainer.style.display ='block';
    
    document.querySelector('.weather').innerHTML =  response.weather[0].description;
    document.querySelector('.temperature span').innerHTML= Math.round((response.main.temp) - 273,15);
    document.querySelector('.name').innerHTML =  `${response.name}`;
    document.querySelector('.visibility').innerHTML =  `jarak pandang = ${response.visibility} meter`;
    document.querySelector('.humidity').innerHTML =  `kelembapan = ${response.main.humidity} %`;
    document.querySelector('.wind-speed').innerHTML =  `kecepatan angin = ${response.wind.speed * 3,6} km/jam`;
    document.querySelector('.pressure').innerHTML =  `tekanan udara = ${response.main.pressure} hPa`;

    loaderContainer.style.display ='none'
    detail.style.display='block';
}



function showDate(){
    const currentDate = document.getElementById('date');

    const today = new Date();
    const date = today.getDate();
    const month = today.getMonth()+1;
    const year = today.getFullYear();
    currentDate.innerHTML = `${date} ${month} ${year}`;
}
showDate();




setInterval(showTime, 1000);
function showTime() {
	let time = new Date();
	let hour = time.getHours();
	let min = time.getMinutes();
	let sec = time.getSeconds();
	am_pm = "AM";

	if (hour > 12) {
		hour -= 12;
		am_pm = "PM";
	}
	if (hour == 0) {
		hr = 12;
		am_pm = "AM";
	}

	hour = hour < 10 ? "0" + hour : hour;
	min = min < 10 ? "0" + min : min;
	sec = sec < 10 ? "0" + sec : sec;

	let currentTime = hour + ":"
			+ min + ":" + sec +" " + am_pm;

	document.getElementById("clock")
			.innerHTML = currentTime;
}
showTime();
