// BookingConfirmation.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function BookingConfirmation() {
  const { bookingId } = useParams();
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    // Fetch booking details using the bookingId from the database
    axios
      .get(`http://localhost:3001/booking/${bookingId}`)
      .then((response) => {
        setBookingDetails(response.data);
      })
      .catch((error) => {
        console.error('Error fetching booking details:', error);
      });
  }, [bookingId]);

  if (!bookingDetails) {
    return <div>Loading...</div>;
  }

  // Display the booking details on the confirmation page
  return (
    <div className="container mt-4">
      <h1 className="mb-4">Booking Confirmation</h1>
      <p><strong>Movie Name:</strong> {bookingDetails.movieName}</p>
      <p><strong>Theatre Name:</strong> {bookingDetails.theatreName}</p>
      {/* Add more booking details here */}
    </div>
  );
}

export default BookingConfirmation;
