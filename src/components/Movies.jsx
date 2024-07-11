import Movie from './Movie'
import '../styles/movies.scss'
import { useSelector } from 'react-redux'

const Movies = ({ viewTrailer }) => {
    const movies = useSelector((state) => state.movies)

    return (
        <div className="movies-grid" data-testid="movies">
            {movies.movies.results?.map((movie) => {
                return (
                    <Movie 
                        movie={movie} 
                        key={movie.id}
                        viewTrailer={viewTrailer}
                    />
                )
            })}
        </div>
    )
}

export default Movies
