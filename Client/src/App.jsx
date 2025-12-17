import {createBrowserRouter,createRoutesFromElements,Route, RouterProvider, Outlet} from "react-router-dom"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Explore from "./Pages/Explore"
import GigsPage from "./Pages/GigsPage"
import Signup from "./Pages/Signup"
import OnboardingStudentID from "./Pages/OnboardingStudentID"
import OnboardingPersonalInfo from "./Pages/OnboardingPersonalInfo"
import OnboardingRole from "./Pages/OnboardingRole"
import OnboardingStep4 from "./Pages/OnboardingStep4"
import OnboardingSkills from "./Pages/OnboardingSkills"

export default function App() {
  const router= createBrowserRouter(createRoutesFromElements(
      <Route  >
        <Route path="/" element={<Home/>} />
        <Route path='/login' element={< Login/>} />
        <Route  path='/signup' element={<Signup/>} />
        <Route path='/onboarding/personal-info' element={<OnboardingPersonalInfo/>} />
        <Route path='/onboarding/student-id' element={<OnboardingStudentID/>} />
        <Route path='/onboarding/role' element={<OnboardingRole/>} />
        <Route path='/onboarding/step4' element={<OnboardingStep4/>} />
        <Route path='/onboarding/skills' element={<OnboardingSkills/>} />
        <Route path='/explore' element={<Explore />} />
        <Route path="/gigs" element={<GigsPage/>} />
      </Route>
  ))
  return (
    <RouterProvider router={router} />
  )
}
