import React from "react";
import SignupForm from "./components/SignupForm"
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import { BrowserRouter, Routes , Route } from 'react-router-dom';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={< LoginForm />}></Route>
                <Route path="/signup" element={< SignupForm />}></Route>
                <Route path="/Home" element={< Home />}></Route>
            </Routes>
        </BrowserRouter>
        );
}