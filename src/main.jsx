import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
// import Demo1 from './demo/Demo1.jsx'
// import Demo2 from './demo/Demo2.jsx'
// import Demo3 from './demo/Demo3';
// import Demo4 from './demo/Demo4.jsx'
// import Demo5 from './demo/Demo5.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
