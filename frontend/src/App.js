import React from "react";
import { BrowserRouter, Routes, Route, ScrollRestoration } from "react-router-dom";
import "@/App.css";

import Home from "@/pages/Home";
import BecomeGuard from "@/pages/BecomeGuard";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Toaster } from "sonner";

function Layout({ children }) {
  return (
    <div className="App" data-testid="app-root">
      <Header />
      <main className="pt-20">{children}</main>
      <Footer />
      <Toaster position="bottom-center" theme="dark" />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/become-a-guard"
          element={
            <Layout>
              <BecomeGuard />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <About />
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout>
              <Contact />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
