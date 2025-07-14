import { useEffect, useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './adminpanel.css';

function AdminPanel() {
  const [message, setMessage] = useState('');
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const fetchImages = () => {
    API.get('/admin/images')
      .then(res => setImages(res.data))
      .catch(err => console.error('Failed to load images', err));
  };

  useEffect(() => {
    API.get('/admin/dashboard')
      .then(() => {
        setMessage('Welcome to Admin Panel!');
        fetchImages();
      })
      .catch(() => {
        alert('Unauthorized');
        navigate('/login');
      });
  }, []);

  const handleUpload = async () => {
    if (!file) return alert('Please select a file');
    const formData = new FormData();
    formData.append('file', file);

    try {
      await API.post('/admin/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchImages();
      setFile(null);
      alert('Upload successful!');
    } catch (err) {
      alert('Upload failed');
    }
  };

  const handleDelete = async (filename) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    try {
      await API.delete(`/admin/delete/${filename}`);
      fetchImages();
      alert('Image deleted');
    } catch (err) {
      alert('Deletion failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8"
      >
        {/* Top Right Buttons */}
        <div className="admin-actions">
          <button
            onClick={() => navigate('/')}
            className="action-btn bg-gray-800 hover:bg-gray-900 "
          >
            Home
          </button>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              navigate('/login');
            }}
            className="action-btn bg-yellow-500 hover:bg-yellow-600"
          >
            Logout
          </button>
        </div>

        <h2 className="text-3xl font-bold mb-2 text-purple-700">Admin Panel</h2>
        <p className="text-gray-600 mb-6">{message}</p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="border border-gray-300 p-2 rounded-lg shadow-sm w-full sm:w-auto"
          />
          <button
            onClick={handleUpload}
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg transition-shadow shadow-md hover:shadow-xl"
          >
            Upload Image
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((img) => (
            <motion.div
              key={img.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-white p-4 shadow-md rounded-xl flex flex-col items-center"
            >
              <img
                src={`http://localhost:8080${img.url}`}
                alt="Gallery"
                className="rounded-lg w-full object-cover h-48"
              />
              <button
                onClick={() => handleDelete(img.id)}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md shadow"
              >
                Delete
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default AdminPanel;
