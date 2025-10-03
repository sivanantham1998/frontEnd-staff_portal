import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./layout.css";
import Topbar from "./Topbar";
import { Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import { useServerContext } from "../ApiContext/Server";
const EXPANDED_WIDTH = 200;
const COLLAPSED_WIDTH = 80;
const MOBILE_BREAKPOINT = 768;

export default function Layout() {
  const serverUrl = useServerContext();
  // const token = Cookies.get("token");
  // console.log(token);
  const [isOpen, setIsOpen] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [data, setData] = useState([]);
  const [leadData, setLeadData] = useState([]);
  const location = useLocation();
  const toggleSideBar = () => {
    if (isMobile) {
      setIsOpen((prev) => !prev); // open/close overlay
    } else {
      setIsCollapsed((prev) => !prev); // collapse/expand column
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    Promise.all([
      axios.get(`${serverUrl}/branchDetails`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }),
      axios.get(`${serverUrl}/admin/leadForm`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }),
    ]).then(([res1, res2]) => {
      setData(res1.data.data);
      // console.log(res1.data.data);
      setLeadData(res2.data.data);
    });
  }, [serverUrl]);
  useEffect(() => {
    const handleSizeChange = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(mobile);
      setIsOpen(!mobile);
      if (mobile) setIsCollapsed(false);
    };
    window.addEventListener("resize", handleSizeChange);
    handleSizeChange();
    return () => window.removeEventListener("resize", handleSizeChange);
  }, []);

  useEffect(() => {
    if (isMobile) setIsOpen(false);
  }, [location.pathname, isMobile]);

  const desktopSidebarWidth = isCollapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH;

  return (
    <div
      className="layout_bg"
      style={{
        display: "grid",
        gridTemplateAreas: isMobile
          ? `"topbar" "main"` // no sidebar column in grid on mobile
          : `"sidebar topbar" "sidebar main"`,
        gridTemplateColumns: isMobile ? "1fr" : `${desktopSidebarWidth}px 1fr`,
        gridTemplateRows: "60px 1fr",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {!isMobile && (
        <div
          className="sidebar-area"
          style={{
            gridArea: "sidebar",
            width: `${desktopSidebarWidth}px`,
            transition: "width 0.3s ease",
            overflow: "hidden",
          }}
        >
          <Sidebar
            isCollapsed={isCollapsed}
            isMobile={false}
            branchData={data}
            leadData={leadData}
            // No onClose needed for desktop (we collapse instead)
          />
        </div>
      )}

      {isMobile && (
        <>
          <div className={`drawer ${isOpen ? "open" : ""}`}>
            <Sidebar
              isCollapsed={false}
              branchData={data}
              isMobile
              onClose={() => setIsOpen(false)}
            />
          </div>
          {isOpen && (
            <div className="backdrop" onClick={() => setIsOpen(false)} />
          )}
        </>
      )}

      <div className="topbar" style={{ gridArea: "topbar" }}>
        <Topbar toggleSideBar={toggleSideBar} />
      </div>

      <div className="main" style={{ gridArea: "main" }}>
        <Outlet />
      </div>
    </div>
  );
}
