import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import TreeBoard from './pages/tree.page'
import '../src/index.css'
import "@blueprintjs/core/lib/css/blueprint.css";
import Dashboard from './pages/dashboard.page';
import AboutUs from './pages/about.page'
import MainMenu from './shared/components/menu.component'
import Footer from './shared/components/footer.components'
import { Router } from './router/router'
import {publicRoutes } from './router/routes'
import useModalStore from './store/modal.store'
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter>
    <Router/>
  </BrowserRouter>
  </StrictMode>
)
