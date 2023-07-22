import React from "react";
import SignupForm from "./components/SignupForm"
import LoginForm from "./components/LoginForm";
import DirectorDashboard from './components/director.dashboad';
import HRDashboard from './components/hr.dahboard';
import EmployeeDashboard from './components/employee.dahsboard';

import { BrowserRouter, Routes , Route } from 'react-router-dom';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={< LoginForm />}></Route>
                <Route path="/signup" element={< SignupForm />}></Route>
                <Route path="/director-dashboard" element={< DirectorDashboard />}></Route>
                <Route path="/hr-dashboard" element={< HRDashboard />}></Route>
                <Route path="/employee-dashboard" element={< EmployeeDashboard />}></Route>
                

            </Routes>
        </BrowserRouter>
        );
}