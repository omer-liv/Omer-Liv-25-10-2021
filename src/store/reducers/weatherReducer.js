const INITIAL_STATE = {
    currCity: null,
    currCityWeather: null,
    favorites: [],
    fiveDayForecast: [],
    isCelsius: true,
    isDarkMode: false
}

export function weatherReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_CITY':
            return {
                ...state,
                currCity: action.currCity[0]
            }
        case 'SET_CITY_BY_POS':
            return {
                ...state,
                currCity: action.currCity
            }
        case 'SET_CITY_WEATHER':
            return {
                ...state,
                currCityWeather: action.currCityWeather
            }
        case 'SET_FIVE':
            return {
                ...state,
                fiveDayForecast: action.forecast
            }
        case 'ADD_CITY':
            return {
                ...state,
                favorites: [...state.favorites, action.city]
            }
        case 'REMOVE_CITY':
            return {
                ...state,
                favorites: state.favorites.filter(city => city.location.Key !== action.city.location.Key)
            }
        case 'TOGGLE_SCALE':
            return {
                ...state,
                isCelsius: !state.isCelsius
            }
        case 'TOGGLE_DARK':
            return {
                ...state,
                isDarkMode: !state.isDarkMode
            }
        default:
            return state
    }
}