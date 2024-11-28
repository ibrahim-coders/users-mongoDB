import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Users from './Components/Users.jsx';
import Update from './Components/Update.jsx';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
  },
  {
    path: '/users',
    element: <Users />,
    loader: () => fetch('http://localhost:5000/users'),
  },

  {
    path: '/update/:id',
    element: <Update />,
    loader: ({ params }) => fetch(`http://localhost:5000/users/${params.id}`),
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
