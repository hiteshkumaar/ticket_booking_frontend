import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Booking() {
  const { id } = useParams();
  const {email}=useParams();
  console.log(email)
  const [movieDetails, setMovieDetails] = useState();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTiming, setSelectedTiming] = useState('');
  const [numSeatsToBook, setNumSeatsToBook] = useState(1);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/movies/${id}`)
      .then((response) => {
        setMovieDetails(response.data);
      })
      .catch((error) => {
        console.error('Error fetching movie details:', error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a booking object to send to the server
    const bookingData = {
      bookedUsingMail:email,
      movieName:movieDetails.movieName,
      theatreName:movieDetails.theatreName,
      theatreLocation:movieDetails.theatreLocation,
      numberofticketsbooked:numSeatsToBook,
      time:selectedTiming
    };
    axios
      .post('http://localhost:3001/booking', bookingData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error('Error creating booking:', error);
      });
  };
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };


  console.log(movieDetails);
  const numRows = 5;
  const numColumns = 6;
  const availableSeats = [];
  const rowAlphabets = ['A', 'B', 'C', 'D', 'E'];
  for (let row = 0; row < numRows; row++) {
    for (let col = 1; col <= numColumns; col++) {
      availableSeats.push({
        row: rowAlphabets[row],
        seatNumber: col,
      });
    }
  }

  const timingOptions = ['10:00 AM', '2:00 PM', '7:00 PM'];

  const handleSeatSelect = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      if (selectedSeats.length < numSeatsToBook) {
        setSelectedSeats([...selectedSeats, seat]);
      }
    }
  };
  const handleTimingSelect = (timing) => {
    setSelectedTiming(timing);
  };
  const handleNumSeatsChange = (event) => {
    const num = parseInt(event.target.value);
    if (!isNaN(num)) {
      setNumSeatsToBook(num);
    }
  };
  const confirmBooking = () => {
  };

  return (
    <div className="container mt-4">
        <h1 className="mb-4" style={{ textAlign: 'center', fontSize: '35px', color: 'green' }}>
  Movie Booking
</h1>
{movieDetails && (
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Movie Details</h2>
          <p className="mb-2">
            <strong>Movie Name:</strong> {movieDetails.movieName}
          </p>
          <p className="mb-2">
            <strong>Theatre Name:</strong> {movieDetails.theatreName}
          </p>
          <p className="mb-2">
            <strong>Theatre Location:</strong> {movieDetails.theatreLocation}
          </p>
          <p className="mb-2">
            <strong>Release Date:</strong> {formatDate(movieDetails.releaseDate)}
          </p>
        </div>
      )}
      <h1 className="mb-4"style={{ textAlign: 'left', fontSize: '30px', color: 'black' }}>Select Seats and Timing</h1>
      <div className="mb-4">
        <label htmlFor="numSeats">Number of Seats to Book:</label>
        <input
          type="number"
          id="numSeats"
          value={numSeatsToBook}
          onChange={handleNumSeatsChange}
          min="1"
        />
      </div>
      <div className="mb-4"style={{ textAlign: 'left', fontSize: '25px', color: 'black' }}>
        <h2>Choose Seats</h2>
        <div className="seat-grid">
          {availableSeats.map((seat, index) => (
            <button
              key={index}
              className={`btn ${
                selectedSeats.includes(seat) ? 'btn-success' : 'btn-outline-primary'
              } mx-2 my-2`}
              onClick={() => handleSeatSelect(seat)}
              disabled={selectedSeats.length === numSeatsToBook && !selectedSeats.includes(seat)}
            >
              {`${seat.row}-${seat.seatNumber}`}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4"style={{ textAlign: 'left', fontSize: '25px', color: 'black' }}>
        <h2>Choose Timing</h2>
        <div>
          {timingOptions.map((timing) => (
            <button
              key={timing}
              className={`btn ${
                selectedTiming === timing ? 'btn-success' : 'btn-outline-primary'
              } mx-2 my-2`}
              onClick={() => handleTimingSelect(timing)}
            >
              {timing}
            </button>
          ))}
        </div>
      </div>
      <button
        className="btn btn-primary"
        onClick={handleSubmit}
        disabled={selectedSeats.length !== numSeatsToBook || !selectedTiming}>
        Confirm Booking
      </button>
    </div>
  );
}   
export default Booking;
