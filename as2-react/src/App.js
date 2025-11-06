import './App.css';
import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import AdvancedJS from './AdvancedJS'; // Advanced JS page component
import FAQ from './FAQ';
import Invoice from './Invoice1';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/advancedJS" element={<AdvancedJS />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/invoice" element={<Invoice />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    );
  }
}

export default App;
