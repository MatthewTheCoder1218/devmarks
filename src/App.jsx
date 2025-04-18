import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import AddBookmark from './pages/AddBookmark'
import Bookmark from './pages/Bookmark'
import PrivateRoute from './components/PrivateRoute'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={
          <PrivateRoute><Home /></PrivateRoute>
          } />
        <Route path="/add" element={<PrivateRoute><AddBookmark/></PrivateRoute>} />
        <Route path="/bookmark/:id" element={<PrivateRoute><Bookmark /></PrivateRoute>} />
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  )
}

export default App