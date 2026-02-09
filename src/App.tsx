import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import { ShowcaseLayout } from "@/components/ShowcaseLayout";
import TokensPage from "@/pages/TokensPage";
import AtomsPage from "@/pages/AtomsPage";
import MoleculesPage from "@/pages/MoleculesPage";
import PlaceholderPage from "@/pages/PlaceholderPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<ShowcaseLayout />}>
              <Route path="/" element={<Navigate to="/tokens" replace />} />
              <Route path="/tokens" element={<TokensPage />} />
              <Route path="/atoms" element={<AtomsPage />} />
              <Route path="/molecules" element={<MoleculesPage />} />
              <Route path="/organisms" element={<PlaceholderPage title="Organisms" />} />
              <Route path="/templates" element={<PlaceholderPage title="Templates" />} />
              <Route path="/pages" element={<PlaceholderPage title="Pages" />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
