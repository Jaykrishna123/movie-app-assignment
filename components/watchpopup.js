import Image from 'next/image'
import React from 'react'

export default function WatchPopup({ show, movie, addlist, cancelPopup, addFavouriteList }) {
    console.log(movie)
    const myLoader = ({ src, width, quality }) => {
        return `https://image.tmdb.org/t/p/w185${src}`
    }
    return (
        <div className={`popupcontainer ${show ? "show" : ""}`}>
            <a className='overlay' onClick={cancelPopup}></a>
            <div className='popupcard'>
                <div className='card'>
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
                    <div className='cardContent'>
                        <span>{movie.title}</span>
                        <span>{movie.release_date}</span>
                        <span>{movie.vote_count}</span>
                        <p className='desc'>{movie.overview}</p>
                        <button title='favourite list' className='list' onClick={() => addFavouriteList(movie)}>+</button>
                    </div>
                </div>
                {addlist && <div className={`toast ${addlist ? "toast-act" : ''}`}>Added to favourite list</div>}
            </div>


            <style jsx>{`
              .popupcontainer .popupcard {
                background-color: #2A2A2A;
                border-radius: 0;
              }
              .popupcontainer {
                display: flex;
                justify-content: center;
                align-items: center;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 3;
                visibility: hidden;
                opacity: 0;
                transition: all 0.3s ease-in-out;
              }
      
              .popupcontainer.show {
                visibility: visible;
                opacity: 1;
              }
      
              .popupcontainer .overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                width: 100%;
                height: 100%;
                background-color: #00000042;
              }
    
              .show .popupcard {
                position: absolute;
                bottom: 0;
                width: 100%;
              }
              .vertical-image{
                position: relative;
                padding-bottom: 35%;
                overflow: hidden;
                width: 45%;
                -webkit-border-radius: 10px;
                -moz-border-radius: 10px;
                border-radius: 10px;
                aspect-ratio: 16/9;
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
            .card{
                display: flex;
                align-items: center;
                width: 94%;
                margin: 0 auto;
                padding: 18px 0;
            }
            .cardContent{
                margin-left: 18px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-self: center;
                line-height: 1.5em;
                width: 65%;
            }
            .list{
                width: 45px;
                height: 45px;
                font-size: 30px;
                display: flex;
                justify-content: center;
                margin: 0 auto;
                align-items: center;
                cursor: pointer;
                margin-top: 10px;
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
            
            `
            }</style>
        </div>
    )
}
