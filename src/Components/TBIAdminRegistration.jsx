import React, { useState } from 'react';
import axios from 'axios';

function TBIAdminRegistration({ onClose }) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        university: '',
        password: '',
        gender: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const currentErrors = {};

        if (!formData.firstName) currentErrors.firstName = "First Name is required.";
        if (!formData.lastName) currentErrors.lastName = "Last Name is required.";
        if (!formData.email) currentErrors.email = "Email is required.";
        if (!formData.university) currentErrors.university = "University is required.";
        if (!formData.password) currentErrors.password = "Password is required.";
        if (!formData.gender) currentErrors.gender = "Gender is required.";

        setErrors(currentErrors);

        if (Object.keys(currentErrors).length > 0) {
            return; 
        }

        console.log("Submitting form data:", formData); // Log the data being sent

        try {
            const response = await axios.post(
                'http://localhost/mvinetwebapp/src/api/admin_signup.php',
                JSON.stringify(formData), // Send data as JSON
                { headers: { 'Content-Type': 'application/json' } } // Set Content-Type to application/json
            );

            console.log("Server Response:", response.data); // Log the response
            alert(response.data.message || 'TBI Admin added successfully!');
            onClose();
        } catch (error) {
            console.error('Error response:', error.response); // Log error response if exists
            alert('Failed to add TBI Admin');
        }
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-auto">
                <h3 className="text-lg font-bold text-center mb-4">Add TBI Admin</h3>
                <div className="max-h-96 overflow-y-auto">
                    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label className="block text-gray-700">First Name</label>
                            <input type="text" name="firstName" className="mt-1 p-2 border rounded w-full" placeholder="Enter first name"  onChange={handleChange} required/>
                            {errors.firstName && <div>{errors.firstName}</div>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Last Name</label>
                            <input type="text" name="lastName" className="mt-1 p-2 border rounded w-full" placeholder="Enter last name"  onChange={handleChange} required />
                            {errors.lastName && <div>{errors.lastName}</div>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Email</label>
                            <input type="email" name="email" className="mt-1 p-2 border rounded w-full" placeholder="Enter email" required onChange={handleChange} />
                            {errors.email && <div>{errors.email}</div>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">University</label>
                            <input type="text" name="university" className="mt-1 p-2 border rounded w-full" placeholder="Enter university name" onChange={handleChange} required />
                            {errors.university && <div>{errors.university}</div>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Password</label>
                            <input type="password" name="password" className="mt-1 p-2 border rounded w-full" placeholder="Enter password" onChange={handleChange} required />
                            {errors.password && <div>{errors.password}</div>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Gender</label>
                            <select name="gender" className="mt-1 p-2 border rounded w-full" onChange={handleChange} required >
                                <option value="">Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            {errors.gender && <div>{errors.gender}</div>}
                        </div>
                        <div className="flex justify-end col-span-2 mt-4">
                            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Admin</button>
                            <button type="button" className="ml-2 border border-gray-400 px-4 py-2 rounded hover:bg-gray-200" onClick={onClose}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default TBIAdminRegistration;
