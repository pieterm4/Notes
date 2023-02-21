import React from 'react';
import './App.css';
import {
  Routes,
  Route,
} from "react-router-dom";
import Login from './features/account/Login';
import Workplace from './components/Workplace';
import RequireAuth from './helpers/RequireAuth';
import { LogOut } from "./features/account/loginSlice";
import { useDispatch } from 'react-redux';

function App() {

  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(LogOut);

  };
  return (
    <div>
      <Routes>
        {/* <Route path='/' element={<RequireAuth logOut={handleLogOut}><Workplace /></RequireAuth>} /> */}
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Workplace />} />
      </Routes>
    </div>
  );
}

export default App;
