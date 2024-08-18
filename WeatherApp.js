const container = document.querySelector('.container')
const search = document.querySelector('button')
const weatherBox = document.querySelector('.weather-box')
const weatherDetails = document.querySelector('.weather-details')
const Error404 = document.querySelector('.not-found')
const cityHide = document.querySelector('.city-hide')

search.addEventListener('click', () =>{
    const APIKey ='e2fd503e6b9f90bd3aa9e4e11726f3a5';
    const city = document.querySelector('.search-box input').value;
    if(city =='')
        return
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json =>{
        
        if(json.cod == '404'){
            cityHide.textContent = city
            container.style.height = '400px' 
            Error404.classList.add('active')
            weatherBox.classList.remove('active')
            weatherDetails.classList.remove('active')
            return
        }
       

        
        const image = document.querySelector('.weather-box img')
        const temperature = document.querySelector('.weather-box .temperature')
        const description = document.querySelector('.weather-box .description')
        const humidity = document.querySelector('.weather-details .humidity span')
        const wind = document.querySelector('.weather-details .wind span')

        // container.style.height = '555px'
        //     Error404.classList.remove('active')
        //     weatherBox.classList.add('active')
        //     weatherDetails.classList.add('active')
        if(cityHide.textContent == city){
            return;
        }
        else{
            cityHide.textContent = city;
            container.style.height = '555px'
            container.classList.add('active')
            Error404.classList.remove('active')
            weatherBox.classList.add('active')
            weatherDetails.classList.add('active')

            setTimeout(() =>{
                container.classList.remove('active')
            },2500)

            switch(json.weather[0].main){
                case 'Sun':
                image.src = 'sun.png';
                break;
                
                case 'Rain':
                image.src = 'Rain.png';
                break;
    
                case 'Cloudy':
                image.src = 'cloudy.png';
                break;
    
                case 'Thunder':
                image.src = 'thunder.png';
                break;
    
                default: image.src ='sun.png';
            }
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>℃</span>`;
            description.innerHTML = `${json.weather[0].description}`
            humidity.innerHTML = `${json.main.humidity}%`
            wind.innerHTML = `${parseInt(json.wind.speed)}KM/h`

            const infoWeather = document.querySelector('.info-weather')
            const infoHumidity = document.querySelector('.info-humidity')
            const infoWind = document.querySelector('.info-wind')

            const elCloneInfoWeather = infoWeather.cloneNode(true);
            const elCloneInfohumidity = infoHumidity.cloneNode(true);
            const elCloneInfoWind = infoWind.cloneNode(true);
            
            elCloneInfoWeather.id = 'clone-info-weather'
            elCloneInfoWeather.classList.add('active-clone')

            elCloneInfoHumidity.id = 'clone-info-humidity'
            elCloneInfoHumidity.classList.add('active-clone')

            elCloneInfoWind.id = 'clone-info-wind'
            elCloneInfoWind.classList.add('active-clone')

            setTimeout(()=>{
                infoWeather.insertAdjacentElement("afterend", elCloneInfoWeather)
                infoHumidity.insertAdjacentElement("afterend", elCloneInfoHumidity)
                infowind.insertAdjacentElement("afterend", elCloneInfoWind)
            },2200)

            const cloneInforWeather = document.querySelectorAll('.info-weather.active-clone')
            const totalCloneInforWeather = cloneInforWeather.length
            const cloneInforWeatherFirst = cloneInforWeather[0]

            const cloneInforHumidity = document.querySelectorAll('.info-humidity.active-clone')
            const cloneInforHumidityFirst = cloneInforHumidity[0]

            const cloneInforWind = document.querySelectorAll('.info-wind.active-clone')
            const cloneInforWindFirst = cloneInforWind[0]

            if(totalCloneInforWeather > 0){
                cloneInforWeatherFirst.classList.remove('active-clone')
                cloneInforWindFirst.classList.remove('active-clone')
                cloneInforHumidityFirst.classList.remove('active-clone')

                setTimeout(() => {
                    cloneInforWeatherFirst.remove()
                    cloneInforWindFirst.remove()
                    cloneInforHumidityFirst.remove()
                },2200)

            }
        }
    })
})