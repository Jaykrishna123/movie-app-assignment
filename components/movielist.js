import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import WatchPopup from './watchpopup';

var mediaqry;
export default function MovieList({ movies, loading, error }) {
    console.log(movies, 'movies')
    const [addlist, setAddList] = useState(false);
    const [info, setInfo] = useState(false);
    const [infodata, setInfoData] = useState([]);
    const [mediaquery, setMediaQuery] = useState(false)

    useEffect(() => {
        mediaqry = window.matchMedia("(max-width: 960px)")
        setMediaQuery(mediaqry.matches)
    },[])

    const myLoader = ({ src, width, quality }) => {
        return `https://image.tmdb.org/t/p/w185${src}`
    }

    const addFavouriteList = (movie) => {
        localStorage.setItem('userData', JSON.stringify(movie));
        setAddList(true)
        setTimeout(() => {
            setAddList(false);
        }, 1000)
    }

    const watchInfo = (data) => {
        if (mediaquery) {
            setInfo(true)
            setInfoData(data)
        }
    }
    const onCancelPopup = () => {
        setInfo(false)
    }

    return (
        <>
            {loading ? (
                Array(15).fill("").map((el, i) => {
                    return (
                        <div className='container' key={i}>
                            <div className='main-container heroVerticalCard verticalCardItem'>
                                <div className='vertical-image skeleton-square'>
                                    <div style={{ position: 'absolute', width: '100%', height: '100%' }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    )
                }))
                : movies.length ? (
                    <>
                        {movies.map((movie, index) =>
                            <a className='container' key={index} onClick={() => watchInfo(movie)}>
                                <div className='main-container heroVerticalCard verticalCardItem'>
                                    {movie.poster_path && (
                                        <div className='vertical-image'>
                                            <Image
                                                width={185}
                                                height={200}
                                                loader={myLoader}
                                                src={movie.poster_path}
                                                alt={`${movie.title} poster`}
                                                style={{ position: 'absolute', width: '100%', height: '100%' }}
                                            />
                                        </div>
                                    )}
                                    <span style={{ textAlign: 'center', display: 'block' }}>{movie.title}</span>
                                    <div className='cardContent'>
                                        <div className='content'>
                                            <span>{movie.title}</span>
                                            <span>{movie.release_date}</span>
                                            <span>{movie.vote_count}</span>
                                            <p className='desc'>{movie.overview}</p>
                                            <button title='favourite list' className='list' onClick={() => addFavouriteList(movie)}>+</button>
                                        </div>
                                    </div>
                                </div>
                                {addlist && <div className={`toast ${addlist ? "toast-act" : ''}`}>Added to favourite list</div>}
                            </a>)}
                        {info && <WatchPopup show={info} cancelPopup={onCancelPopup} addFavouriteList={addFavouriteList} movie={infodata} />}
                    </>

                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <p>No movies found.</p>
                )}

            <style jsx>{`
            .container{
                position: relative;
                display: flex;
                flex-direction: column;
              }
              .main-container{
                padding-top: 15px;
                position: relative;
                top: -8px;
              }
            .vertical-image{
                position: relative;
                padding-bottom: 125%;
                overflow: hidden;
                width: 100%;
                border-radius:10px;
            }  
            .image{
                position: absolute;
                height: 100%;
                width: 100%;
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
                color: transparent;
            }
                .verticalCardItem {
                transition: transform .25s cubic-bezier(0.33, 0.04, 0.63, 0.93);
                dsiplay:none;
              }
    

              .cardContent {
                position: absolute;
                bottom: 0;
                width: 90%;
                padding: 14px 0;
                background-color:#2A2A2A;
                visibility: hidden;
                opacity: 0;
                transition: opacity .25s ease-in,bottom .25s cubic-bezier(0.33, 0.04, 0.63, 0.93);
                border-bottom-left-radius: 10px;
                border-bottom-right-radius: 10px;
                transform: translate(11px, 0px);
              }
              .verticalCardItem:hover .cardContent {
                visibility: hidden;
                opacity: 0;
              }
              .content{
                display: flex;
                flex-direction: column;
                justify-content:center;
                align-items: center;
                text-align: center;
                font-size: 12px;
              }
              .desc{
                -webkit-line-clamp: 2;
            position: relative;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
                color: white;
                opacity: 0.7;
              }
              .list{
                  padding:3px 8px;
                  font-size: 20px;
                  border: 1px solid white;
                  margin-top:10px;
              }
              .toast{
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 100;
                visibility: visible;
                min-width: 100px;
                background-color: #fff;
                color: #000;
                opacity: 0;
                text-align: center;
                border-radius: 2em;
                padding: 1em 1.5625em;
                font-weight: 600;
                transition: opacity 0.5s ease-in-out;
                font-size: 14px;  
              }
              .toast-act{
                opacity:1;
              }
              .skeleton { margin-right: 0.625em; }

            .skeleton-line {
            height: 0.75em;
            margin-bottom: 0.375em;
            border-radius: 1em;
            background: rgba(130, 130, 130, 0.2);
            background: -webkit-gradient(linear,
                left top,
                right top,
                color-stop(8%, rgba(130, 130, 130, 0.2)),
                color-stop(18%, rgba(130, 130, 130, 0.3)),
                color-stop(33%, rgba(130, 130, 130, 0.2)));
            background: linear-gradient(to right,
                rgba(130, 130, 130, 0.2) 8%,
                rgba(130, 130, 130, 0.3) 18%,
                rgba(130, 130, 130, 0.2) 33%);
            animation: wave-lines 2s infinite ease-out;
            }

            .skeleton-square {
            border-radius: 1em;
            background: rgba(130, 130, 130, 0.2);
            background: -webkit-gradient(linear,
                left top,
                right top,
                color-stop(8%, rgba(130, 130, 130, 0.2)),
                color-stop(18%, rgba(130, 130, 130, 0.3)),
                color-stop(33%, rgba(130, 130, 130, 0.2)));
            background: linear-gradient(to right,
                rgba(130, 130, 130, 0.2) 8%,
                rgba(130, 130, 130, 0.3) 18%,
                rgba(130, 130, 130, 0.2) 33%);
            animation: wave-squares 2s infinite ease-out;
            }

            @keyframes wave-lines {
            0% {
                background-position: -29.25em 0;
            }

            100% {
                background-position: 29.25em 0;
            }
            }

            @keyframes wave-squares {
            0% {
                background-position: -29.25em 0;
            }

            100% {
                background-position: 29.25em 0;
            }
            }
            @media screen and (min-width:960px){
                .desc{
                    -webkit-line-clamp: 3;
                }
                .cardContent{
                    display:block;
                }
                .verticalCardItem:hover {
                    position: absolute;
                    width: 100%;
                    transform : scale(1.1);
                    z-index: 4;
                  }
            }
            @media screen and (min-width: 1300px){
                .cardContent{
                    transform: translate(10px, 0px);
                }
                .verticalCardItem:hover .cardContent {
                    visibility: visible;
                    opacity: 1;
                  }
            }
    
         `}
            </style>
            <style jsx global>{`
            .heroVerticalCard .vertical-image {
                transform: scale(0.9);
              }
            `}

            </style>
        </>
    )
}

