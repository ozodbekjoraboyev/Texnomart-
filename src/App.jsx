import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import useMyStore from "./ma-zustand";
import NavbarHome from "./component/nav/navbarHome";
import Carusel from "./component/Carusel/Carusel";
import Cards from "./component/Card/Cards";
import Categories from "./component/Caruseltagidagi/Catigores";
import AlohidaCard from "./component/Card/Produkt";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <div>
        <Carusel />
        <Categories />
        <Cards />
        <AlohidaCard/>
      </div>
    </>
  );
}

export default App;
