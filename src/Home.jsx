
import React from 'react';
import { Link } from "react-router-dom";
import {useState,useEffect} from "react";
import { useParams } from 'react-router-dom';

const Home = () => {
  const { email } = useParams();
  const [movieName, setmoviename] = useState([]);
  const [theatreName, settheatrename] = useState([]);
  const [theatreLocation, settheatrelocation] = useState([]);
  const [releaseDate, settreleaseDate] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/movies')
      .then((response) => response.json())
      .then((data) => setmoviename(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mt-4">
        <h1 className="mb-4" style={{ textAlign: 'center', fontSize: '35px', color: 'green' }}>
  Movie Booking
</h1>
      <h1 className="mb-4" style={{ textAlign: 'left', fontSize: '30px', color: 'green' }}>
  Movie List
</h1>
      <div className="row">
        {movieName.map((movie) => (
          <div key={movie._id} className="col-md-3 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{movie.movieName}</h5>
                <p className="card-text">
                  <strong>Theatre Name:</strong> {movie.theatreName}
                  <br />
                  <strong>Theatre Location:</strong> {movie.theatreLocation}
                  <br />
                  <strong>Release Date:</strong> {formatDate(movie.releaseDate)}
                </p>
                <Link
                  to={`/booking/${movie._id}/${email}`}
                  className="btn btn-success w-100"
                >
                  Book Tickets
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
