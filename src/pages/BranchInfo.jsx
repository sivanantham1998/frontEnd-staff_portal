import { Paper, Typography } from "@mui/material";
import styles from "./BranchInfo.module.css";
import male from "../assets/man.png";
import female from "../assets/female-profile.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { serverContext } from "../ApiContext/Server";
export default function BranchInfo() {
  const serverUrl = useContext(serverContext);
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);

  // console.log(data);
  // console.log(`${serverUrl}/staff/${data._id}`);
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${serverUrl}/staff/${data._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((s) => {
        console.log(s.data);
        if (s.data.male === 0 && s.data.female === 0) {
          setFemaleCount(0);
          setMaleCount(0);
        } else {
          setMaleCount(s.data.male);
          setFemaleCount(s.data.female);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [serverUrl, data._id]);
  return (
    <div>
      <Typography
        sx={{
          fontSize: "1.4rem",
          fontWeight: "bold",
        }}
      >
        Branches Info
      </Typography>

      <Paper>
        <div className={styles.flex}>
          <div
            className={styles.admin}
            onClick={() => {
              navigate(`/branches/${data.branchId}/admin`);
            }}
          >
            <div>
              <p>Admin</p>
              <p>AdminId</p>
            </div>
            <div className={styles.profile}>
              <div className="male">
                <img src={male} alt="" />
                <p>{maleCount}</p>
              </div>
              <div className="female">
                <img src={female} alt="" />
                <p>{femaleCount}</p>
              </div>
            </div>
          </div>

          {/* course */}
          <div
            className={styles.admin}
            style={{
              background: "linear-gradient(135deg, #a1c4fd, #c2e9fb)",
            }}
          >
            <div>
              <p>Admin</p>
              <p>AdminId</p>
            </div>
            <div className={styles.profile}>
              <div>
                <p>Staff</p>
              </div>
              <div>
                <p>Staff</p>
              </div>
              <div>
                <p>Staff</p>
              </div>
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
}
