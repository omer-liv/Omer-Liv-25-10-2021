import moment from "moment"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"


export function DayPreview({ day }) {

    const { isCelsius } = useSelector(state => state.weatherModule)

    const weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    const date = moment(day.Date).utc().format('MM/DD/YYYY')
    const [bgImage, setBgImage] = useState(null)

    const cityDegrees = () => {
        const temp = day.Temperature.Maximum.Value
        return isCelsius ? Math.round(temp) : Math.round(temp * 1.8 + 32)
    }

    useEffect(() => {
        if (day.Day.IconPhrase === 'Sunny') setBgImage(1)
        else if (day.Day.IconPhrase === 'Thunder storms') setBgImage(2)
        else if (day.Day.IconPhrase === 'Snow') setBgImage(3)
        else if (day.Day.IconPhrase === 'Mostly sunny') setBgImage(4)
        else if (day.Day.IconPhrase === 'Partly cloudy' || 'Partly sunny') setBgImage(5)
        else if (day.Day.IconPhrase === 'Flurries' || 'Cloudy' || 'Mostly cloudy' || 'Intermittent clouds') setBgImage(6)
        else if (day.Day.IconPhrase === 'Showers' || 'Rain' || 'Partly sunny w/ showers') setBgImage(7)
    }, [])
    if (!bgImage) return <h1>Loading...</h1>
    return (
        <div className="day-card" style={{ backgroundImage: `url(./imgs/${bgImage}.png)` }}>
            <h2>{date}</h2>
            <h2>{weekdays[new Date(date).getDay()]}</h2>
            <h2>{cityDegrees()}°</h2>
        </div>
    )
}