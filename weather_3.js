'use strict';
const weatherblock = document.querySelector('#weather');
const snowContainer = document.createElement('div');
snowContainer.style.position = 'fixed';
snowContainer.style.top = '0';
snowContainer.style.left = '0';
snowContainer.style.width = '100%';
snowContainer.style.height = '100%';
snowContainer.style.pointerEvents = 'none';
document.body.appendChild(snowContainer);

// Функція для створення сніжинок
function createSnowflake() {
    const snowflake = document.createElement('span');
    snowflake.innerHTML = '&#10059;'; // Символ сніжинки (можна замінити на інший)
  
    snowflake.style.position = 'absolute';
    snowflake.style.color = '#fff';
    snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';
    snowflake.style.zIndex = '9999';
    snowflake.style.userSelect = 'none';
  
    snowflake.style.top = '-50px'; // Початкова позиція сніжинки зверху сторінки
    snowflake.style.left = Math.random() * window.innerWidth + 'px'; // Випадкове положення по горизонталі
  
    // Анімація руху сніжинки
    const animation = snowflake.animate(
      [
        { transform: 'translateY(-100%)' },
        { transform: 'translateY(' + window.innerHeight + 'px)' },
      ],
      {
        duration: Math.random() * 3000 + 2000,
        iterations: Infinity,
        delay: Math.random() * 2000,
        easing: 'linear',
      }
    );
  
    // Видаляємо сніжинку після закінчення анімації
    animation.onfinish = () => {
      snowflake.remove();
    };
  
    snowContainer.appendChild(snowflake);
  }
  
  // Створення декількох сніжинок
  for (let i = 0; i < 100; i++) {
    createSnowflake();
  }

async function loadweather() {
   weatherblock.innerHTML = `
        <div class="weather_loading"><img src="img/loading.gif" alt="Loading..."></div>`;

    const server = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=Kyiv&appid=fd5c3d9c98b62c0e22a7ffe0a203350d '
    const responce = await fetch(server, {
        method: 'GET'
    })
    const responseResult = await responce.json()



    if (responce.ok){
        getWeather(responseResult)

    }else{
        weatherblock.innerHTML = responseResult.message
    }
}

function getWeather(data){
    const location = data.name
    const temp = Math.round(data.main.temp)
    const feelslike = Math.round(data.main.feels_like)
    const weatherStatus = data.weather[0].main
    const weatherIcon = data.weather[0].icon

    const template = `
    <div class="div_3">
        <div class="div_4">
            <div class="city">City: ${location}</div>
            <div class="status">Status: ${weatherStatus}</div>
        </div>
        <div class="img">
            <img src="http://openweathermap.org/img/wn/${weatherIcon}.png" alt="${weatherStatus}">
        </div>
    </div>
    <div class="temp">Temperature: ${temp} ℃</div>
    <div class="feels-like">It feels like: ${feelslike}  ℃</div>`;

    weatherblock.innerHTML = template
}

if (weatherblock) {
    loadweather();
}
















// https://www.youtube.com/watch?v=ehwWji9JH-g