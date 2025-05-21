import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    vehicleNumber: '',
    ownerName: '',
    slotNumber: '',
    startTime: '',
    endTime: ''
  });

  const [bookings, setBookings] = useState([]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchBookings = async () => {
    const res = await axios.get('http://localhost:8080/api/bookings');
    setBookings(res.data);
  };

  const handleSubmit = async e => {
    e.preventDefault();
  
    const now = new Date();
    const start = new Date(formData.startTime);
    const end = new Date(formData.endTime);
    let errs = [];
  
    if (!formData.vehicleNumber || !/^[A-Za-z0-9]{6,}$/.test(formData.vehicleNumber)) {
      errs.push('Invalid vehicle number (min 6 alphanumeric characters).');
    }
  
    if (!formData.ownerName || !/^[A-Za-z ]+$/.test(formData.ownerName)) {
      errs.push('Owner name must contain only letters and spaces.');
    }
  
    if (!formData.slotNumber) {
      errs.push('Slot number is required.');
    }
  
    if (!formData.startTime || start <= now) {
      errs.push('Start time must be in the future.');
    }
  
    if (!formData.endTime || end <= start) {
      errs.push('End time must be after start time.');
    }
  
    if (errs.length > 0) {
      alert(errs.join('\n'));
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:8080/api/bookings', formData);
  
      if (response && response.data) {
        alert('Booking successful');
        fetchBookings(); // Refresh bookings list
      } else {
        alert('Booking completed, but no data returned.');
      }
  
    } catch (err) {
      // Safely access error response
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      } else if (err.message === 'Network Error') {
        alert('Network error. Please check if the server is running.');
      } else {
        alert('Booking failed. Please try again.');
      }
  
      console.error('Booking error:', err); // Optional for debugging
    }
  };
  

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Parking Slot Booking</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="vehicleNumber" placeholder="Vehicle Number" value={formData.vehicleNumber} onChange={handleChange} />
        <br />
        <input type="text" name="ownerName" placeholder="Owner Name" value={formData.ownerName} onChange={handleChange} />
        <br />
        <input type="text" name="slotNumber" placeholder="Slot Number" value={formData.slotNumber} onChange={handleChange} />
        <br />
        <input type="datetime-local" name="startTime" value={formData.startTime} min={new Date().toISOString().slice(0, 16)} onChange={handleChange} />
        <br />
        <input type="datetime-local" name="endTime" value={formData.endTime} min={new Date().toISOString().slice(0, 16)} onChange={handleChange} />
        <br />
        <button type="submit">Book Slot</button>
      </form>

      <h3>All Bookings:</h3>
      <ul>
        {bookings.map((b, i) => (
          <li key={i}>
            Slot {b.slotNumber} — {b.vehicleNumber} ({new Date(b.startTime).toLocaleString()} to {new Date(b.endTime).toLocaleString()})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
