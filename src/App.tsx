import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ParallaxProvider } from "react-scroll-parallax";
import { ReactLenis } from "lenis/react";
import FullPageParallaxBackground from "./components/FullPageParallaxBackground";
import HomePage from "./pages/HomePage";
import DominiosPage from "./pages/DominiosPage";
import PreciosPage from "./pages/PreciosPage";
import FAQPage from "./pages/FAQPage";
import TemplateSelectorPage from "./pages/TemplateSelectorPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import "./App.css";

// Platform Auth & Layouts
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import StandardLayout from "./layouts/StandardLayout";
import AdminLayout from "./layouts/AdminLayout";
import DashboardPlaceholder from "./pages/DashboardPlaceholder";
import AdminDashboardPlaceholder from "./pages/admin/AdminDashboardPlaceholder";
import UserList from "./pages/admin/UserList";
import HostnameList from "./pages/admin/HostnameList";
import TemplatesList from "./pages/admin/TemplatesList";

// Tenant Auth & Layouts
import { TenantAuthProvider } from "./context/TenantAuthContext";
import TenantRoute from "./components/TenantRoute";
import TenantLoginPage from "./pages/tenant/TenantLoginPage";
import TenantDashboard from "./pages/tenant/TenantDashboard";

import PublicTenantPage from "./pages/tenant/PublicTenantPage";

const lenisOptions = {
  smoothWheel: true,
  lerp: 0.08,
  syncTouch: true,
  touchMultiplier: 1.2,
};

const isTenantSubdomain = () => {
  const host = window.location.hostname;
  if (
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "eirl.pe" ||
    host === "www.eirl.pe"
  ) {
    return false;
  }
  return true;
};

function App() {
  const isTenant = isTenantSubdomain();

  if (isTenant) {
    return (
      <TenantAuthProvider>
        <ReactLenis root options={lenisOptions}>
          <Router>
            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden font-display text-charcoal antialiased bg-beige dark:bg-black transition-colors duration-500 ease-in-out">
              <Routes>
                <Route path="/" element={<PublicTenantPage />} />
                <Route path="/login" element={<TenantLoginPage />} />
                <Route element={<TenantRoute />}>
                  <Route path="/dashboard" element={<TenantDashboard />} />
                </Route>
                <Route
                  path="*"
                  element={
                    <div className="min-h-screen flex items-center justify-center p-4">
                      <div className="text-center space-y-4">
                        <h1 className="text-2xl font-bold font-serif text-charcoal dark:text-primary">
                          Página no encontrada
                        </h1>
                        <p className="text-charcoal/60 dark:text-primary/60">
                          Esta ruta en el panel del tenant no existe.
                        </p>
                      </div>
                    </div>
                  }
                />
              </Routes>
            </div>
          </Router>
        </ReactLenis>
      </TenantAuthProvider>
    );
  }

  return (
    <AuthProvider>
      <ReactLenis root options={lenisOptions}>
        <ParallaxProvider>
          <Router>
            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden font-display text-charcoal antialiased transition-colors duration-500 ease-in-out">
              <div
                className="page-dark-gradient fixed inset-0 z-0 hidden dark:block pointer-events-none"
                aria-hidden
              />
              <div
                className="page-light-gradient fixed inset-0 z-0 block dark:hidden pointer-events-none"
                aria-hidden
              />

              <Routes>
                {/* Rutas publicas (con FullPageParallaxBackground) */}
                <Route
                  path="/"
                  element={
                    <>
                      <FullPageParallaxBackground />
                      <div className="relative z-10 flex min-h-screen flex-col bg-transparent">
                        <HomePage />
                      </div>
                    </>
                  }
                />
                <Route
                  path="/dominios"
                  element={
                    <>
                      <FullPageParallaxBackground />
                      <div className="relative z-10 flex min-h-screen flex-col bg-transparent">
                        <DominiosPage />
                      </div>
                    </>
                  }
                />
                <Route
                  path="/precios"
                  element={
                    <>
                      <FullPageParallaxBackground />
                      <div className="relative z-10 flex min-h-screen flex-col bg-transparent">
                        <PreciosPage />
                      </div>
                    </>
                  }
                />
                <Route
                  path="/faq"
                  element={
                    <>
                      <FullPageParallaxBackground />
                      <div className="relative z-10 flex min-h-screen flex-col bg-transparent">
                        <FAQPage />
                      </div>
                    </>
                  }
                />
                <Route
                  path="/templates/:domain"
                  element={
                    <>
                      <FullPageParallaxBackground />
                      <div className="relative z-10 flex min-h-screen flex-col bg-transparent">
                        <TemplateSelectorPage />
                      </div>
                    </>
                  }
                />
                <Route
                  path="/registro/:domain/:template"
                  element={
                    <>
                      <FullPageParallaxBackground />
                      <div className="relative z-10 flex min-h-screen flex-col bg-transparent">
                        <RegisterPage />
                      </div>
                    </>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <>
                      <FullPageParallaxBackground />
                      <div className="relative z-10 flex min-h-screen flex-col bg-transparent">
                        <LoginPage />
                      </div>
                    </>
                  }
                />
                <Route
                  path="/signup"
                  element={
                    <>
                      <FullPageParallaxBackground />
                      <div className="relative z-10 flex min-h-screen flex-col bg-transparent">
                        <SignupPage />
                      </div>
                    </>
                  }
                />

                {/* Rutas protegidas - Usuario estandar */}
                <Route element={<PrivateRoute />}>
                  <Route element={<StandardLayout />}>
                    <Route
                      path="/dashboard"
                      element={<DashboardPlaceholder />}
                    />
                    <Route
                      path="/dashboard/dominios"
                      element={<DashboardPlaceholder />}
                    />
                    <Route
                      path="/dashboard/perfil"
                      element={<DashboardPlaceholder />}
                    />
                  </Route>
                </Route>

                {/* Rutas protegidas - Administrador de plataforma */}
                <Route element={<AdminRoute />}>
                  <Route element={<AdminLayout />}>
                    <Route
                      path="/admin"
                      element={<AdminDashboardPlaceholder />}
                    />
                    <Route path="/admin/users" element={<UserList />} />
                    <Route path="/admin/hostnames" element={<HostnameList />} />
                    <Route
                      path="/admin/templates"
                      element={<TemplatesList />}
                    />
                  </Route>
                </Route>
              </Routes>
            </div>
          </Router>
        </ParallaxProvider>
      </ReactLenis>
    </AuthProvider>
  );
}

export default App;
