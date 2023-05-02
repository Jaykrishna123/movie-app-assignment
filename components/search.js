import React from 'react'
import styled from 'styled-components';


const Input = styled.input`
        padding: 10px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 4px;
        width: 100%;
        margin-right:20px;
`;

const Button = styled.button`
        padding: 10px;
        font-size: 16px;
        border: none;
        border-radius: 4px;
        background-color: #0070f3;
        color: white;
        cursor: pointer;
`;


export default function Search({ searchQuery, searchHandleChange, searchMovies }) {

    return (

        <div className='search-container'>
            <Input
                type="text"
                placeholder="Enter a movie title"
                value={searchQuery}
                onChange={(e) => searchHandleChange(e)}
            />
            <Button onClick={() => searchMovies()}>Search</Button>
            
            <style jsx>{`
            
           .search-container{
                display:flex;
                align-items:center;
                margin-bottom:30px;
           }
           `}</style>
        </div>
    )
}

