import swal from 'sweetalert'
import { weatherService } from '../../services/weatherService'

export function loadByGeoPos(lat, lang) {
    return async dispatch => {  
        const currCity = await weatherService.getCityCodeByPos(lat, lang)
        const currCityWeather = await weatherService.getWeatherNow(currCity.EnglishName)
        dispatch({ type: 'SET_CITY_BY_POS', currCity})
        dispatch({ type: 'SET_CITY_WEATHER', currCityWeather })

    }
}

export function loadCity(name = 'tel-aviv') {
    return async dispatch => {
        const currCity = await weatherService.getCityCode(name)
        try {

            const currCityWeather = await weatherService.getWeatherNow(name)
            dispatch({ type: 'SET_CITY', currCity })
            dispatch({ type: 'SET_CITY_WEATHER', currCityWeather })
        }
        catch {
            return swal('Sorry', 'Couldn\'t find a city that matches your search','error', {
                button: 'Try Again'
            })
        }
    }
}

export function setFiveDayForecast(city) {
    return async dispatch => {
        const forecast = await weatherService.fiveDayForecast(city)
        dispatch({ type: 'SET_FIVE', forecast })
    }
}

export function handleFavorites(location) {
    return async (dispatch, getState) => {
        const [cityWeather] = await weatherService.getWeatherNow(location.LocalizedName)
        const { favorites } = getState().weatherModule
        const city = {
            location,
            cityWeather
        }
        const isFavorite = favorites.some(favCity => favCity.location.Key === city.location.Key)
        isFavorite ? dispatch({ type: 'REMOVE_CITY', city }) : dispatch({ type: 'ADD_CITY', city })
    }
}

export function toggleScale() {
    return dispatch => {
        dispatch({type:'TOGGLE_SCALE'})
    }
}

export function toggleDarkMode() {
    return dispatch => {
        dispatch({type:'TOGGLE_DARK'})
    }
}