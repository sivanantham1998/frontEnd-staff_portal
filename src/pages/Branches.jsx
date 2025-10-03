import { Box, Button, Container, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Branches.module.css";

export default function Branches() {
  const location = useLocation();
  const data = location.state || [];
  const navigate = useNavigate();

  const gradients = [
    "linear-gradient(135deg, #ff9a9e, #fad0c4)",
    "linear-gradient(135deg, #a1c4fd, #c2e9fb)",
    "linear-gradient(135deg, #a18cd1, #fbc2eb)",
    "linear-gradient(135deg, #d4fc79, #96e6a1)",
    "linear-gradient(135deg, #f6d365, #fda085)",
  ];

  const branchInfo = (item) => {
    console.log(item);
    sessionStorage.setItem("branchInfo", JSON.stringify(item));
    navigate(`/branches/${item.branchId}`, { state: item });
  };

  return (
    <div>
      <Typography
        sx={{
          fontSize: "1.4rem",
          fontWeight: "bold",
        }}
      >
        Branches
      </Typography>

      <Paper>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#0d6efd",
              color: "white",
              margin: "20px",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#2e6bc5ff" },
            }}
            onClick={() => {
              navigate("/createbranch");
            }}
          >
            +Create branch
          </Button>
        </Box>

        <div className={styles.flex} style={{ margin: "20px" }}>
          {data.map((item, index) => (
            <div
              key={index}
              style={{
                background: gradients[index % gradients.length],
                minWidth: "250px",
                minHeight: "200px",
                padding: "20px",
                borderRadius: "15px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                marginBottom: "20px",
              }}
              className={styles.box}
              onClick={() => branchInfo(item)}
            >
              <div className={styles.flex}>
                <h5>{item.branchName.toUpperCase()}</h5>
                <span>{item.branchId.toUpperCase()}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: "50px",
                  marginTop: "20%",
                }}
                className={styles.pos}
              >
                <div>
                  <p>Staff</p>
                  <h4>{item.staff}</h4>
                </div>
                <div>
                  <p>Students</p>
                  <h4>{item.students}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Paper>
    </div>
  );
}
