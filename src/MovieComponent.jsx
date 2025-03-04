import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function MovieComponent() {

    let [title,setTitle]=useState('')

    let [movie,setMovie]=useState([])

    let getMovieList=()=>{
        let apiUrl
        if(title===''){
            apiUrl=`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1`
        }
        else{
            apiUrl=`https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=${title}`
        }

        axios.get(apiUrl)
        .then((res)=>res.data)
        .then((finalRes)=>{
            setMovie(finalRes.results)
        })
    }

    let getValue=(event)=>{
        setTitle(event.target.value)
    }

    useEffect(()=>{
        getMovieList()
    },[title])

  return (
    <div className='pb-5'>
       <h1 className='text-center text-3xl font-bold text-white py-5'> Movie Search App </h1>

       <form className='max-w-[1000px] mx-auto' action="">
            <input className='w-[100%] border-2 h-12 ps-3 bg-white placeholder-black placeholder:text-[18px] text-[20px] rounded-[5px] border-black' placeholder='Search Movie' type="text" value={title} onChange={getValue} />
       </form>

       <div className='max-w-[1320px] mx-auto mt-6 grid grid-cols-4 gap-5'>
            {
                movie.length>=1
                ?
                movie.map((items,index)=> <MovieItem movieData={items} /> )
                :
                <h6 className='text-white'>Loading...</h6>
            } 
       </div>
    </div>
  )
}


function MovieItem({movieData}){
    let{title,poster_path,release_date}=movieData

    return(
        <div>
            {
                poster_path!==null
                ?
                <img src={`https://image.tmdb.org/t/p/w1280/${poster_path}`} alt="" />
                :
                <img src="./public/no-preview.png" alt="" />
            }
            <h3 className='text-[20px] text-center font-medium bg-yellow-500 p-3 border-b-2'> {title} </h3>
            <h4 className='text-[20px] text-center font-medium bg-yellow-500 p-3'> Release Date:- {release_date}</h4>
        </div>
    )
}
