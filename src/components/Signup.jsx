import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api';
import '../styles/form.css';

function Signup() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/signup', form);
      alert('Signup successful! Please login.');
      navigate('/login');
    } catch (err) {
      alert('Signup failed');
    }
  };

  return (
    <div className="form-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Signup</button>
      </form>

      <div style={{ marginTop: '15px', textAlign: 'center' }}>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
        <button
          onClick={() => navigate('/')}
          className="home-button"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default Signup;
