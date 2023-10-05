import './App.css';
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Twitter from './pages/Twitter';
import Meteorologia from 'pages/Meteorologia';
import Drones from 'pages/Drones';
import Dashboard from 'pages/Dashboard';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/twitter",
    element: <Twitter />,
  },
  {
    path: "/weather",
    element: <Meteorologia />,
  },
  {
    path: "/drones",
    element: <Drones />,
  }
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
