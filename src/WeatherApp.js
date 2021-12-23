import React from 'react'
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react'
import cloudy from './img/cloudy.png'
import rain from './img/rain.png'
import partlyCloudy from './img/partlyCloudy.png'
import mostlyCloudy from './img/mostlyCloudy.png'
import sunny from './img/sunny.png'
import sunnyRain from './img/sunnyrain.png'
import thunder from './img/thunderstorm.png'
import mostlySunny from './img/mostlySunny.png'
import mist from './img/mist.png'
import snow from './img/snow.png'



const WeatherApp = () => {
    
    //month
    const month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    //day
    const day = new Array();
    day[0] = "Monday"
    day[1] = "Tuesday"
    day[2] = "Wednesday"
    day[3] = "Thursday"
    day[4] = "Friday"
    day[5] = "Saturday"
    day[6] = "Sunday"

    let today = new Date();
    let name = month[today.getMonth()];
    let dayName = day[today.getDay()];

    var date = (dayName) + ", " + (name) + " " + today.getDate() + ", " + today.getFullYear();


    //Api
    const [cityData, setCityData] = useState()
    const [icon, setIcon] = useState('04d')
    const [city, setCity] = useState("Karachi")
    const [imgs,setImage] = useState("sunny")

    useEffect(() => {
        const fetchApi = async () => {
            
            const axios = require('axios');
            
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=ad9da9365f7fb965f86f40daa394fe46`)
                .then(function (response) {
                    // handle success
                    setCityData(response.data)
                    console.log (cityData)
                    setIcon(cityData.weather[0].icon)
                    console.log(icon)
                     if (icon == "01d" || icon=="01n") {
                        setImage(sunny)
                    }
                    else if(icon=="02d"  || icon=="02n"){
                        setImage(mostlySunny)
                    }
                    else if(icon=="03d" || icon=="03n"){
                        setImage(cloudy)
                    }
                    else if(icon=="04d" || icon=="04n"){
                        setImage(mostlyCloudy)
                    }
                    else if(icon=="09d" || icon=="09n"){
                        setImage(rain)
                    }
                    else if(icon=="10d" || icon=="10n"){
                        setImage(sunnyRain)
                    }
                    else if(icon=="11d" || icon=="11n"){
                        setImage(thunder)
                    }
                    else if(icon=="13d" || icon=="13n"){
                        setImage(snow)
                    }
                    else if(icon=="50d" || icon=="50n"){
                        setImage(mist)
                    }

                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });

        }

        fetchApi()


    }, [city])

    // var icon = cityData.weather[0].icon

    // const img = document.querySelector('#weatherIcon');
    // img.setAttribute('src', `http://openweathermap.org/img/wn/${icon}@2x.png`)

    // if(icon=="50d" || icon=="50n"){

    // }
    return (


        <div className="main-div">
            <h1 className='main-hd'>My Weather App </h1>
            <center>

                <div className="myComponents"   >
                    <TextField onChange={(e) => setCity(e.target.value)} className="input-field" id="standard-basic" label="Enter your country/city . . ." variant="standard" />

                    {!cityData ? (
                        <p className="ErrorMsg">Sorry! No data found</p>
                    ) : (

                        <>
                            <p className="countryName">{city}</p>
                            <p className="date">{date}</p>
                            <h1 className="temp">{cityData.main.temp} &deg; C</h1>
                            <p className="design">---------------------</p>
                            <h4 className="atmosphere">{cityData.weather[0].main}</h4>
                            <h4>Feels like {cityData.main.feels_like}</h4>
                            <p>{cityData.main.temp_min} &deg;C / {cityData.main.temp_max}&deg;C </p>
                            <img src={imgs} alt="" />
                        </>
                    )

                    }


                </div>
            </center>
        </div>

    )
}


export default WeatherApp;
