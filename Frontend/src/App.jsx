import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/ui/Home';

import Login from './components/ui/Auth/Login';
import Signup from './components/ui/Auth/Signup';
import Jobs from './components/Jobs';
import Browse from './components/Browse';
import Profile from './components/Profile';
import JobDescription from './components/JobDescription';






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
  {
    path: '/jobs',
    element: <Jobs/>,
  },
  {
    path: '/browse',
    element: <Browse/>
  },
  {
    path: '/description/:id',
    element: <JobDescription/>
  },
  {
    path: '/profile',
    element: <Profile/>
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
