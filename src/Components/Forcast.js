import React, { useEffect, useState } from "react";
import Clock from "react-live-clock";
import api from "../API/config";
import ReactAnimatedWeather from "react-animated-weather";
import Error from "./Error";

export default function Forcast() {
  var [forcast, setForcast] = useState({});
  var [city, setCity] = useState("");
  var [errorCode, setErrorCode] = useState(false);
  var [iconName, setIconName] = useState("CLEAR_DAY");
  var [locationAccess, setLocationAccess] = useState("allowed");

  const defaults = {
    icon: iconName,
    color: "white",
    size: 100,
    animate: true,
  };

  useEffect(() => {
    async function getData() {
      if (city !== "") {
        const response = await fetch(`${api.apiName}q=${city}${api.key}`);
        console.log(response.status);
        if (response.status !== 404) {
          var data = await response.json();
          console.log(data);
          setForcast(data);
          setErrorCode(false);

          if (data.weather[0].main === "Clear") {
            setIconName("CLEAR_DAY");
          } else if (data.weather[0].main === "Snow") {
            setIconName("SNOW");
          } else if (
            data.weather[0].main === "Rain" ||
            data.weather[0].main === "Drizzle" ||
            data.weather[0].main === "Thunderstorm"
          ) {
            setIconName("RAIN");
          } else if (data.weather[0].main === "Smoke") {
            setIconName("FOG");
          } else if (data.weather[0].main === "Clouds") {
            setIconName("CLOUDY");
          }
        } else {
          setErrorCode(true);
        }
      } else {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const response = await fetch(
                `http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&id=524901&units=metric&appid=3e43c3d8b684e8223c23a336c725a765`
              );

              if (response.status !== 404) {
                var data = await response.json();
                console.log(data);
                setForcast(data);
                setErrorCode(false);

                if (data.weather[0].main === "Clear") {
                  setIconName("CLEAR_DAY");
                } else if (data.weather[0].main === "Snow") {
                  setIconName("SNOW");
                } else if (
                  data.weather[0].main === "Rain" ||
                  data.weather[0].main === "Drizzle" ||
                  data.weather[0].main === "Thunderstorm"
                ) {
                  setIconName("RAIN");
                } else if (data.weather[0].main === "Smoke") {
                  setIconName("FOG");
                } else if (data.weather[0].main === "Clouds") {
                  setIconName("CLOUDY");
                }
              } else {
                setErrorCode(true);
              }
            },
            (error) => {
              setErrorCode(true);
              setLocationAccess("denied");
            }
          );
        } else {
          setErrorCode(true);
        }
      }
    }

    getData();
  }, [city]);

  function getCityValue() {
    var cityName = document.getElementById("cityName").value;

    if (cityName.trim() !== "") {
      setCity(cityName);
    } else {
      alert("Please enter a city name!");
    }
  }

  return (
    <div>
      {locationAccess === "allowed"? 
      <>

<React.Fragment>
        <div className="container">
          <div className="city">
            {errorCode === false ? (
              <>
                <div className="title">
                  <h2>{forcast.name}</h2>
                  <h3>{forcast.sys?.country}</h3>
                </div>
              </>
            ) : (
              <>
                <div className="title">
                  <h2>City not found :(</h2>
                </div>
              </>
            )}

            <div className="mb-icon">
              {" "}
              <center>
                <ReactAnimatedWeather
                  icon={defaults.icon}
                  color={defaults.color}
                  size={defaults.size}
                  animate={defaults.animate}
                />
              </center>
            </div>

            {errorCode === false ? (
              <>
                <div className="date-time">
                  <div className="dmy">
                    <div id="txt"></div>
                    <div className="current-time">
                      <Clock format="HH:mm:ss" interval={1000} ticking={true} />
                    </div>
                    <div className="current-date">27 July 2023</div>
                  </div>
                  <div className="temperature">
                    <p>
                      {Math.round(forcast.main?.temp)}°<span>C</span>
                    </p>
                  </div>
                </div>
              </>
            ) : null}
          </div>
          <div className="forecast">
            <div className="forecast-icon">
              <ReactAnimatedWeather
                icon={defaults.icon}
                color={defaults.color}
                size={defaults.size}
                animate={defaults.animate}
              />
            </div>
            <div className="today-weather">
              {errorCode === false ? (
                <>
                  <h3>{forcast.weather?.[0].main}</h3>
                </>
              ) : (
                <h3>Not Found</h3>
              )}
              <div className="search-box">
                <input
                  type="text"
                  className="search-bar"
                  placeholder="Search any city"
                  id="cityName"
                />
                <div className="img-box" onClick={getCityValue}>
                  {" "}
                  <img
                    src="https://images.avishkaar.cc/workflow/newhp/search-white.png"
                    alt="weather"
                  />
                </div>
              </div>
              {errorCode === false ? (
                <>
                  <ul>
                    <div>
                      {" "}
                      <li className="cityHead">
                        <p>{forcast.weather?.[0].description}</p>
                        <img
                          className="temp"
                          src={`https://openweathermap.org/img/wn/${forcast.weather?.[0].icon}.png`}
                          alt="icon"
                        />
                      </li>
                      <li>
                        Temperature{" "}
                        <span className="temp">
                          {Math.round(forcast.main?.temp)}°c
                        </span>
                      </li>
                      <li>
                        Humidity{" "}
                        <span className="temp">{forcast.main?.humidity}%</span>
                      </li>
                      <li>
                        Visibility{" "}
                        <span className="temp">
                          {Math.round(forcast.visibility * 0.00062137)} mi
                        </span>
                      </li>
                      <li>
                        Wind Speed{" "}
                        <span className="temp">{forcast.wind?.speed} Km/h</span>
                      </li>
                    </div>
                  </ul>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </React.Fragment>
      
      </>: 
      
      <>
        <Error/>
      </>}
      
    </div>
  );
}
