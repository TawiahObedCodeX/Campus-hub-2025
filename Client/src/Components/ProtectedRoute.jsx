import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/useAuth";

export function RequireAuth({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export function RequireOnboardingStep({ requiredStep, children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Assuming user has an onboardingStep property
  const currentStep = user.onboardingStep || "personal-info";

  const steps = [
    "personal-info",
    "student-id",
    "role",
    "education",
    "skills",
    "graduate"
  ];

  const requiredIndex = steps.indexOf(requiredStep);
  const currentIndex = steps.indexOf(currentStep);

  if (currentIndex < requiredIndex) {
    return <Navigate to={`/onboarding/${currentStep}`} replace />;
  }

  return children;
}