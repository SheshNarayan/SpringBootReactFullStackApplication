import './App.css'

import FooterComponent from "./components/FooterComponent"
import HeaderComponent from "./components/HeaderComponent"
import ListEmployeeComponent from "./components/ListEmployeeComponent"
import EmployeeComponent from "./components/EmployeeComponent"

import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  
  return (
    <>
    <BrowserRouter>
      {/* Commnet: For Page Header */}
      <HeaderComponent /> 
     
      <Routes>
     
        {/* // http://localhost:3000 */}
        <Route path='/' element = {<ListEmployeeComponent />}></Route>

        {/* // http://localhost:3000/employees */}
        <Route path='/employees' element = {<ListEmployeeComponent />}></Route>
        
         {/* // http://localhost:3000/add-employee */}
         <Route path='/add-employee' element = {<EmployeeComponent/>}></Route>

         {/* // http://localhost:3000/edit-employee */}
         <Route path='/edit-employee/:id' element = {<EmployeeComponent/>}></Route>
    
      </Routes>
      
      <FooterComponent /> {/* Commnet: For Page Footer */}
    </BrowserRouter>

    </>
  )
}

export default App
