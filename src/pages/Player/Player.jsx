import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get movie ID from route parameters
  const [apiData, setApiData] = useState({
    name: '',
    key: '',
    published_at: '',
    type: '',
  });

  useEffect(() => {
    const fetchVideo = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOTYxM2I4YTY3MGVjNzY1OTMwNGZkYzUyNGViNjQ1ZiIsIm5iZiI6MTczMjAxNDYxNy42MDM3NDE0LCJzdWIiOiI2NWYwNWJlYTBlMjlhMjAxNDgzNzQ0ODYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.VMMWAlOiastA7vsNP7dRBrGj5HK0WBR5dZappFX8m-4',
        },
      };

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
          options
        );

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        setApiData(data.results?.[0] || {}); // Fallback to empty object if no results
      } catch (err) {
        console.error('Error fetching video data:', err.message);
      }
    };

    fetchVideo();
  }, [id]);

  return (
    <div className="player">
      <img src={back_arrow_icon} alt="Back" onClick={() => {navigate(-2)}} />
      <iframe
        src={`https://www.youtube.com/embed/${apiData.key}`}
        width="90%"
        height="90%"
        title="trailer"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{apiData.published_at?.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;
