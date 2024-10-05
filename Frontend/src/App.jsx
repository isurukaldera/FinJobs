import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/ui/Home';

import Login from './components/ui/Auth/Login';
import Signup from './components/ui/Auth/Signup';





const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
  },
  {
    path: '/login',
    element: <Login/>,
  },
  {
    path: '/signup',
    element: <Signup/>,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
