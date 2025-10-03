import React, { useState } from "react";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import styles from "./Login.module.css";
import Cookies from "js-cookie";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
} from "@mui/material";
import { useServerContext } from "../ApiContext/Server";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const serverUrl = useServerContext();
  // console.log("Server URL:", serverUrl);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${serverUrl}/admin/login`,
        {
          username,
          password,
        }
        // { withCredentials: true }
      );
      console.log("Login successful:", response.data);
      const in30Minutes = new Date(new Date().getTime() + 30 * 60 * 1000);
      Cookies.set("token", response.data.token, { expires: in30Minutes });
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className={styles.login_bg}>
      <Box
        display={"flex"}
        justifyContent={"flex-end"}
        alignItems={"center"}
        height={"100vh"}
        width={"100vw"}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: "100%",
            maxWidth: 300,
            mx: { xs: 6, md: 10 },
            borderRadius: "20px",
          }}
        >
          <h2 style={{ textAlign: "center" }}>LOGIN</h2>
          <form className={styles.lh} onSubmit={login}>
            <label htmlFor="">USERNAME</label>
            <TextField
              type="text"
              placeholder="Enter Username"
              InputProps={{
                sx: {
                  borderRadius: "20px",
                  height: "45px",
                },
              }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="">PASSWORD</label>
            <TextField
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              InputProps={{
                sx: {
                  borderRadius: "20px",
                  height: "45px",
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={handleTogglePassword}>
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                mt: 2,
                width: "100%",
                height: "45px",
                borderRadius: "20px",
              }}
            >
              LOGIN
            </Button>
          </form>
        </Paper>
      </Box>
    </div>
  );
}
