import React from 'react'

export default function Search({ searchQuery, searchHandleChange, searchMovies }) {

    return (

        <div className='search-container'>
            <input
                className='input-search'
                type="text"
                placeholder="Enter a movie title"
                value={searchQuery}
                onChange={(e) => searchHandleChange(e)}
            />
            <button className='btn' onClick={() => searchMovies()}>Search</button>

            <style jsx>{`
           .search-container{
                display:flex;
                align-items:center;
                margin-bottom:30px;
           }
           .input-search{
            padding: 10px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 4px;
            width: 100%;
            margin-right:20px;
           }
           .btn{
            padding: 12px 25px;
            font-size: 16px;
            border: none;
            border-radius: 4px;
            background-color: #0070f3;
            color: white;
            cursor: pointer;
           }
           `}</style>
        </div>
    )
}

