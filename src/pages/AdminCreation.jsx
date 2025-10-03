import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  Box,
  Button,
  FormHelperText,
} from "@mui/material";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import styles from "./BranchInfo.module.css";
import { useServerContext } from "../ApiContext/Server";
import axios from "axios";

export default function AdminCreation() {
  const serverUrl = useServerContext();
  const [staffData, setStaffData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const genderOptions = ["male", "female", "other"];
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [permission, setPermission] = useState([]);
  const [nextId, setNextId] = useState("");
  const [branchInfo, setBranchInfo] = useState("");
  const [data, setData] = useState({
    name: "",
    userName: "",
    password: "",
    dob: "",
    aadhar: "",
    phoneNo: "",
    address: "",
    email: "",
  });
  const [error, setError] = useState({});

  useEffect(() => {
    // Get next AdminId
    axios
      .get(`${serverUrl}/staff/adminNextId`, { withCredentials: true })
      .then((s) => {
        setNextId(s.data.nextId + "IDM" + new Date().getFullYear());
      });

    // Get branchInfo from sessionStorage
    const storedBranch = sessionStorage.getItem("branchInfo");
    if (storedBranch) {
      try {
        const branchObj = JSON.parse(storedBranch);
        setBranchInfo(branchObj);
        // console.log("Branch object:", branchObj);
      } catch (err) {
        console.error("Invalid branchInfo in sessionStorage", err);
      }
    }
  }, [serverUrl]);

  // staff data
  // console.log(branchInfo);
  const gradients = [
    "linear-gradient(135deg, #ff9a9e, #fad0c4)",
    "linear-gradient(135deg, #a1c4fd, #c2e9fb)",
    "linear-gradient(135deg, #a18cd1, #fbc2eb)",
    "linear-gradient(135deg, #d4fc79, #96e6a1)",
    "linear-gradient(135deg, #f6d365, #fda085)",
  ];

  useEffect(() => {
    if (!branchInfo?._id) return;
    axios
      .get(`${serverUrl}/staff/admin`, { withCredentials: true })
      .then((s) => {
        // console.log(s);

        let a = s.data.data.filter(
          (ans) => String(ans.branchId) === String(branchInfo._id)
        );
        console.log(a);
        setStaffData(a);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [branchInfo, serverUrl]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: "" }));
  };

  // ✅ Fixed validation
  const validate = () => {
    let newError = {};

    // Name
    if (!data.name.trim()) newError.name = "Name required";

    // Username
    if (!data.userName.trim()) newError.userName = "User name required";

    // Password
    if (!data.password.trim()) newError.password = "Password required";

    // DOB
    if (!data.dob.trim()) newError.dob = "Date of Birth required";

    // Aadhar
    if (!data.aadhar.trim()) {
      newError.aadhar = "Aadhar number required";
    } else if (!/^\d{12}$/.test(data.aadhar.trim())) {
      newError.aadhar = "Aadhar number must be exactly 12 digits";
    }

    // Phone number
    if (!data.phoneNo.trim()) {
      newError.phoneNo = "Phone number required";
    } else if (!/^\d{10}$/.test(data.phoneNo.trim())) {
      newError.phoneNo = "Phone number must be exactly 10 digits";
    }

    // Address
    if (!data.address.trim()) newError.address = "Address required";

    // Email
    if (!data.email.trim()) {
      newError.email = "Email required";
    } else if (!/^\S+@\S+\.\S+$/.test(data.email.trim())) {
      newError.email = "Enter a valid email address";
    }

    // AdminId
    if (!nextId.trim()) newError.adminId = "AdminId required";

    // Gender
    if (!gender) newError.gender = "Gender required";

    // Role
    if (!role) newError.role = "Role required";

    // Permission
    if (!permission || permission.length === 0)
      newError.permission = "At least one permission required";

    setError(newError);

    return Object.keys(newError).length === 0;
  };

  const options = {
    "super admin": [
      "home",
      "lead",
      "enquiry",
      "admission",
      "add user",
      "branch",
      "courses",
      "todo list",
      "staff",
      "expense",
      "syllabus",
    ],
    "office admin": [
      "home",
      "lead",
      "enquiry",
      "admission",
      "add user",
      "branch",
      "todo list",
      "staff",
      "expense",
      "syllabus",
    ],
    "lead follwer": ["lead", "home", "todo list"],
  };

  const createAdmin = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    // console.log("data", data, gender, role, permission);
    try {
      const response = await axios.post(
        `${serverUrl}/staff/createAdmin`,
        {
          ...data,
          gender,
          permission,
          role,
          adminId: nextId,
          branchId: branchInfo._id,
          branchName: branchInfo.branchName,
        },
        { withCredentials: true }
      );
      if (response.status === 201) {
        toast.success("Operation successful!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error("Error!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide,
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div>
      <ToastContainer />
      <Typography sx={{ fontSize: "1.5rem", mb: 2 }}>Create Admin</Typography>

      <Paper sx={{ p: 3 }}>
        {!showForm && (
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: 2,
              }}
            >
              <Button
                sx={{ bgcolor: "#0d6efd", color: "white", fontSize: "0.7rem" }}
                onClick={() => {
                  setShowForm(true);
                }}
              >
                <i className="fa-solid fa-plus"></i> Create Admin
              </Button>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "50px",
              }}
            >
              {staffData.map((item, index) => (
                <div
                  key={index}
                  style={{
                    background: gradients[index % gradients.length],
                    width: "330px",
                    minHeight: "180px",
                    padding: "20px",
                    borderRadius: "15px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                    marginBottom: "20px",
                    wordWrap: "break-word",
                    wordBreak: "break-word",
                    whiteSpace: "normal",
                    position: "relative",
                  }}
                >
                  <div className={styles.adminCreation_div}>
                    <h5>{item.userName}</h5>
                    <h5>{item.adminId}</h5>
                  </div>

                  <div>
                    <p>{item.email}</p>
                  </div>

                  <div className={`${styles.adminCreation_pos}`}>
                    <p
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "30px",
                      }}
                    >
                      <span>Gender:{item.gender}</span>
                      <span>Phone:{item.phoneNo}</span>
                    </p>
                  </div>
                </div>
              ))}
            </Box>
          </Box>
        )}

        {showForm && (
          <Box sx={{ marginTop: 3 }}>
            <form onSubmit={createAdmin}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
                  gap: 3,
                }}
              >
                <TextField
                  label="Name"
                  type="text"
                  size="small"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  error={!!error.name}
                  helperText={error.name}
                />
                <TextField
                  label="UserName"
                  type="text"
                  size="small"
                  name="userName"
                  value={data.userName}
                  onChange={handleChange}
                  error={!!error.userName}
                  helperText={error.userName}
                />
                <TextField
                  label="Password"
                  type="password"
                  size="small"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  error={!!error.password}
                  helperText={error.password}
                />
                <TextField
                  label="Date Of Birth"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  size="small"
                  value={data.dob}
                  name="dob"
                  onChange={handleChange}
                  error={!!error.dob}
                  helperText={error.dob}
                />
                <TextField
                  label="Aadhar number"
                  type="text"
                  size="small"
                  value={data.aadhar}
                  name="aadhar"
                  onChange={handleChange}
                  error={!!error.aadhar}
                  helperText={error.aadhar}
                />
                <TextField
                  label="Phone number"
                  type="text"
                  size="small"
                  value={data.phoneNo}
                  name="phoneNo"
                  onChange={handleChange}
                  error={!!error.phoneNo}
                  helperText={error.phoneNo}
                />

                {/* Gender Dropdown */}
                <FormControl fullWidth error={!!error.gender}>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    name="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    size="small"
                  >
                    {genderOptions.map((i, index) => (
                      <MenuItem value={i} key={index}>
                        {i}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{error.gender}</FormHelperText>
                </FormControl>

                {/* Role Dropdown */}
                <FormControl fullWidth error={!!error.role}>
                  <InputLabel>Role</InputLabel>
                  <Select
                    name="role"
                    value={role}
                    onChange={(e) => {
                      setRole(e.target.value);
                      setPermission([]);
                    }}
                    size="small"
                  >
                    {Object.keys(options).map((i, index) => (
                      <MenuItem key={index} value={i}>
                        {i}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{error.role}</FormHelperText>
                </FormControl>

                {/* Permission Multi-Select */}
                <FormControl fullWidth error={!!error.permission}>
                  <InputLabel>Menu</InputLabel>
                  <Select
                    name="permission"
                    multiple
                    value={permission}
                    onChange={(e) =>
                      setPermission(
                        typeof e.target.value === "string"
                          ? e.target.value.split(",")
                          : e.target.value
                      )
                    }
                    renderValue={(selected) => selected.join(", ")}
                    size="small"
                  >
                    {(options[role] || []).map((i, index) => (
                      <MenuItem key={index} value={i}>
                        {i}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{error.permission}</FormHelperText>
                </FormControl>

                <TextField
                  label="Address"
                  type="text"
                  size="small"
                  name="address"
                  value={data.address}
                  onChange={handleChange}
                  error={!!error.address}
                  helperText={error.address}
                />
                <TextField
                  label="AdminId"
                  type="text"
                  size="small"
                  name="adminId"
                  value={nextId}
                  disabled
                  error={!!error.adminId}
                  helperText={error.adminId}
                />
                <TextField
                  label="Email"
                  type="email"
                  placeholder="idm@gmail.com"
                  size="small"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  error={!!error.email}
                  helperText={error.email}
                />
              </Box>

              <div className={styles.submitBtn}>
                <Button
                  type="submit"
                  sx={{
                    bgcolor: "#0d6efd",
                    color: "#fff",
                    mt: 2,
                  }}
                >
                  Create Admin
                </Button>
              </div>
            </form>
          </Box>
        )}
      </Paper>
    </div>
  );
}
