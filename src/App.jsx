// App.jsx
    import React from 'react';
    import { Routes, Route } from 'react-router-dom';
    import Nav from './components/Nav';
    import Home from './components/Home';
    import Dashboard from './components/Dashboard';
    import Changepass from './components/Changepass';
    import Footer from './components/Footer';

    function App() {
      return (
        <Routes>
          <Route path="/nav" element={<Nav />} />
          <Route path="/" element={<Home />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Changepass" element={<Changepass />} />
          <Route path="/Footer" element={<Footer />} />
        </Routes>
      );
    }

    export default App;


    setTimeout(() => {
      //run a function here
    }, 5000);