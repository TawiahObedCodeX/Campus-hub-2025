import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { AuthProvider } from "./Components/context/AuthContext.jsx"; // New
import { RequireAuth, RequireOnboardingStep } from "./Components/ProtectedRoute.jsx"; // New
import { useAuth } from "./Components/context/useAuth"; // For CatchAll

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Explore from "./Pages/Explore";
import GigsPage from "./Pages/GigsPage";
import Signup from "./Pages/Signup";
import OnboardingPersonalInfo from "./Pages/OnboardingPersonalInfo";
import OnboardingStudentID from "./Pages/OnboardingStudentID";
import OnboardingRole from "./Pages/OnboardingRole";
import OnboardingEducation from "./Pages/OnboardingEducation";
import OnboardingSkills from "./Pages/OnboardingSkills";
import OnboardingGraduate from "./Pages/OnboardingGraduate";
import OnboardingGraduateDetails from "./Pages/OnboardingGraduateDetails";
import DashboardPage from "./Pages/DashboardPage";
import JoinasBusiness from "./Pages/JoinasBusiness";
import BusinessOptions from "./Pages/BusinessOptions";
import TalentOptions from "./Pages/TalentOptions";
import StoreFrontOptions from "./Pages/StoreFrontOptions";
import HostEventOptions from "./Pages/HostEventOptions";
import Verification from "./Pages/Verification";
import VMeetLayout from "./Pages/VMeetLayout.jsx";
import JoinMeeting from "./Pages/JoinMeeting.jsx";
import ScheduledMeet from "./Pages/ScheduledMeet.jsx";
import ActiveSessions from "./Pages/ActiveSessions.jsx";
import CoWorking from "./Pages/CoWorking.jsx";
import Support from "./Pages/Support.jsx";
import Settings from "./Pages/Settings.jsx";

// Catch-all component for unmatched routes
function CatchAll() {
  const { user } = useAuth();
  return <Navigate to={user ? "/dashboard" : "/login"} replace />;
}

function App() {
  const router = createBrowserRouter([
    // Public routes
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/Explore", element: <Explore /> }, // Assuming this is public

    // Auth-required routes (nested for clean protection)
    {
      element: <RequireAuth />, // Protects everything inside
      children: [
        { path: "/Gigs", element: <GigsPage /> },
        { path: "/dashboard", element: <DashboardPage /> },
        { path: "/joinasbusiness", element: <JoinasBusiness /> },
        { path: "/selectoptions", element: <BusinessOptions /> },
        { path: "/talent", element: <TalentOptions /> },
        { path: "/storefront", element: <StoreFrontOptions /> },
        { path: "/hostevent", element: <HostEventOptions /> },
        { path: "/verification", element: <Verification /> },

        // Onboarding (extra sequential protection)
        {
          element: <RequireOnboardingStep requiredStep="personal-info" />,
          children: [
            { path: "/onboarding/personal-info", element: <OnboardingPersonalInfo /> },
            {
              element: <RequireOnboardingStep requiredStep="student-id" />,
              children: [
                { path: "/onboarding/student-id", element: <OnboardingStudentID /> },
                {
                  element: <RequireOnboardingStep requiredStep="role" />,
                  children: [
                    { path: "/onboarding/role", element: <OnboardingRole /> },
                    { path: "/onboarding/graduate", element: <OnboardingGraduate /> },
                    { path: "/onboarding/graduate/details", element: <OnboardingGraduateDetails /> },
                    {
                      element: <RequireOnboardingStep requiredStep="education" />,
                      children: [
                        { path: "/onboarding/education", element: <OnboardingEducation /> },
                        {
                          element: <RequireOnboardingStep requiredStep="skills" />,
                          children: [{ path: "/onboarding/skills", element: <OnboardingSkills /> }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },


    // Inside createBrowserRouter, in the RequireAuth children array:
{
  path: "/vmeet",               // Base path
  element: <VMeetLayout/>,     // Mother layout (persistent)
  children: [
    { index: true, element: <JoinMeeting /> },  // Default when at /vmeet
    { path: "joinmeeting", element: <JoinMeeting /> },
    { path: "scheduledmeet", element: <ScheduledMeet /> },
    { path: "activesessions", element: <ActiveSessions /> },
    { path: "co-working", element: <CoWorking /> },
     { path: "support", element: <Support /> },
    { path: "settings", element: <Settings /> },
    // Add more sub-routes as needed
  ],
},

    // Catch-all route for unmatched paths
    { path: "*", element: <CatchAll /> },
  ]);
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;