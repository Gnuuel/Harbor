import React from "react";
import { useEffect } from "react";
import axios from "axios";
import Home from './pages/home/home';
import Blog from './pages/Blog/blog';
import Menu from './pages/Menu/menu';
import MasterRooms from './pages/Master Rooms/master-rooms';
import Navbar from './pages/navbar/navbar';
import { Routes ,Route, BrowserRouter as Router } from 'react-router-dom';
import './assets/styles.scss';


function App() {
  return (
    <div className="App">
       <div className="full-admin">
          <div className="container">
              <div className="box">

              <Router>

                <Navbar/>

                <Routes>
                  <Route
                      exact
                      path="/"
                      element={<Home />}
                    />

                    <Route
                      path="/home"
                      element={<Home />}
                    />

                    <Route
                      exact
                      path="/master-rooms"
                      element={<MasterRooms />}
                    />

                    <Route
                      exact
                      path="/menu"
                      element={ <Menu />}
                    />

                    <Route
                      exact
                      path="/blog"
                      element={<Blog />}
                    />

                </Routes>
              </Router>
            </div>
          </div>
        </div>
    </div>
  );
}

export default App;
