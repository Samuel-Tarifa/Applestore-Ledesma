import Header from "./components/Header";
import Hero from "./components/Hero";
import Products from "./components/Products";
import Footer from "./components/Footer";
import "./App.css";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Routes>
        <Route exact path="/" element={<Hero/>}/>
        <Route exact path="/products" element={<Products/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
