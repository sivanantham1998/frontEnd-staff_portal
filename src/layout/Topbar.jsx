import { Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import NotificationsIcon from "@mui/icons-material/Notifications";

export default function Topbar({ toggleSideBar }) {
  return (
    <div
      style={{
        height: "100%",
      }}
    >
      <Paper
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <button
            onClick={toggleSideBar}
            style={{
              border: "none",
              padding: "8px 12px",
              cursor: "pointer",
              backgroundColor: "transparent",
              fontSize: "1.2rem",
              fontWeight: "bold",
            }}
            title="Toggle sidebar"
          >
            ☰
          </button>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            marginRight: "20px",
          }}
        >
          <NotificationsIcon />
          <p
            style={{
              width: "40px",
              backgroundColor: "blue",
              color: "white",
              display: "flex",
              justifyContent: "center",
            }}
          >
            L
          </p>
        </Box>
      </Paper>
    </div>
  );
}
