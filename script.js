const detailsBtn = document.querySelector('#detailsBtn');
const input = document.querySelector('#input');
const searchBtn = document.querySelector('#searchBtn');

detailsBtn.addEventListener('click', ()=> {
    document.querySelector('.hidden-container').classList.toggle('active');
})

const api = {
    endpoint: "https://api.openweathermap.org/data/2.5/",
    key: "77aa8c3861e44cb3e43ffcbefcab4331"
}

input.addEventListener('keydown', enter);

function enter(e) {
    if(e.keyCode === 13) {
        getInfo(input.value);
    }
}

async function getInfo(data) {
    const res = await fetch(`${api.endpoint}weather?q=${data}&lang=ru&units=metric&appid=${api.key}`);
    const result = await res.json();
    displayResult(result);
    document.querySelector('.flex-column-contianer').style.opacity = '1';
    document.querySelector('.flex-container__icon').style.display = 'block';
    document.querySelector('.flex-container__temp').style.display = 'block';
}

searchBtn.addEventListener("click", function() {
    getInfo(input.value);
});

function displayResult(result) {
    let timeZone = result.timezone
    getDate(timeZone)

    let place = document.querySelector('#place');
    let tempreture = document.querySelector('#tempreture');
    let feelsLike = document.querySelector('#feelsLike');
    let icon = document.querySelector('#icon');
    let conditions = document.querySelector('#conditions');
    let wind = document.querySelector('#wind');
    let humidity = document.querySelector('#humidity');
    let minTemp = document.querySelector('#minTemp');
    let maxTemp = document.querySelector('#maxTemp');

    place.textContent = `${result.name}`;

    if(result.name === undefined) {
        place.textContent = ``;
        date.innerHTML = '';
        tempreture.innerHTML = ``;
        icon.src = '';
        conditions.textContent = '';
        feelsLike.innerHTML = ``;
        wind.innerHTML = ``;
        humidity.innerHTML = ``;
        minTemp.innerHTML = ``;
        maxTemp.innerHTML = ``;
    }
    
    tempreture.innerHTML = `${Math.round(result.main.temp)}<span>°</span>`;

    let iconID = result.weather[0].icon;
    icon.src = 'http://openweathermap.org/img/wn/' + iconID + '@2x.png';

    conditions.textContent = result.weather[0].description;

    feelsLike.innerHTML = `${Math.round(result.main.feels_like)}<span>°</span>`;

    wind.innerHTML = `${Math.round(result.wind.speed)} <span>м/с</span>`;

    humidity.innerHTML = `${result.main.humidity}<span>%</span>`;

    minTemp.innerHTML = `${Math.round(result.main.temp_min)}<span>°</span>`;

    maxTemp.innerHTML = `${Math.round(result.main.temp_max)}<span>°</span>`;

    document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + result.name + "')";
};

function getDate(timeZone) {
    let now = new Date(); 
    let now_utc = new Date(now.toUTCString().slice(0, -4)); //переводим время в UTC - общее для всего мира время

    let nowInCityInMs = now_utc.getTime()+ timeZone * 1000; //прибавляем часовой пояс города, которого запрашиваем (получаем результат в мс)

    let nowInCity = new Date (nowInCityInMs); //преобразовываем время в объект даты (формат даты, а не мс)

    const daysOfTheWeek = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
    const months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
    let dayOfTheWeek = daysOfTheWeek[nowInCity.getDay()];
    let day = nowInCity.getDate();
    let month = months[nowInCity.getMonth()];
    let year = nowInCity.getFullYear();
    let hours = nowInCity.getHours();
    let minutes = nowInCity.getMinutes();
    
    if (hours < 10) {
        hours = "0" + hours
    }

    if (minutes < 10) {
        minutes = "0" + minutes
    }

    let date = document.querySelector('#date');
    date.innerHTML = `${dayOfTheWeek},` + " " + `${day}` + " " + `${month}` + " " + `${year},` + " " + `${hours}<span>:</span>${minutes}`;
}


