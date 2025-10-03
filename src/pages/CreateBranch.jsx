import { Button, Paper, TextField } from "@mui/material";
import styles from "./Createbranch.module.css";
import { useState } from "react";
import { useServerContext } from "../ApiContext/Server";
import axios from "axios";

export default function CreateBranch() {
  const serverUrl = useServerContext();
  const [data, setData] = useState({
    branchName: "",
    branchId: "",
    branchAddress: "",
    branchLocation: "",
    admissionPrefix: "",
    gpayUpiId: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    let newError = {};

    if (!data.branchName.trim()) newError.branchName = "Name is required";
    if (!data.branchId.trim()) newError.branchId = "Branch Id is required";
    if (!data.branchAddress.trim())
      newError.branchAddress = "Address is required";
    if (!data.branchLocation.trim())
      newError.branchLocation = "Branch location is required";
    if (!data.admissionPrefix.trim())
      newError.admissionPrefix = "Prefix is required";
    if (!data.gpayUpiId.trim()) newError.gpayUpiId = "Gpay UPI is required";

    setErrors(newError);
    return Object.keys(newError).length === 0;
  };

  const branchCreate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!validate()) return;
    const response = await axios.post(`${serverUrl}/createBranch`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    if (response.status) {
      alert("Branch created!!!");
    } else {
      alert("Error while saving data");
    }
    console.log("Form submitted ", data);
  };

  return (
    <div>
      <Paper sx={{ marginTop: "30px", padding: "20px" }}>
        <form onSubmit={branchCreate} className={styles.formBranch}>
          <div className="row">
            <div className="col-12 col-md-4 mt-3">
              <TextField
                label="Branch name"
                fullWidth
                value={data.branchName}
                name="branchName"
                onChange={handleChange}
                error={!!errors.branchName}
                helperText={errors.branchName}
              />
            </div>
            <div className="col-12 col-md-4 mt-3">
              <TextField
                label="Branch Id"
                fullWidth
                value={data.branchId}
                name="branchId"
                onChange={handleChange}
                error={!!errors.branchId}
                helperText={errors.branchId}
              />
            </div>
            <div className="col-12 col-md-4 mt-3">
              <TextField
                label="Branch Address"
                fullWidth
                value={data.branchAddress}
                name="branchAddress"
                onChange={handleChange}
                error={!!errors.branchAddress}
                helperText={errors.branchAddress}
              />
            </div>
            <div className="col-12 col-md-4 mt-3">
              <TextField
                label="Branch location"
                fullWidth
                value={data.branchLocation}
                name="branchLocation"
                onChange={handleChange}
                error={!!errors.branchLocation}
                helperText={errors.branchLocation}
              />
            </div>
            <div className="col-12 col-md-4 mt-3">
              <TextField
                label="Admission Prefix"
                fullWidth
                value={data.admissionPrefix}
                name="admissionPrefix"
                onChange={handleChange}
                error={!!errors.admissionPrefix}
                helperText={errors.admissionPrefix}
              />
            </div>
            <div className="col-12 col-md-4 mt-3">
              <TextField
                label="Gpay UPI"
                fullWidth
                value={data.gpayUpiId}
                name="gpayUpiId"
                onChange={handleChange}
                error={!!errors.gpayUpiId}
                helperText={errors.gpayUpiId}
              />
            </div>
          </div>
          <div className={styles.submit}>
            <Button type="submit" variant="contained" color="primary">
              CREATE BRANCH
            </Button>
          </div>
        </form>
      </Paper>
    </div>
  );
}
