import {useEffect, useState} from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import MovieFrame from './MovieFrame';
import './App.css';

function App() {

  const [movieData, setMovieData] = useState([]);
  const [userChoice, setUserChoice] = useState({});
  const [trailer, setTrailer] = useState("");

  const getMovieData = () => {
    axios({
      url: "https://api.themoviedb.org/3/movie/now_playing",
        params: {
          api_key: "02a015f767f49fbd46124014022d6a5c"
        }
    })
      .then((res) => {
        // setMovieData will be used to map through all the current popular movies and display them on the page
        setMovieData(res.data.results)
        console.log(res)

        // setUserChoice will be used to store the movie that the user has selected corresponding to the "See details" that is clicked on
        setUserChoice(res.data.results[0])

      })
  } 


  useEffect( () => {
    getMovieData();

  }, [])


    useEffect( () => {

      const getLandingPageVideo = () => {
        axios({
          url: `https://api.themoviedb.org/3/movie/${movieData[0].id}/videos`,
            params: {
              api_key: "02a015f767f49fbd46124014022d6a5c",
              append_to_response: "videos"
            }
        })
          .then((res) => {
    
              const landingPageTrailer = res.data.results.filter((landingTrailer) => {
                return landingTrailer.name === "Official Trailer" || landingTrailer.type === "Trailer"
              })
              setTrailer(landingPageTrailer[0].key)
          })
      }

    if(movieData.length !== 0) {
      getLandingPageVideo()
    }

  }, [movieData])


  return (
    <div className='app'>

      <header className='wrapper'>
        <h1>Welcome to Miniplex</h1>
        <div className='movieInfoAndVideo'>

          <div className='movieInfo'>
            <h2 className='movieTitle'>{userChoice.title}</h2>
            <p className='overview'>{userChoice.overview}</p>
            <p className='releaseDate'>Date of Release: {userChoice.release_date}</p>
            <p className='rating'>{userChoice.vote_average}</p>
          </div>

          <div className='videoContainer'>
            <YouTube 
              className={'youtubePlayer'}
              videoId={trailer}
              opts={{
                width: '100%',
                height: '100%'
              }}
            />
          </div>
        </div>
      </header>

      <h2 className='movieListTitle'>Here's What's Playing</h2>

      <main>
        <section>
          <ul className='movieListContainer wrapper'>
            {movieData.map((movie) => {
              return (
                <MovieFrame
                  key={movie.id}
                  movie={movie}
                  setUserChoice={setUserChoice}
                  setTrailer={setTrailer}
                />
              )
            })}
          </ul>
        </section>
      </main>

      <footer>
        <div className="wrapper">
          <p>Created at <a href='https://junocollege.com/'>Juno College</a> using the MovieDB API</p>
          <p>By Thomas Huynh</p>
        </div>
      </footer>
    </div>
  )
}

export default App;

