import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors('');

    try {
        const response = await fetch("http://localhost/mvinetproject/src/api/login.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        console.log(data); // Log the response to check the role

        if (data.success) {
            console.log('Login successful!');

            // Check the role and navigate accordingly
            if (data.role === 'Super Admin') {
                navigate('/superadmin_dashboard'); // Adjust the route as necessary
            } else {
                navigate('/dashboard'); // Regular dashboard for other roles
            }
        } else {
            setErrors(data.message || 'Login failed');
        }
    } catch (error) {
        setErrors('An error occurred during login.');
        console.error('Error:', error);
    }
};
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        {errors && <div className="text-red-500 mb-4">{errors}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
              Login
            </button>
          </div>
          <p className="text-center">
            Not yet a member? <a href="register.html" className="text-blue-500">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
