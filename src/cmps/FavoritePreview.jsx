import { useSelector } from "react-redux"
import { useState, useEffect } from "react";

export function FavoritePreview({ city, setCity }) {

    const { isCelsius } = useSelector(state => state.weatherModule)
    const [bgImage, setBgImage] = useState(null)
    const cityDegrees = () => {
        const temp = Temperature.Value
        return isCelsius ? Math.round(temp) : Math.round(temp * 1.8 + 32)
    }

    const onSetCity = () => {
        setCity(city)
    }

    useEffect(() => {
        if (city.cityWeather.IconPhrase === 'Sunny') setBgImage(1)
        else if (city.cityWeather.IconPhrase === 'Thunder storms') setBgImage(2)
        else if (city.cityWeather.IconPhrase === 'Snow') setBgImage(3)
        else if (city.cityWeather.IconPhrase === 'Mostly sunny') setBgImage(4)
        else if (city.cityWeather.IconPhrase === 'Partly cloudy' || 'Partly sunny') setBgImage(5)
        else if (city.cityWeather.IconPhrase === 'Flurries' || 'Cloudy' || 'Mostly cloudy' || 'Intermittent clouds') setBgImage(6)
        else if (city.cityWeather.IconPhrase === 'Showers' || 'Rain' || 'Partly sunny w/ showers') setBgImage(7)
    }, [])

    const { location, cityWeather: { IconPhrase, Temperature } } = city

        if (!bgImage) return <h1>Loading...</h1>
    return (
        <div className="favorite-card" onClick={onSetCity} style={{ backgroundImage: `url(./imgs/${bgImage}.png)` }}>
            <h2>{location.LocalizedName}</h2>
            <h2>{IconPhrase}</h2>
            <h2>{cityDegrees()}°</h2>
        </div>
    )
}