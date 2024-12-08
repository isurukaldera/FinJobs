import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, setToken } from './redux/authSlice'; // Import your actions

import Home from './components/ui/Home';
import Login from './components/ui/Auth/Login';
import Signup from './components/ui/Auth/Signup';
import Jobs from './components/Jobs';
import Browse from './components/Browse';
import Profile from './components/Profile';
import JobDescription from './components/JobDescription';
import Companies from '@/Admin/Companies';
import CompanyCreate from './Admin/CompanyCreate';
import CompanySetup from './Admin/CompanySetup';
import AdminJobs from './Admin/AdminJobs';
import PostJobs from './Admin/PostJobs';
import Applicants from './Admin/Applicants';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: '/jobs', element: <Jobs /> },
  { path: '/browse', element: <Browse /> },
  { path: '/description/:id', element: <JobDescription /> },
  { path: '/profile', element: <Profile /> },
  { path: "admin/companies", element: <Companies /> },
  { path: "admin/companies/create", element: <CompanyCreate /> },
  { path: "admin/companies/:id", element: <CompanySetup /> },
  { path: "admin/jobs", element: <AdminJobs /> },
  { path: "admin/jobs/create", element: <PostJobs /> },
  { path: "admin/jobs/:id/applicants", element: <Applicants /> }
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token'); // Get token from localStorage

    if (token) {
        // Dispatch token to Redux store if it exists
        dispatch(setToken(token));  // Ensure your redux store is updated with the token
    }
}, [dispatch]);


  return <RouterProvider router={router} />;
}

export default App;
