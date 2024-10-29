import React, { useState } from 'react';
import axios from "axios";

const Signup = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        gender: '',
        business_name: '',
        description: '',
        organization_name: '',
        investment_focus: '',
        contact_info: '',
        username: '',
        email: '',
        password: '',
        confirm_password: '',
        role: '',
    });
    
    const [fileData, setFileData] = useState({ proposal_file: null, valid_id_file: null });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
        // Clear any previous error for this field
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFileData({ ...fileData, [name]: files[0] });
        
        // Clear any previous error for file input
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data Before Submission:", formData);

        // Validate form inputs
        const currentErrors = {};
        if (!formData.username) currentErrors.username = "Username is required.";
        if (!formData.email) currentErrors.email = "Email is required.";
        if (!formData.password) currentErrors.password = "Password is required.";
        if (formData.password !== formData.confirm_password) currentErrors.confirm_password = "Passwords do not match.";
        if (!formData.role) currentErrors.role = "Role is required.";

        if (formData.role === 'Incubatee') {
            if (!formData.first_name) currentErrors.first_name = "First Name is required.";
            if (!formData.last_name) currentErrors.last_name = "Last Name is required.";
            if (!formData.gender) currentErrors.gender = "Gender is required.";
            if (!formData.business_name) currentErrors.business_name = "Business Name is required.";
            if (!fileData.proposal_file) currentErrors.proposal_file = "Proposal file is required.";
        } else if (formData.role === 'Investor') {
            if (!formData.organization_name) currentErrors.organization_name = "Organization Name is required.";
            if (!formData.investment_focus) currentErrors.investment_focus = "Investment Focus is required.";
            if (!formData.contact_info) currentErrors.contact_info = "Contact Information is required.";
            if (!fileData.valid_id_file) currentErrors.valid_id_file = "Valid ID is required.";
        }

        setErrors(currentErrors);
        if (Object.keys(currentErrors).length > 0) return;

        // Prepare the FormData
        const form = new FormData();
        Object.keys(formData).forEach(key => {
            form.append(key, formData[key]);
        });

        // Append files to FormData
        if (fileData.proposal_file) {
            form.append('proposal_file', fileData.proposal_file);
        }

        if (fileData.valid_id_file) {
            form.append('valid_id_file', fileData.valid_id_file);
        }

        // Submit the form
        try {
            //http://localhost/mvinetproject/src/api/signup.php
            const response = await axios.post('http://localhost/mvinetproject/src/api/signup.php', form, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert(response.data.message);
            navigate
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
            alert("An error occurred: " + (error.response ? error.response.data.message : error.message));
        }
    };

    return (
        <div className="flex w-full min-h-screen font-sans">
            <div className="flex-1 bg-blue-500 text-white flex flex-col justify-start items-center p-4">
                <img 
                    src="src/assets/Logo.png"
                    alt="Lottery Logo"
                    className="mb-3 w-50"
                />
                <h1 className="text-4xl font-bold mb-10 text-center">
                    "Just a Click Away from Discovering Opportunities!"
                </h1>
                <p className="text-lg text-center">
                    Join MVINET and Connect with a Network of Innovators and Investors Shaping the Future.
                </p>
            </div>
            <div className="flex-1 p-12 flex flex-col justify-center bg-white">
                <h2 className="text-2xl font-semibold mb-2">Register</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <select 
                        name="role" 
                        value={formData.role} // Bind the value to formData.role
                        onChange={handleChange}
                        className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500'
                    >
                        <option value="">Select Role</option>
                        <option value="Incubatee">Incubatee</option>
                        <option value="Investor">Investor</option>
                    </select>
                    {errors.role && <div className="text-red-500">{errors.role}</div>}

                    {formData.role === 'Incubatee' && (
                        <>
                            <input 
                                name="first_name" 
                                type="text" 
                                placeholder="First Name" 
                                value={formData.first_name}
                                onChange={handleChange} 
                                className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500'
                            />
                            {errors.first_name && <div className="text-red-500">{errors.first_name}</div>}

                            <input 
                                name="last_name" 
                                type="text" 
                                placeholder="Last Name" 
                                value={formData.last_name}
                                onChange={handleChange} 
                                className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500'
                            />
                            {errors.last_name && <div className="text-red-500">{errors.last_name}</div>}

                            <select 
                                name="gender" 
                                value={formData.gender}
                                onChange={handleChange}
                                className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500'
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            {errors.gender && <div className="text-red-500">{errors.gender}</div>}

                            <input 
                                name="business_name" 
                                type="text" 
                                placeholder="Business Name" 
                                value={formData.business_name}
                                onChange={handleChange} 
                                className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500'
                            />
                            {errors.business_name && <div className="text-red-500">{errors.business_name}</div>}

                            <input 
                                name="description" 
                                type="text" 
                                placeholder="Description" 
                                value={formData.description}
                                onChange={handleChange} 
                                className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500'
                            />

                            <input name="proposal_file" type="file" onChange={handleFileChange} />
                            {errors.proposal_file && <div className="text-red-500">{errors.proposal_file}</div>}
                        </>
                    )}

                    {formData.role === 'Investor' && (
                        <>
                            <input 
                                name="organization_name" 
                                type="text" 
                                placeholder="Organization Name" 
                                value={formData.organization_name}
                                onChange={handleChange} 
                                className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500'
                            />
                            {errors.organization_name && <div className="text-red-500">{errors.organization_name}</div>}

                            <input 
                                name="investment_focus" 
                                type="text" 
                                placeholder="Investment Focus" 
                                value={formData.investment_focus}
                                onChange={handleChange} 
                                className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500'
                            />
                            {errors.investment_focus && <div className="text-red-500">{errors.investment_focus}</div>}

                            <input 
                                name="contact_info" 
                                type="text" 
                                placeholder="Contact Information" 
                                value={formData.contact_info}
                                onChange={handleChange} 
                                className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500'
                            />
                            {errors.contact_info && <div className="text-red-500">{errors.contact_info}</div>}

                            <input name="valid_id_file" type="file" onChange={handleFileChange} />
                            {errors.valid_id_file && <div className="text-red-500">{errors.valid_id_file}</div>}
                        </>
                    )}

                    <input 
                        name="username" 
                        type="text" 
                        placeholder="Username" 
                        value={formData.username}
                        onChange={handleChange} 
                        className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500'
                    />
                    {errors.username && <div className="text-red-500">{errors.username}</div>}

                    <input 
                        name="email" 
                        type="email" 
                        placeholder="Email" 
                        value={formData.email}
                        onChange={handleChange} 
                        className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500'
                    />
                    {errors.email && <div className="text-red-500">{errors.email}</div>}

                    <input 
                        name="password" 
                        type="password" 
                        placeholder="Password" 
                        value={formData.password}
                        onChange={handleChange} 
                        className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500'
                    />
                    {errors.password && <div className="text-red-500">{errors.password}</div>}

                    <input 
                        name="confirm_password" 
                        type="password" 
                        placeholder="Confirm Password" 
                        value={formData.confirm_password}
                        onChange={handleChange} 
                        className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500'
                    />
                    {errors.confirm_password && <div className="text-red-500">{errors.confirm_password}</div>}

                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Signup;