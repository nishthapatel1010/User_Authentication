// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';  // Import AuthProvider
import AuthForm from './components/AuthForm';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';

const App = () => {
  return (
    <AuthProvider>  {/* Wrap everything with AuthProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AuthForm isLogin={true} />} />
          <Route path="/register" element={<AuthForm isLogin={false} />} />

          {/* Protect the dashboard route */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<h1>Welcome to Dashboard</h1>} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
