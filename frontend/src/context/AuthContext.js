import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Login function
  const login = async (email, password) => {
    setLoading(true); // Set loading true when request starts
    try {
      console.log('Sending login request with:', { email, password }); // Log the request payload
      const { data } = await axios.post('http://localhost:8000/api/auth/login', {
        email,
        password,
      });

      // Save token in localStorage
      localStorage.setItem('authToken', data.token);

      // Set user state
      setUser({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
      });

      // Clear error
      setError(null);
    } catch (err) {
      console.error('Login error:', err.response ? err.response.data : err.message); // Log the error
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false); // Set loading false once the request is complete
    }
  };

  // Register function
  const register = async (name, email, password) => {
    setLoading(true); // Set loading true when request starts
    try {
      console.log('Sending register request with:', { name, email, password }); // Log the request payload
      const { data } = await axios.post('http://localhost:8000/api/auth/register', {
        name,
        email,
        password,
      });

      // Save token in localStorage
      localStorage.setItem('authToken', data.token);

      // Set user state
      setUser({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
      });

      // Clear error
      setError(null);
    } catch (err) {
      console.error('Registration error:', err.response ? err.response.data : err.message); // Log the error
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false); // Set loading false once the request is complete
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setError(null);
  };

  // Check for existing token on component mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setLoading(true); // Set loading true while fetching user data
      axios
        .get('http://localhost:8000/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(({ data }) => {
          setUser({
            id: data.id,
            name: data.name,
            email: data.email,
          });
          setError(null);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error); // Log error for debugging
          logout(); // Clear token if it's invalid
        })
        .finally(() => {
          setLoading(false); // Set loading false after the request completes
        });
    } else {
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, error, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
