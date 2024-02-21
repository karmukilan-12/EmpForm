import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmployeeForm from './EmployeeForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <EmployeeForm />
      <ToastContainer />
    </div>
  );
}

export default App;
