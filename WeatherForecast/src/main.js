import "style.css"
import {getWeather} from "./weather"

getWeather(10, 10, Intl.DateTimeFormat().resolvedOptions().timzeZone).then(data => {
    console.log(data)
})_