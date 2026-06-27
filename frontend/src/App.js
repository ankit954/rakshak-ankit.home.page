import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@/App.css";

import Home from "@/pages/Home";
import BecomeGuard from "@/pages/BecomeGuard";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import DPDP from "@/pages/DPDP";
import Admin from "@/pages/Admin";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Toaster } from "sonner";

function PublicLayout({ children }) {
  return (
    <div className="App" data-testid="app-root">
      <Header />
      <main className="pt-20">{children}</main>
      <Footer />
      <Toaster position="bottom-center" theme="dark" />
    </div>
  );
}

function BareLayout({ children }) {
  // Admin: no header/footer
  return (
    <div className="App" data-testid="app-root-bare">
      {children}
      <Toaster position="bottom-center" theme="dark" />
    </div>
  );
}

const wrap = (Page) => (
  <PublicLayout>
    <Page />
  </PublicLayout>
);

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={wrap(Home)} />
        <Route path="/become-a-guard" element={wrap(BecomeGuard)} />
        <Route path="/about" element={wrap(About)} />
        <Route path="/contact" element={wrap(Contact)} />
        <Route path="/privacy" element={wrap(Privacy)} />
        <Route path="/terms" element={wrap(Terms)} />
        <Route path="/dpdp" element={wrap(DPDP)} />
        <Route
          path="/admin"
          element={
            <BareLayout>
              <Admin />
            </BareLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
