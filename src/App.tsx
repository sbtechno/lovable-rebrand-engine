import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import APropos from "./pages/APropos";
import Programmes from "./pages/Programmes";
import Contact from "./pages/Contact";
import Inscription from "./pages/Inscription";
import Perspective from "./pages/Perspective";
import Galerie from "./pages/Galerie";
import Activites from "./pages/Activites";
import Recherche from "./pages/Recherche";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Inscriptions from "./pages/admin/Inscriptions";
import Contacts from "./pages/admin/Contacts";
import AdminPrograms from "./pages/admin/AdminPrograms";
import AdminGallery from "./pages/admin/AdminGallery";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
import AdminContent from "./pages/admin/AdminContent";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/a-propos" element={<APropos />} />
            <Route path="/programmes" element={<Programmes />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/inscription" element={<Inscription />} />
            <Route path="/perspective" element={<Perspective />} />
            <Route path="/galerie" element={<Galerie />} />
            <Route path="/activites" element={<Activites />} />
            <Route path="/recherche" element={<Recherche />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="inscriptions" element={<Inscriptions />} />
              <Route path="contacts" element={<Contacts />} />
              <Route path="contenu" element={<AdminContent />} />
              <Route path="programmes" element={<AdminPrograms />} />
              <Route path="galerie" element={<AdminGallery />} />
              <Route path="temoignages" element={<AdminTestimonials />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
