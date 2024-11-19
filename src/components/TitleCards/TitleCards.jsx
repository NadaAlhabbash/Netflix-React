import { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
// import cards_data from '../../assets/cards/Cards_data'



const TitleCards = ({title, category}) => {

const [apiData, setApiData] = useState([]);
const cardsRef = useRef();

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOTYxM2I4YTY3MGVjNzY1OTMwNGZkYzUyNGViNjQ1ZiIsIm5iZiI6MTczMjAxNDYxNy42MDM3NDE0LCJzdWIiOiI2NWYwNWJlYTBlMjlhMjAxNDgzNzQ0ODYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.VMMWAlOiastA7vsNP7dRBrGj5HK0WBR5dZappFX8m-4'
  }
};


const handleWheel = (event) => {
  event.preventDefault();
  cardsRef.current.scrollLeft += event.deltaX;
}

useEffect(() => {

  fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));
  
  cardsRef.current.addEventListener('wheel', handleWheel)
}, [category, options])

  return (
    <div className='titlecards'>
     <h2>{title ? title:"Popular on Netflix"}</h2>
     <div className="card-list" ref={cardsRef}>
      {apiData.map((card, index) =>{
        return <div className='card' key={index}>
          <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt="" />
          <p>{card.original_title}</p>
        </div>
      })}
     </div>
    </div>
  )
}

export default TitleCards
