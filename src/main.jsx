import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavbarHome from "./component/nav/navbarHome.jsx";
import NavbarCard from "./component/nav/navbarCard.jsx";
import Cards from "./component/Card/Cards.jsx";
import AlohidaCard from "./component/Card/Produkt.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <NavbarHome />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/categories/:slug" element={<NavbarCard />} />
      <Route path="product" element={<Cards />} />
      <Route path="/product/:id" element={<AlohidaCard />} />
    </Routes>
  </BrowserRouter>
);
