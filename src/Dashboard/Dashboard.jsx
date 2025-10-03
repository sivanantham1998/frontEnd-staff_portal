import React, { useContext, useEffect, useState } from "react";
import SensorOccupiedOutlinedIcon from "@mui/icons-material/SensorOccupiedOutlined";
import ContactPhoneOutlinedIcon from "@mui/icons-material/ContactPhoneOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import { Box, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { serverContext } from "../ApiContext/Server";
import Loader from "../Loader";
const iconData = [
  {
    icon: SensorOccupiedOutlinedIcon,
    color: "#ffffff",
    bg: "#985FFD",
    box_bg: "#FAE8FF",
    title: "Total Leads",
    total: 0,
  },
  {
    icon: ContactPhoneOutlinedIcon,
    color: "white",
    bg: "#009688",
    box_bg: "#B9F8CF",
    title: "Total Enquiry",
    total: 0,
  },
  {
    icon: GroupOutlinedIcon,
    color: "white",
    bg: "#51A2FF",
    box_bg: "#B8E6FE",
    title: "Total Admission",
    total: 0,
  },
  {
    icon: CurrencyExchangeOutlinedIcon,
    color: "white",
    bg: "#FFDF20",
    box_bg: "#FEF3C6",
    title: "Fees Collected",
    total: 0,
  },
];

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const serverUrl = useContext(serverContext);
  const [countLead, setCountLead] = useState([]);
  const state = useLocation();
  // console.log(state);
  const branch = state.state || [];

  useEffect(() => {
    axios
      .get(`${serverUrl}/admin/leadForm`, { withCredentials: true })
      .then((s) => {
        // console.log(s.data.data);
        setCountLead(s.data.data);
        // const erodeCunt = s.data.data.filter(
        //   (b) => b.branch === "Idm,Erode"
        // ).length;
        // console.log(erodeCunt);
      })
      .catch((err) => {
        console.log(err);
      });

    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [serverUrl, branch]);
  // const branch = ["IDM,Erode", "IDM,Coimbatore"];

  if (loading) return <Loader />;
  return (
    <div>
      {branch.map((branchName, idx) => (
        <Paper
          key={idx}
          sx={{
            mb: 2,
            mt: 2,
            p: 2,
            maxWidth: "100%",
            overflowX: "auto",
          }}
        >
          <Typography
            sx={{
              textAlign: "right",
              color: "#3B71CA",
            }}
            variant="h6"
          >
            {branchName.branchName}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 3,
              overflowX: "auto",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              marginTop: 2,
            }}
          >
            {iconData.map(
              ({ icon: Icon, color, bg, box_bg, title, total }, i) => (
                <Box
                  key={i}
                  sx={{
                    bgcolor: box_bg,
                    minWidth: "280px",
                    height: "180px",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    borderRadius: 2,
                  }}
                >
                  <Icon
                    style={{
                      color,
                      fontSize: 55,
                      background: bg,
                      borderRadius: "50%",
                      padding: 4,
                    }}
                  />
                  <Typography>{title}</Typography>
                  <Typography>
                    {
                      countLead.filter(
                        (b) => b.branch === branchName.branchName
                      ).length
                    }
                  </Typography>
                </Box>
              )
            )}
          </Box>
        </Paper>
      ))}
    </div>
  );
}
