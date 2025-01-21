import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import TreeBoard from './pages/tree.page'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <TreeBoard />
  </StrictMode>,
)
