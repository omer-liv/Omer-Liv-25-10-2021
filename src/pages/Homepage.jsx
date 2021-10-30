import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import swal from 'sweetalert'
import { FiveDayList } from '../cmps/FiveDaysList'
import { handleFavorites, loadByGeoPos, loadCity, setFiveDayForecast } from '../store/actions/weatherActions'

export const Homepage = () => {
    const { fiveDayForecast, currCityWeather, currCity, favorites, isCelsius, isDarkMode } = useSelector(state => state.weatherModule)
    const dispatch = useDispatch()
    const [cityName, setcityName] = useState()
    let [isFavorite, setIsFavorite] = useState()

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success)
        // eslint-disable-next-line
    }, [])
    
    const  success = (position) => {
        if (!currCity) dispatch(loadCity(cityName))
        if(!currCityWeather)dispatch(loadByGeoPos(position.coords.latitude, position.coords.longitude))
        dispatch(setFiveDayForecast(currCity))
    }
    
    useEffect(() => {
        setIsFavorite(favorites.some(city => city.location.Key === currCity.Key))
        dispatch(setFiveDayForecast(currCity))
    }, [favorites, currCity])
    
    const handleChange = (ev) => {
        setcityName(ev.target.value)
    }
    
    const handleSubmit = (ev) => {
        ev.preventDefault()
        dispatch(loadCity(cityName))
    }
    
    const addToFavorites = () => {
        if (!currCity) return
        isFavorite ? swal('City removed from your favorites.','') : swal('City saved to Favorites.','')
        dispatch(handleFavorites(currCity))
    }

    const cityDegrees = () => {
        const temp = currCityWeather[0].Temperature.Value
        return isCelsius ? Math.round(temp) : Math.round(temp * 1.8 + 32)
    }


    if (!currCityWeather) return <h1>Loading...</h1>

    return (
        <div className={isDarkMode ? 'homepage-dark' : 'homepage-light'}>
            <form onSubmit={handleSubmit}>
                <input className="search-bar" type="text" onChange={handleChange} placeholder="Search cities" value={cityName} />
                <button className="search-btn">Search</button>
            </form>
            <div className="home-top">
                <div>
                    <h2>
                        {currCity.LocalizedName}
                    </h2>
                    <h2>
                        {cityDegrees()}°
                    </h2>
                </div>
                <button className="fav-btn" onClick={addToFavorites}>{isFavorite ? 'Remove From Favorites' : 'Add To Favorites'}</button>
            </div>
            <h1>{currCityWeather[0].IconPhrase}</h1>
            <FiveDayList forecast={fiveDayForecast.DailyForecasts} />
        </div>
    )
}
