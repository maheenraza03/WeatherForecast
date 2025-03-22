import axios from axios

export function getWeather(lat, lon, timezone) {
    return axios.get("https://customer-api.open-meteo.com/v1/forecast?daily=weather_code,temperature_2m_max,apparent_temperature_max,apparent_temperature_min,temperature_2m_min,precipitation_sum&hourly=temperature_2m,precipitation,apparent_temperature,weather_code,wind_speed_10m&current=temperature_2m,precipitation,wind_speed_10m,apparent_temperature&timeformat=unixtime", {params: {
        latitude: lat,
        longtitude: lon,
        timezone,
    }}).then(({data}) => {
        return {
            current: parseCurrentWeather(data),
            daily: parseDailyWeather(data),
            hourly: parseHourlyWeather(data)
        }
    })
}

function parseCurrentWeather({ current_weather, daily}) {
    const { 
        temperature: currentTemp, 
        windspeed: windSpeed, 
        weatherCode: iconCode 
    } = current_weather

    const {
        temperature_2m_max: [maxTemp],
        temperature_2m_min: [minTemp],
        apparent_temperature_max: [maxFeelsLikeTemp],
        apparent_temperature_min: [minFeelsLikeTemp],
        precipitation_sum: [precip],
    } = daily
    
    return {
        currentTemp: Math.round(currentTemp),
        highTemp: Math.round(maxTemp),
        lowTemp: Math.round(minTemp),
        highFeelsLike: Math.round(maxFeelsLikeTemp),
        lowFeelsLike: Math.round(minFeelsLikeTemp),
        windSpeed: Math.round(windSpeed),
        precip: Math.round(precip * 100) / 100,
        iconCode,
    }
}

function parseDailyWeather({ daily }) {
    
}