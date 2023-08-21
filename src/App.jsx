import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route,useNavigate, Navigate } from 'react-router-dom';



import Dashboard from './Pages/Dashboard/Dashboard';

function App() {


  return (
    <>
     <div className='maincontainer'>
        <Router>
          <Routes>
              <Route  exact path="/" element={<Dashboard/>}>
                  {/* <Route path="/" element={<Dashboardhome/>} /> */}
              </Route>

             <Route  path="/signin" element={<h1>tushar</h1>}/>
            </Routes>
          </Router>
      </div>
    </>
  )
}

export default App
