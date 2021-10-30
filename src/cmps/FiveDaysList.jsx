import { DayPreview } from './DayPreview'

export function FiveDayList({ forecast }) {
    return (
        <div className="forecast-list">
            {forecast?.map(day => (
                <DayPreview day={day} key={day.Date} />
            ))}
        </div>
    )
}
