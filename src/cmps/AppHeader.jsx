import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { toggleDarkMode, toggleScale } from '../store/actions/weatherActions'

export default function AppHeader() {

    const { isCelsius, isDarkMode } = useSelector(state => state.weatherModule)
    const dispatch = useDispatch()

    const toggleCelsius = () => {
        dispatch(toggleScale())
    }

    const toggleDark = () => {
        dispatch(toggleDarkMode())
    }

    return (
        <div className={isDarkMode ? 'header-dark' : 'header-light'}>
            <h2>Herolo <span> weather task </span> </h2>
            <div className="nav-bar">
                <NavLink exact to="/" >Home</NavLink>
                <NavLink to="/favorites" >Favorites</NavLink>
                <div className='toggle-btns'>
                <button onClick={toggleCelsius}>{isCelsius ? 'C°' : 'F°'}</button>
                <button onClick={toggleDark}>{isDarkMode ? '☾' : '🌞︎'}</button>
                </div>
            </div>
        </div>
    )
}
