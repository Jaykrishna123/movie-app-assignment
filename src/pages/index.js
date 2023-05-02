'use-client';
import { useState } from "react";
import MovieList from "../../components/movielist";
import Search from "../../components/search";

export default function Home(props) {
  const { serverdata } = props;
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState(serverdata.results);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  const searchHandleChange = (e) => {
    if(e.target.value === "") {
      setMovies(serverdata.results);
      setSearchQuery("")
    }
    else{
      setSearchQuery(e.target.value)
    }
  }

  const searchMovies = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${"813f8549a12f018373b0ac7d9d62538c"}&query=${searchQuery}`, { next: { cache: 'no-store' } });
      if (!res.ok) {
        console.log("error");
        trackerror(new Error("/movie/search status : " + res.status))
        setScreens("error")
      }
      const response = await res.json();
      setMovies(response.results);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError('Error loading movies.');
    }
  };
  return (
    <>
      {serverdata.results && serverdata.results.length > 0 &&
        <div className="container">
          <Search searchQuery={searchQuery} searchMovies={searchMovies} searchHandleChange={searchHandleChange} />
          <div className="wrapper">
            <MovieList movies={movies} loading={loading} error={error}/>
          </div>
        </div>
      }
      <style jsx global>{`
          *{
            margin:0;
            padding:0;
          }
          body{
            background-color: black;
            color: white;
            font-family: sans-serif;
          }
          a{
            cursor: pointer;
          }
      `}

      </style>
      <style jsx>{`
        .container{
          width:88%;
          margin: 0 auto;
          padding:30px 0;
        }
        .wrapper{
          display:grid;
          gap:10px;
          grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        }
        @media screen and (min-width: 500px){
          .wrapper{
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          }
        }
      `}</style>

    </>
  )
}

export async function getServerSideProps() {
  var nomovie = false
  const res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.API_KEY}`);
  if (!res.ok) {
    new Error("/movie/home status" + res.status);
    return { props: { serverdata: null, nomovie: true } };
  }
  const data = await res.json();
  return { props: { serverdata: data, nomovie: nomovie } };
}
