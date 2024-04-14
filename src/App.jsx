import React from 'react'
import { createBrowserRouter,createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import RootLayout from './components/RootLayout';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import PostDetails from './pages/PostDetails';
import PostUpdate from './pages/PostUpdate';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path='create-post' element={<CreatePost />} />
      <Route path='post-details/:id' element={<PostDetails />} />
      <Route path='post-update/:id' element={<PostUpdate />} />
    </Route>
  )
);


export default function App() {
  return (
    <RouterProvider router={router} />
  )
}
