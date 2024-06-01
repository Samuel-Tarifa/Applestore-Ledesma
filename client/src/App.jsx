import Header from "./components/Layout/Header";
import Hero from "./components/HomePage/Hero";
import PageProducts from "./components/PageProducts/PageProducts";
import Footer from "./components/Layout/Footer";
import ScrollToTop from "./hooks/scrollToTop";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import { inject } from "@vercel/analytics";
inject();

import {QueryClientProvider} from '@tanstack/react-query'

import queryClient from "./queryClient";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <ScrollToTop />
        <Routes>
          <Route exact path="/" element={<Hero />} />
          <Route exact path="/products/*" element={<PageProducts />} />
        </Routes>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default App;
