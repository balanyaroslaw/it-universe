import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import TreeBoard from './pages/tree.page'
import '../src/index.css'
import "@blueprintjs/core/lib/css/blueprint.css";
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <TreeBoard />
  </StrictMode>,
)
