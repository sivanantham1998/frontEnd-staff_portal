import React, { useState, forwardRef, useImperativeHandle } from "react";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Autocomplete,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
  Paper,
  Checkbox,
  useTheme,
} from "@mui/material";

const sourceOptions = [
  { label: "Google", value: "google" },
  { label: "Facebook", value: "facebook" },
  { label: "Direct", value: "direct" },
  { label: "Reference", value: "reference" },
  { label: "Just Dial", value: "justdial" },
];

const LeadForm = forwardRef((props, ref) => {
  const [data, setData] = useState({
    source: "",
    name: "",
    phone: "",
    whatsapp: "",
    gender: "",
    leadType: "",
    location: "",
    courses: [],
  });

  const [errors, setErrors] = useState({});
  const [sameAsWhatsapp, setSameAsWhatsapp] = useState(false);

  // const theme = useTheme();
  // const isMobile = theme.breakpoints.down("sm");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));

    if (name === "phone" && sameAsWhatsapp) {
      setData((prev) => ({ ...prev, phone: value, whatsapp: value }));
    }
  };

  const handleSameAsWhatsapp = (e) => {
    const checked = e.target.checked;
    setSameAsWhatsapp(checked);

    if (checked) {
      setData((prev) => ({ ...prev, whatsapp: prev.phone }));
    }
  };

  useImperativeHandle(ref, () => ({
    getData: () => {
      const newErrors = {};
      // if (!isMobile) {
      Object.keys(data).forEach((key) => {
        if (!data[key] || (Array.isArray(data[key]) && data[key].length === 0))
          newErrors[key] = "Required";
      });
      // }
      setErrors(newErrors);
      if (Object.keys(newErrors).length > 0) return null;
      return data;
    },
  }));

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Lead Form
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <FormControl fullWidth error={!!errors.source}>
          <InputLabel>Source</InputLabel>
          <Select
            value={data.source}
            name="source"
            onChange={handleChange}
            MenuProps={{ disablePortal: true }}
          >
            {sourceOptions.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
          {errors.source && <FormHelperText>{errors.source}</FormHelperText>}
        </FormControl>

        <TextField
          label="Name"
          name="name"
          value={data.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
          fullWidth
        />
        <TextField
          label="Phone"
          name="phone"
          value={data.phone}
          onChange={handleChange}
          error={!!errors.phone}
          helperText={errors.phone}
          fullWidth
        />

        {/* ✅ Checkbox below phone */}
        <FormControlLabel
          control={
            <Checkbox
              checked={sameAsWhatsapp}
              onChange={handleSameAsWhatsapp}
            />
          }
          label="Same as WhatsApp number"
        />

        <TextField
          label="WhatsApp"
          name="whatsapp"
          value={data.whatsapp}
          onChange={handleChange}
          error={!!errors.whatsapp}
          helperText={errors.whatsapp}
          fullWidth
          disabled={sameAsWhatsapp}
        />

        <Typography>Gender</Typography>
        <RadioGroup
          row
          name="gender"
          value={data.gender}
          onChange={handleChange}
        >
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
        {errors.gender && (
          <FormHelperText error>{errors.gender}</FormHelperText>
        )}

        <Typography>Lead Type</Typography>
        <RadioGroup
          row
          name="leadType"
          value={data.leadType}
          onChange={handleChange}
        >
          <FormControlLabel value="lead" control={<Radio />} label="Lead" />
          <FormControlLabel value="fake" control={<Radio />} label="Fake" />
        </RadioGroup>
        {errors.leadType && (
          <FormHelperText error>{errors.leadType}</FormHelperText>
        )}

        <Autocomplete
          multiple
          freeSolo
          disablePortal
          options={[]}
          value={data.courses}
          onChange={(event, newValue) =>
            setData((prev) => ({ ...prev, courses: newValue }))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Courses"
              placeholder="Type and press Enter"
              error={!!errors.courses}
              helperText={errors.courses}
            />
          )}
        />

        <TextField
          label="Location"
          name="location"
          value={data.location}
          onChange={handleChange}
          error={!!errors.location}
          helperText={errors.location}
          fullWidth
        />
      </Box>
    </Paper>
  );
});

export default React.memo(LeadForm);
