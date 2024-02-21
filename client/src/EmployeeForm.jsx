import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './EmployeeForm.css';
import Starfield from 'react-starfield';

const EmployeeForm = () => {
  const initialFormData = {
    employeeId: '',
    name: '',
    department: '',
    dob: '',
    gender: '',
    designation: '',
    salary: '',
    email: '',
    phone_no: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = (e) => {
    const requiredFields = ['employeeId', 'name', 'department', 'dob', 'gender', 'designation', 'salary'];
    const filledFields = requiredFields.every(field => formData[field] !== '');
    if (filledFields) {
      setCurrentStep(currentStep + 1);
    } else {
      toast.error('Please fill in all fields before proceeding.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/submit-form', formData);
      toast.success('Employee data submitted successfully!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error occurred while submitting data');
    }
  };

  const handleClear = () => {
    setFormData(initialFormData);
    setCurrentStep(1);
  };

  const renderFormStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <label>
              Employee ID:
              <input
                type="text"
                name="employeeId"
                placeholder="Enter Employee ID"
                value={formData.employeeId}
                onChange={handleChange}
                className="input-field" required
              />
            </label>
            <label>
          Employee Name: 
          <input
            type="text"
            name="name"
            placeholder='Enter Employee Name'
            value={formData.name}
            onChange={handleChange}
            className="input-field" required
          />
        </label>
        <label>
          Department:
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="input-field" required
          >
            <option value="">Select Department</option>
            <option value="HR">HR</option>
            <option value="IT">IT</option>
            <option value="Finance">Finance</option>
            <option value="IT">Designing</option>
            <option value="IT">Packaging</option>

          </select>
        </label>
        <label>
          Date of Birth:
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="input-field" required
          />
        </label>
        <label className="radio-label">
          Gender:
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              onChange={handleChange}
              className="radio-input"
            />{' '}
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              onChange={handleChange}
              className="radio-input"
            />{' '}
            Female
          </label>
        </label>
        <label>
          Designation:
          <input
            type="text"
            name="designation"
            placeholder='Enter Employee Designation'
            value={formData.designation}
            onChange={handleChange}
            className="input-field" required
          />
        </label>
        <label>
          Salary:
          <input
            type="text"
            name="salary"
            placeholder='Enter Employee Salary'
            value={formData.salary}
            onChange={handleChange}
            className="input-field" required
          />
        </label>
            <button type="button" className="next-button" onClick={handleNext}>
              Next
            </button>
          </>
        );
      case 2:
        return (
          <>
            <label>
              Email:
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                className="input-field" required
              />
            </label>
            <label>
              Phone:
              <input
                type="tel"
                name="phone_no"
                placeholder="Enter Phone"
                value={formData.phone_no}
                onChange={handleChange}
                className="input-field" required
              />
            </label>
            <button type="submit" className="submit-button">
              Submit
            </button>
            <br></br>
            <button type="button" className="clear-button" onClick={handleClear}>
              Clear
            </button>
            <br></br>
            <button type="button" className="prev-button" onClick={() => setCurrentStep(currentStep - 1)}>
              Previous
            </button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <Starfield
        starCount={1000}
        starColor={[255, 255, 255]}
        speedFactor={0.05}
        backgroundColor="black"
      />
      <h1 className="fancy">Employee Management System</h1>
      <form className="employee-form" onSubmit={handleSubmit}>
        {renderFormStep()}
      </form>
    </div>
  );
};

export default EmployeeForm;
