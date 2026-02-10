import React from "react";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const location = useLocation();
  return (
    <div className="app-shell">
      <Header />
      <div className="main-content">
        <Sidebar />
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            className="page-content"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
          >
            {children}
          </motion.main>
        </AnimatePresence>
      </div>
    </div>
  );
}
