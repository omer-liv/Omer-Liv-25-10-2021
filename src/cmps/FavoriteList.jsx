import { FavoritePreview } from "./FavoritePreview";

    export function FavoriteList({favorites, setCity}) {
        return (
            <div className="favorites-list">
                {favorites.map((city,idx) => (
                    <FavoritePreview city={city} setCity={setCity}  key={idx}/>
                ))}
            </div>
        )
    }