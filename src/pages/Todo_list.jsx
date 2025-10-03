import React, { useEffect, useState } from "react";
import {
  Paper,
  Box,
  Typography,
  Modal,
  Slide,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation } from "react-router-dom";

export default function TaskStatus() {
  const [selected, setSelected] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [pendingLead, setPendingLead] = useState([]);

  const data = useLocation();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexLastItem = currentPage * itemsPerPage;
  const indexFirstItem = indexLastItem - itemsPerPage;
  const currentItems = pendingLead.slice(indexFirstItem, indexLastItem);

  const totalPages = Math.ceil(pendingLead.length / itemsPerPage);
  const menuItems = [
    { key: "TODO", icon: <FormatListBulletedOutlinedIcon /> },
    { key: "DONE", icon: <ChecklistOutlinedIcon /> },
    { key: "PENDING", icon: <PendingActionsOutlinedIcon /> },
  ];

  useEffect(() => {
    if (data.state) {
      setPendingLead(data.state);
    }
  }, [data.state]);

  return (
    <>
      <Paper sx={{ marginTop: "10px", padding: "30px", position: "relative" }}>
        {/* Menu items */}
        <Box sx={{ display: "flex", gap: "20px" }}>
          {menuItems.map((item) => (
            <Box
              key={item.key}
              sx={{
                display: "flex",
                gap: "10px",
                cursor: "pointer",
                alignItems: "center",
                color: selected === item.key ? "primary.main" : "text.primary",
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  bottom: -7,
                  height: "2px",
                  width: selected === item.key ? "100%" : "0%",
                  backgroundColor: "primary.main",
                  transition: "width 0.3s ease-in-out",
                },
              }}
              onClick={() => setSelected(item.key)}
            >
              {React.cloneElement(item.icon, {
                color: selected === item.key ? "primary" : "inherit",
              })}
              <Typography fontSize={"0.8rem"}>{item.key}</Typography>
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            marginTop: "30px",
            maxWidth: "100%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Box>
            <Select
              value={currentPage}
              size="small"
              onChange={(e) => setCurrentPage(Number(e.target.value))}
              renderValue={(value) =>
                value ? `Page: ${value}` : "Select Page"
              }
              sx={{ marginRight: "20px", minWidth: "100px" }}
            >
              {Array.from({ length: totalPages }).map((_, index) => (
                <MenuItem key={index + 1} value={index + 1}>
                  {index + 1}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box
            sx={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
              boxShadow: 5,
              borderRadius: "20px",
              padding: 1.5,
              maxWidth: "150px",
            }}
            onClick={() => setDrawerOpen(true)}
          >
            <TuneOutlinedIcon fontSize="sm" />
            <Typography fontSize={"0.8rem"}>FILTER</Typography>
          </Box>
        </Box>

        <Modal open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <Slide direction="left" in={drawerOpen} mountOnEnter unmountOnExit>
            <Box
              sx={{
                position: "fixed",
                top: 0,
                right: 0,
                width: "300px",
                height: "100%",
                bgcolor: "background.paper",
                boxShadow: "none",
                p: 3,
                border: "none",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6">Filter Options</Typography>
                <IconButton onClick={() => setDrawerOpen(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <Typography variant="body2">More filters here...</Typography>
            </Box>
          </Slide>
        </Modal>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "200px",
          }}
        >
          {selected === "TODO" && (
            <Typography sx={{ marginTop: "10px" }}>
              No tasks available
            </Typography>
          )}
          {selected === "DONE" && (
            <Typography sx={{ marginTop: "10px" }}>Empty</Typography>
          )}
          {selected === "PENDING" && (
            <Box>
              {currentItems.map((item, index) => (
                <Box>
                  <Typography>
                    {item.name} - {item.phone}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Paper>
    </>
  );
}
