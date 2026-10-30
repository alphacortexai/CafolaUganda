import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import cms from "./data/cms.json";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import ServiceDetail from "./pages/ServiceDetail.jsx";
import ServicePage from "./pages/ServicePage.jsx";
import { ArticleDetail, Articles } from "./pages/Articles.jsx";
import CustomPage from "./pages/CustomPage.jsx";
import NotFound from "./pages/NotFound.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home cms={cms} />} />
        <Route path="/about" element={<About cms={cms} />} />
        <Route path="/services/:serviceSlug/:pageSlug" element={<ServicePage cms={cms} />} />
        <Route path="/services/:slug" element={<ServiceDetail cms={cms} />} />
        <Route path="/articles" element={<Articles cms={cms} />} />
        <Route path="/articles/:slug" element={<ArticleDetail cms={cms} />} />
        <Route path="/pages/:slug" element={<CustomPage cms={cms} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
