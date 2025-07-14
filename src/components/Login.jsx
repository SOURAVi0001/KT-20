import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api';
import './login.css';

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/admin');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} autoComplete="on">
        <input
          type="text"
          name="username"
          placeholder="Username"
          autoComplete="username"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="current-password"
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>

      <p style={{ marginTop: '10px', textAlign: 'center' }}>
        Don’t have an account? <Link to="/signup">Signup</Link>
      </p>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
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

export default Login;
