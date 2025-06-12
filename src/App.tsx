import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import OnboardingQuestion from "./pages/OnboardingQuestion";
import PersonalDashboard from "./pages/PersonalDashboard";
import ProfessionalDashboard from "./pages/ProfessionalDashboard";
import AgencyDashboard from "./pages/AgencyDashboard";
import GeneratedPosts from "./pages/GeneratedPosts";
import ContentCreation from "@/components/dashboard/ContentCreation";
import { CalendarView } from "./components/CalendarView";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/onboarding-questions/:questionId" element={<OnboardingQuestion />} />
          <Route path="/dashboard" element={<PersonalDashboard />}>
            <Route index element={<ContentCreation />} /> {/* Default route */}
            <Route path="create" element={<ContentCreation />} />
            <Route path="generated-posts" element={<GeneratedPosts />} />
            <Route
              path="calendar"
              element={
                <div className="flex-1 pr-6">
                  <CalendarView />
                </div>
              }
            />
            <Route
              path="profile"
              element={
                <div className="flex-1 p-8">
                  <h1 className="text-4xl font-bold text-gray-900">Profile View</h1>
                  <p className="text-gray-600 mt-4">Profile management coming soon...</p>
                </div>
              }
            />
            <Route
              path="spot-plan"
              element={
                <div className="flex-1 p-8">
                  <h1 className="text-4xl font-bold text-gray-900">Spot Plan</h1>
                  <p className="text-gray-600 mt-4">Planning tools coming soon...</p>
                </div>
              }
            />
            <Route
              path="drafts"
              element={
                <div className="flex-1 p-8">
                  <h1 className="text-4xl font-bold text-gray-900">Drafts</h1>
                  <p className="text-gray-600 mt-4">Saved drafts coming soon...</p>
                </div>
              }
            />
            <Route
              path="settings"
              element={
                <div className="flex-1 p-8">
                  <h1 className="text-4xl font-bold text-gray-900">Settings</h1>
                  <p className="text-gray-600 mt-4">Account settings coming soon...</p>
                </div>
              }
            />
          </Route>
          <Route path="/dashboard/professional" element={<ProfessionalDashboard />} />
          <Route path="/dashboard/agency" element={<AgencyDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
