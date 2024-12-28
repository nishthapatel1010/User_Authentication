// src/components/AuthForm.js
import { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import { Input, Button, message, Spin } from 'antd';

const AuthForm = ({ isLogin }) => {
  const { login, register, error, loading } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  const handleSubmit = () => {
    if (isLogin) {
      login(email, password);
    } else {
      register(name, email, password);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-xl max-w-sm w-full">
        {/* Display Name field only if it's not a login form */}
        {!isLogin && (
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-4 p-3 rounded-md border-2 border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
            required
          />
        )}
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 p-3 rounded-md border-2 border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
          type="email"
          required
        />
        <Input.Password
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 p-3 rounded-md border-2 border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
          required
        />

        {/* Submit button */}
        <Button
  onClick={handleSubmit}
  type="primary"
  className={`w-full py-3 text-lg rounded-md mt-4 
    ${loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800'} 
    text-white font-semibold transition duration-300 ease-in-out 
    disabled:cursor-not-allowed disabled:bg-gray-300`}
  disabled={loading || !email || !password || (!isLogin && !name)}
>
  {loading ? (
    <Spin size="small" />
  ) : isLogin ? (
    'Login'
  ) : (
    'Register'
  )}
</Button>


        {/* Display the 'Already have an account' or 'Need an account' link */}
        <div className="mt-4 text-sm text-center">
          {isLogin ? (
            <span>
              Don't have an account?{' '}
              <a href="/register" className="text-blue-500 hover:text-blue-700 transition duration-300">Register</a>
            </span>
          ) : (
            <span>
              Already have an account?{' '}
              <a href="/login" className="text-blue-500 hover:text-blue-700 transition duration-300">Login</a>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
