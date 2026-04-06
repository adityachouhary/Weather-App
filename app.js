document.addEventListener("DOMContentLoaded" , () =>{
    const cityInput = document.getElementById("city-input");
    const btn = document.getElementById("get-weather-btn");
    const cityname = document.getElementById("city-name");
    const temp = document.getElementById("temprature");
    const descrip = document.getElementById("description");
    const Error = document.getElementById("error-message");
    const Infowether = document.getElementById("weather-info");
    const feelLike = document.getElementById("feel_like");
    const max_Temp = document.getElementById("max_temp");
    const min_Temp = document.getElementById("min_temp");
    const Pressure = document.getElementById("pressure");
    const visibilty = document.getElementById("visibilty");
    const windSpeed = document.getElementById("wind_speed");
    const humididty = document.getElementById("humidity");

    const API_KEY = "1c1db75706426f70c22134fcf2db2ba9";

    btn.addEventListener('click', async() =>{
        const cityName = cityInput.value.trim()
        if(!cityName) return;
        clearWeather()
        try {
            const weatherData = await fetchWetherdata(cityName);
            displayData(weatherData);
        } catch (error) {
            showError()
        }

    } )

    async function fetchWetherdata (cityName){
        //gets data through api
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`;
        const response = await fetch(url);
        console.log(typeof response);
        console.log(response);

        if(!response.ok){
            throw new Error("city not found");
        }
        const data = await response.json();
        return data
    }

    function displayData (data){
        console.log(data);
        const {name , main ,weather ,visibility,wind} = data;
        cityname.textContent= name;
        temp.textContent= `Temperature : ${main.temp}°C`;
        descrip.textContent = `Description : ${weather[0].description}`;
        feelLike.textContent= `Feel Like : ${main.feels_like}°C`;
        min_Temp.textContent =`Minimum Temperature : ${main.temp_min}°C`;
        max_Temp.textContent = `Maximum Temprature : ${main.temp_max}°C`;
        Pressure.textContent = `Pressure : ${main.pressure}hPa`;
        humididty.textContent = `Humidity : ${main.humidity}%`;
        visibilty.textContent = `Visibility : ${visibility}meters`;
        windSpeed.textContent = `Wind Spped : ${wind.speed}m/s`
        


        //unlock display
        Infowether.classList.remove("hidden");
        Error.classList.add("hidden");
    }

    function showError (){
        Infowether.classList.add("hidden");
        Error.classList.remove("hidden");
    }

    function clearWeather(){
    cityname.textContent = "";
    temp.textContent = "";
    descrip.textContent = "";
    feelLike.textContent = "";
    min_Temp.textContent = "";
    max_Temp.textContent = "";
    Pressure.textContent = "";
    humididty.textContent = "";
    visibilty.textContent = "";
    windSpeed.textContent = "";
}
})