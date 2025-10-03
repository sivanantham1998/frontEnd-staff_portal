import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import title_img from "../assets/title.png";

export default function Sidebar({
  isCollapsed,
  onClose,
  isMobile,
  branchData,
  leadData,
}) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [activeKey, setActiveKey] = useState("");
  const [branch, setBranch] = useState([]);
  const [lead, setLead] = useState([]);

  useEffect(() => {
    if (branchData) {
      setBranch(branchData);
      setLead(leadData);
    }
  }, [branchData, leadData]);

  const handleToggle = () => setOpen(!open);

  const formatting = {
    display: "flex",
    alignItems: "center",
    gap: 1,
    cursor: "pointer",
    borderRadius: "6px",
    px: 1,
    py: 1,
  };

  const size = { fontSize: 15 };

  const activeStyle = (key) =>
    activeKey === key
      ? {
          backgroundColor: "#6c63ff",
          color: "black",
          "& .MuiSvgIcon-root, & .MuiTypography-root": { color: "white" },
        }
      : {};

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "#9d9ad6ff",
        color: "white",
        transition: "all 0.3s ease",
        display: "flex",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        paddingRight: "10px",
        fontWeight: "bold",
      }}
    >
      {/* Collapsed sidebar */}
      {isCollapsed && !isMobile ? (
        <Paper
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            paddingTop: "50%",
            position: "relative",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {/* Dashboard */}
            <Box
              sx={{ ...formatting, ...activeStyle("dashboard") }}
              onClick={() => {
                setActiveKey("dashboard");
                navigate("/dashboard", { state: branchData });
              }}
            >
              <AppsOutlinedIcon fontSize="small" />
            </Box>

            {/* Lead */}
            <Box
              sx={{ ...formatting, ...activeStyle("lead") }}
              onClick={() => {
                setActiveKey("lead");
                navigate("/leadForm");
              }}
            >
              <SupervisorAccountOutlinedIcon fontSize="small" />
            </Box>

            {/* Branch Dropdown */}
            <Box sx={{ position: "relative" }}>
              <Box
                sx={{ ...formatting, ...activeStyle("branch") }}
                onClick={() => {
                  setActiveKey("branch");
                  handleToggle();
                }}
              >
                <AccountTreeOutlinedIcon fontSize="small" />
              </Box>

              {open && (
                <Paper
                  sx={{
                    position: "fixed",
                    top: "35%",
                    left: "0px",
                    background: "#fff",
                    color: "black",
                    padding: 1,
                    zIndex: 9999,
                    minWidth: 200,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  {branch.length > 0 ? (
                    branch.map((b, index) => (
                      <Typography
                        key={index}
                        sx={{ cursor: "pointer" }}
                        onClick={() => {
                          navigate(`/branches/${b.branchId}`, { state: b });
                          sessionStorage.setItem(
                            "branchInfo",
                            JSON.stringify(b)
                          );
                        }}
                      >
                        {b.branchName}
                      </Typography>
                    ))
                  ) : (
                    <Typography>No branches available</Typography>
                  )}
                  <Button
                    fullWidth
                    onClick={() => navigate("/branches", { state: branchData })}
                  >
                    Create Branch
                  </Button>
                </Paper>
              )}
            </Box>

            {/* Courses */}
            <Box
              sx={{ ...formatting, ...activeStyle("courses") }}
              onClick={() => setActiveKey("courses")}
            >
              <BookmarkAddOutlinedIcon fontSize="small" />
            </Box>

            {/* Todo */}
            <Box
              sx={{ ...formatting, ...activeStyle("todo") }}
              onClick={() => {
                setActiveKey("todo");
                navigate("/todolist", { state: lead });
              }}
            >
              <EditNoteOutlinedIcon fontSize="small" />
            </Box>

            {/* Syllabus */}
            <Box
              sx={{ ...formatting, ...activeStyle("syllabus") }}
              onClick={() => setActiveKey("syllabus")}
            >
              <LibraryBooksOutlinedIcon fontSize="small" />
            </Box>
          </Box>
        </Paper>
      ) : (
        <>
          {/* Expanded Sidebar */}
          <Paper sx={{ width: "100%" }}>
            <Box height={100}>
              <img
                src={title_img}
                alt="IDM"
                style={{ width: "100%", height: "100%" }}
              />
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {/* Home */}
              <Box
                sx={{ ...formatting, ...activeStyle("dashboard") }}
                onClick={() => {
                  setActiveKey("dashboard");
                  navigate("/dashboard", { state: branch });
                }}
              >
                <AppsOutlinedIcon fontSize="small" />
                <Typography sx={size}>Home</Typography>
              </Box>

              {/* Lead */}
              <Box
                sx={{ ...formatting, ...activeStyle("lead") }}
                onClick={() => {
                  setActiveKey("lead");
                  navigate("/leadForm");
                }}
              >
                <SupervisorAccountOutlinedIcon fontSize="small" />
                <Typography sx={size}>Lead</Typography>
              </Box>

              {/* Branch */}
              <Box sx={{ position: "relative" }}>
                <Box
                  sx={{ ...formatting, ...activeStyle("branch") }}
                  onClick={() => {
                    setActiveKey("branch");
                    handleToggle();
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <AccountTreeOutlinedIcon fontSize="small" />
                    <Typography sx={size}>Branch</Typography>
                  </Box>
                  {open ? (
                    <ArrowDropDownIcon fontSize="small" />
                  ) : (
                    <ArrowRightOutlinedIcon fontSize="small" />
                  )}
                </Box>

                {open && (
                  <Paper
                    sx={{ marginTop: "4px", padding: "8px", minWidth: 200 }}
                  >
                    {branch.length > 0 ? (
                      branch.map((b, index) => (
                        <Typography
                          key={index}
                          sx={{ cursor: "pointer" }}
                          onClick={() => {
                            navigate(`/branches/${b.branchId}`, { state: b });
                            sessionStorage.setItem(
                              "branchInfo",
                              JSON.stringify(b)
                            );
                          }}
                        >
                          {b.branchName}
                        </Typography>
                      ))
                    ) : (
                      <Typography>No branches available</Typography>
                    )}
                    <Button
                      fullWidth
                      onClick={() =>
                        navigate("/branches", { state: branchData })
                      }
                    >
                      Create Branch
                    </Button>
                  </Paper>
                )}
              </Box>

              {/* Courses */}
              <Box
                sx={{ ...formatting, ...activeStyle("courses") }}
                onClick={() => setActiveKey("courses")}
              >
                <BookmarkAddOutlinedIcon fontSize="small" />
                <Typography sx={size}>Courses</Typography>
              </Box>

              {/* Todo */}
              <Box
                sx={{ ...formatting, ...activeStyle("todo") }}
                onClick={() => {
                  setActiveKey("todo");
                  navigate("/todolist", { state: lead });
                }}
              >
                <EditNoteOutlinedIcon fontSize="small" />
                <Typography sx={size}>Todo list</Typography>
              </Box>

              {/* Syllabus */}
              <Box
                sx={{ ...formatting, ...activeStyle("syllabus") }}
                onClick={() => setActiveKey("syllabus")}
              >
                <LibraryBooksOutlinedIcon fontSize="small" />
                <Typography sx={size}>Syllabus</Typography>
              </Box>
            </Box>
          </Paper>

          {/* Mobile Close Button */}
          {isMobile && onClose && (
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{ position: "absolute", right: 8, top: 8, color: "white" }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </>
      )}
    </div>
  );
}
