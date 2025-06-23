import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
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
import ProtectedRoute from "./components/auth/ProtectedRoute";
import CalenderViewAgency from "./pages/CalenderViewAgency";
import QuestionSkeleton from "./components/ui/QuestionSkeleton";
import Branding from "./components/Branding";

const queryClient = new QueryClient();

interface GeneratedPost {
  postIndex: number;
  postId: string;
  image: string;
  description: string;
  hashtags: string;
}
interface PostCardProps {
  post: GeneratedPost;
  postsResponse: any;
}

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
          <Route
            path="/onboarding-questions/:questionId"
            element={
              <ProtectedRoute>
                <OnboardingQuestion />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <PersonalDashboard />
              </ProtectedRoute>
            }
          >
            <Route path="/create" element={<Outlet />}>
              <Route
                path="single-post"
                element={
                  <ProtectedRoute>
                    <ContentCreation />
                  </ProtectedRoute>
                }
              />
              <Route
                path="content-plan"
                element={
                  <ProtectedRoute>
                    <Branding />
                  </ProtectedRoute>
                }
              />
              <Route
                path="generated-posts"
                element={
                  <ProtectedRoute>
                    <GeneratedPosts />
                  </ProtectedRoute>
                }
              />
              <Route
                path="generated-calendar"
                element={
                  <ProtectedRoute>
                    <GeneratedPosts />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route
              path="calendar"
              element={
                <ProtectedRoute>
                  <div className="flex-1 pr-6">
                    <CalendarView />
                  </div>
                </ProtectedRoute>
              }
            />
            {/* <Route
              path="calendar"
              element={
                <ProtectedRoute>
                  <div className="flex-1 pr-6">
                    <CalendarView />
                  </div>
                </ProtectedRoute>
              }
            /> */}
            {/* <Route
              path="profile"
              element={
                <div className="flex-1 p-8">
                  <h1 className="text-4xl font-bold text-gray-900">Profile View</h1>
                  <p className="text-gray-600 mt-4">Profile management coming soon...</p>
                </div>
              }
            /> */}
            {/* <Route
              path="spot-plan"
              element={
                <div className="flex-1 p-8">
                  <h1 className="text-4xl font-bold text-gray-900">Spot Plan</h1>
                  <p className="text-gray-600 mt-4">Planning tools coming soon...</p>
                </div>
              }
            /> */}
            {/* <Route
              path="drafts"
              element={
                <div className="flex-1 p-8">
                  <h1 className="text-4xl font-bold text-gray-900">Drafts</h1>
                  <p className="text-gray-600 mt-4">Saved drafts coming soon...</p>
                </div>
              }
            /> */}
            {/* <Route
              path="settings"
              element={
                <div className="flex-1 p-8">
                  <h1 className="text-4xl font-bold text-gray-900">Settings</h1>
                  <p className="text-gray-600 mt-4">Account settings coming soon...</p>
                </div>
              }
            /> */}
          </Route>
          <Route
            path="calendar"
            element={
              <ProtectedRoute>
                <div className="flex-1 pr-6">
                  <CalendarView />
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/agency"
            element={
              <ProtectedRoute>
                <AgencyDashboard />
              </ProtectedRoute>
            }
          >
            <Route
              path="create"
              element={
                <ProtectedRoute>
                  <Branding />
                </ProtectedRoute>
              }
            />
            <Route
              path="generated-posts"
              element={
                <ProtectedRoute>
                  <GeneratedPosts />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
