import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@/App.css";

import Home from "@/pages/Home";
import BecomeGuard from "@/pages/BecomeGuard";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Pricing from "@/pages/Pricing";
import Support from "@/pages/Support";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import Refund from "@/pages/Refund";
import ServiceDelivery from "@/pages/ServiceDelivery";
import DPDP from "@/pages/DPDP";
import Login from "@/pages/Login";
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
        <Route path="/about" element={wrap(About)} />
        <Route path="/pricing" element={wrap(Pricing)} />
        <Route path="/become-a-guard" element={wrap(BecomeGuard)} />
        <Route path="/support" element={wrap(Support)} />
        <Route path="/contact" element={wrap(Contact)} />
        <Route path="/privacy" element={wrap(Privacy)} />
        <Route path="/terms" element={wrap(Terms)} />
        <Route path="/refund-policy" element={wrap(Refund)} />
        <Route path="/service-delivery" element={wrap(ServiceDelivery)} />
        <Route path="/dpdp" element={wrap(DPDP)} />
        <Route path="/login" element={wrap(Login)} />
        <Route path="*" element={wrap(Home)} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
