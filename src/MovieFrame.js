import axios from 'axios';

const MovieFrame = (props) => {

    const movieUrl = "https://www.themoviedb.org/t/p/w220_and_h330_face"

    const handleClick = () => {
        props.setUserChoice(props.movie)

        axios({
            url: `https://api.themoviedb.org/3/movie/${props.movie.id}/videos`,
              params: {
                api_key: "02a015f767f49fbd46124014022d6a5c",
                append_to_response: "videos"
              }
          })
            .then((res) => {
                console.log(res)

                const officialTrailerVid = res.data.results.filter((vid) => {
                    return vid.name === "Official Trailer" || vid.type === "Trailer"
                })
                console.log(officialTrailerVid[0].key)
                props.setTrailer(officialTrailerVid[0].key)
            })

            window.scroll(0, 0);
    }
// 

    return(
        <li>
            <img src={movieUrl + props.movie.poster_path} alt=""/>
            <p>{props.movie.title}</p>
            <button onClick={handleClick}>See details</button>
        </li>
    )
}

export default MovieFrame;