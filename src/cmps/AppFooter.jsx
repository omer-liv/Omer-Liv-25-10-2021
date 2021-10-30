import React from "react"
import { useSelector } from "react-redux"

export default function AppFooter() {

    const { isDarkMode } = useSelector(state => state.weatherModule)

    return (
        <div className= {isDarkMode ? 'footer-dark' : 'footer-light'}>
            <h3>© 2021 Omer Liv</h3>
            <a href="https://www.linkedin.com/in/omer-liv-7941a4213/"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/600px-LinkedIn_logo_initials.png" /></a>
        </div>
    )
}