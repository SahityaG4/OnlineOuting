import React,{useState} from 'react';
import {Routes,Route, BrowserRouter} from 'react-router-dom';
import NavBar from './Components/NavBar'
import HomeLogin from './Components/Logins/HomeLogin'
import FacultyApplication from './Components/ApplicationList/FacultyApplication';
import WardenApplication from './Components/ApplicationList/WardenApplication';
import StudentApplication from './Components/ApplicationList/StudentApplication';
import StudentForm from './Components/Forms/StudentForm';
import AdminForm from './Components/Forms/AdminForm';

const App = (props) => {
    
    return (
        <div>
            <NavBar />
            <Routes>
            <Route path = '/' element = {<HomeLogin />}>

            </Route>
            <Route path = '/Faculty' element = {<FacultyApplication />}></Route>
            <Route path = '/Warden' element = {<WardenApplication />}></Route>
            <Route path = '/Student' element = {<StudentApplication />}>
                <Route path = 'newApplication' element = {<StudentForm />}></Route>
            </Route>
            <Route path='/Admin' element={<AdminForm />}></Route>
            </Routes>
        </div>
    );
};

export default App;