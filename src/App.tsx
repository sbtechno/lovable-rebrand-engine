import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
