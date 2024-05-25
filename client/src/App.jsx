import Header from "./components/Layout/Header";
import Hero from "./components/HomePage/Hero";
import PageProducts from "./components/PageProducts/PageProducts";
import Footer from "./components/Layout/Footer";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import { inject } from '@vercel/analytics';

inject();

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Routes>
        <Route exact path="/" element={<Hero />} />
        <Route exact path="/products/*" element={<PageProducts />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
