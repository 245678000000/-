import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { I18nProvider } from "@/i18n/context";
import { Navbar } from "@/components/Navbar";
import { FooterTabs } from "@/components/FooterTabs";
import Index from "./pages/Index";
import Draw from "./pages/Draw";
import Reading from "./pages/Reading";
import Cards from "./pages/Cards";
import CardDetail from "./pages/CardDetail";
import Journal from "./pages/Journal";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <I18nProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <div className="flex-1 pb-16 md:pb-0">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/draw" element={<Draw />} />
                <Route path="/reading" element={<Reading />} />
                <Route path="/cards" element={<Cards />} />
                <Route path="/card/:cardId" element={<CardDetail />} />
                <Route path="/journal" element={<Journal />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <FooterTabs />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </I18nProvider>
  </QueryClientProvider>
);

export default App;
