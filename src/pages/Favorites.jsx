import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { FavoriteList } from '../cmps/FavoriteList'
import { loadCity } from '../store/actions/weatherActions'
import swal from 'sweetalert'

export const Favorites = ({ history: { push } }) => {

    const { favorites } = useSelector(state => state.weatherModule)
    const dispatch = useDispatch()

    const onSetCity = (city) => {
        dispatch(loadCity(city.location.EnglishName))
        push('/')
    }

    if (!favorites.length) swal('Sorry', 'No cities saved to Favorites yet', 'error', {
        button: 'Go back'
    })
    .then(function() {
        push('/')
    })
return (
    <FavoriteList favorites={favorites} setCity={onSetCity} />
)
}
