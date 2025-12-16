import {createBrowserRouter,createRoutesFromElements,Route, RouterProvider, Outlet} from "react-router-dom"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Explore from "./Pages/Explore"
import GigsPage from "./Pages/GigsPage"
import Signup from "./Pages/Signup"

export default function App() {
  const router= createBrowserRouter(createRoutesFromElements(
      <Route  >
        <Route path="/" element={<Home/>} />
        <Route path='/login' element={< Login/>} />
        <Route  path='/signup' element={<Signup/>} />
        <Route path='/explore' element={<Explore />} />
        <Route path="/gigs" element={<GigsPage/>} />
      </Route>
  ))
  return (
    <RouterProvider router={router} />
  )
}
