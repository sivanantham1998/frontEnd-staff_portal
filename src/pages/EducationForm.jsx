import React, { useState, forwardRef, useImperativeHandle } from "react";
import {
  Box,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  FormHelperText,
  RadioGroup,
  FormControlLabel,
  Radio,
  useTheme,
  useMediaQuery,
} from "@mui/material";

const qualifications = [
  "arts",
  "engineering",
  "diploma",
  "science",
  "commerce",
];
const statuses = ["student", "working", "unemployement"];

const EducationForm = forwardRef((props, ref) => {
  const [data, setData] = useState({
    qualification: "",
    college: "",
    department: "",
    startYear: "",
    endYear: "",
    status: "",
    enquiryCount: "",
  });

  const [errors, setErrors] = useState({});
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  useImperativeHandle(ref, () => ({
    getData: () => {
      const newErrors = {};
      if (!isMobile) {
        Object.keys(data).forEach((key) => {
          if (!data[key]) newErrors[key] = "Required";
        });
      }
      setErrors(newErrors);
      if (Object.keys(newErrors).length > 0) return null;
      return data;
    },
  }));

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Education Details
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <FormControl fullWidth error={!!errors.qualification}>
          <InputLabel>Qualification</InputLabel>
          <Select
            name="qualification"
            value={data.qualification}
            onChange={handleChange}
          >
            {qualifications.map((q) => (
              <MenuItem key={q} value={q}>
                {q}
              </MenuItem>
            ))}
          </Select>
          {errors.qualification && (
            <FormHelperText>{errors.qualification}</FormHelperText>
          )}
        </FormControl>

        <TextField
          label="College Name"
          name="college"
          value={data.college}
          onChange={handleChange}
          error={!!errors.college}
          helperText={errors.college}
          fullWidth
        />
        <TextField
          label="Department"
          name="department"
          value={data.department}
          onChange={handleChange}
          error={!!errors.department}
          helperText={errors.department}
          fullWidth
        />
        <TextField
          label="Start Year"
          name="startYear"
          value={data.startYear}
          onChange={handleChange}
          error={!!errors.startYear}
          helperText={errors.startYear}
          fullWidth
        />
        <TextField
          label="End Year"
          name="endYear"
          value={data.endYear}
          onChange={handleChange}
          error={!!errors.endYear}
          helperText={errors.endYear}
          fullWidth
        />

        <Typography>Current Status</Typography>
        <RadioGroup
          row
          name="status"
          value={data.status}
          onChange={handleChange}
        >
          {statuses.map((s) => (
            <FormControlLabel key={s} value={s} control={<Radio />} label={s} />
          ))}
        </RadioGroup>
        {errors.status && (
          <FormHelperText error>{errors.status}</FormHelperText>
        )}

        <TextField
          label="Enquiry Count"
          name="enquiryCount"
          value={data.enquiryCount}
          onChange={handleChange}
          error={!!errors.enquiryCount}
          helperText={errors.enquiryCount}
          fullWidth
        />
      </Box>
    </Paper>
  );
});

export default React.memo(EducationForm);
