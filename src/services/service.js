import axios from 'axios';
import { storageService } from './storageService';

export const weatherService = {
    getWeatherNow,
    fiveDayForecast,
    getCityCode
}
const HOME_KEY = 'tel-aviv';
const FIVE_KEY = '5 day tel-aviv'

function getWeatherNow(name) {

    return getCityCode(name)
        .then(city => {
          return  city[0].Key
        })
        .then(res => {
            const url = `http://dataservice.accuweather.com/forecasts/v1/hourly/1hour/${res}?apikey=q2991AeoNGqDqjczrkRdqwAllJ0tLVfs&details=true&metric=true`
            // let forecast = storageService.loadFromStorage(HOME_KEY);
            return axios.get(url)
                .then(res => {
                    storageService.saveToStorage(HOME_KEY, res.data);
                    return res.data
                })
        })

}

function fiveDayForecast(locKey = '215854') {
    const url = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locKey}?apikey=q2991AeoNGqDqjczrkRdqwAllJ0tLVfs&details=true&metric=true`
    let forecast = storageService.loadFromStorage(FIVE_KEY)
    return forecast || axios.get(url)
        .then(res => {
            storageService.saveToStorage(FIVE_KEY, res.data);
            return res.data
        })
}

function getCityCode(name) {
    const queryName=typeof name === 'string'?name:name.Key
    const url = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=EZDZLGmeAvVjQgsOZ7XFDLV1E8nwHKTR&q=${queryName}&language=en-us&details=true&offset=1`
    return axios.get(url)
        .then(res => res.data)

}