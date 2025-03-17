import "style.css"
import {getWeather} from "./weather"

getWeather(10, 10, Intl.DateTimeFormat().resolvedOptions().timzeZone).then(res => {
    console.log(res.data)
})_