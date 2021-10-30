import axios from 'axios';
import { storageService } from './storageService';

export const weatherService = {
  getWeatherNow,
  fiveDayForecast,
  getCityCode,
  getCityCodeByPos
}
const HOME_KEY = 'tel-aviv';
const FIVE_KEY = '5 day tel-aviv'

function getWeatherNow(name) {

  return getCityCode(name)
    .then(cities => {
      if(!cities.length) return 
      return cities[0].Key
    })
    .then(res => {
      const url = `http://dataservice.accuweather.com/forecasts/v1/hourly/1hour/${res}?apikey=q2991AeoNGqDqjczrkRdqwAllJ0tLVfs&details=true&metric=true`
      return axios.get(url)
        .then(res => {
          storageService.saveToStorage(HOME_KEY, res.data);
          return res.data
        })
    })

}

function fiveDayForecast(city) {
  const key = city ? city.Key : '215854' 
  const url = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=q2991AeoNGqDqjczrkRdqwAllJ0tLVfs&details=true&metric=true`
  return axios.get(url)
    .then(res => {
      storageService.saveToStorage(FIVE_KEY, res.data);
      return res.data
    })
}

function getCityCode(name) {
  const queryName = typeof name === 'string' ? name : name.EnglishName
  const url = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=q2991AeoNGqDqjczrkRdqwAllJ0tLVfs&q=${queryName}&language=en-us&details=true&offset=1`
  return axios.get(url)
    .then(res => res.data)

}

function getCityCodeByPos(lat, lang) {
  const url = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=q2991AeoNGqDqjczrkRdqwAllJ0tLVfs&q=${lat}%2C${lang}&details=true`
  return axios.get(url)
    .then(res => res.data)

}