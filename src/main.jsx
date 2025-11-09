import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {HeroUIProvider} from "@heroui/react";
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <HeroUIProvider>
    <ToastContainer position="top-right" autoClose={5000}/>
    <App />
  </HeroUIProvider>
  </StrictMode>
)
