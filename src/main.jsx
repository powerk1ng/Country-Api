import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './routing/Routing';
import './index.css'
import { useState } from 'react';

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <RouterProvider router={router} />
)
