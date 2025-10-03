import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { useServerContext } from "../ApiContext/Server";

const IndividualPaperForm = forwardRef(({ storedData }, ref) => {
  const serverUrl = useServerContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [branches, setBranches] = useState([]);
  const [filteredPerson, setFilteredPerson] = useState([]);

  useEffect(() => {
    axios
      .get(`${serverUrl}/branchDetails`, { withCredentials: true })
      .then((s) => {
        setBranches(s.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [data, setData] = useState({
    conversation: storedData?.conversation || "",
    nextFollowDate: storedData?.nextFollowDate || "",
    branch: storedData?.branch || "",
    person: storedData?.person || "",
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "branch") {
      const persons = branches.filter((b) => b.branchName === value);
      // setFilteredPerson(persons);

      // console.log(filteredPerson);
      if (persons) {
        console.log(persons);
        const branchId = persons[0]._id;
        // console.log(`${serverUrl}/staff/${branchId}`);
        axios
          .get(`${serverUrl}/staff/${persons[0]._id}`, {
            withCredentials: true,
          })
          .then((s) => {
            console.log(s.data);
            setFilteredPerson(s.data.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  // Expose getData method to parent via ref
  useImperativeHandle(ref, () => ({
    getData: () => {
      const newErrors = {};
      if (!isMobile) {
        if (!data.conversation) newErrors.conversation = "Required";
        if (!data.nextFollowDate) newErrors.nextFollowDate = "Required";
        if (!data.branch) newErrors.branch = "Required";
        if (!data.person) newErrors.person = "Required";
      }
      setErrors(newErrors);
      if (Object.keys(newErrors).length > 0) return null;
      return data;
    },
  }));

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Individual Paper
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Conversation"
          name="conversation"
          value={data.conversation}
          onChange={handleChange}
          multiline
          rows={4}
          error={!!errors.conversation}
          helperText={errors.conversation}
        />

        <TextField
          label="Next Follow Date & Time"
          type="datetime-local"
          name="nextFollowDate"
          value={data.nextFollowDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          error={!!errors.nextFollowDate}
          helperText={errors.nextFollowDate}
        />

        <FormControl fullWidth error={!!errors.branch}>
          <InputLabel>Assign Branch</InputLabel>
          <Select value={data.branch} name="branch" onChange={handleChange}>
            {[...new Set(branches.map((b) => b.branchName))].map((branch) => (
              <MenuItem key={branch} value={branch}>
                {branch}
              </MenuItem>
            ))}
          </Select>
          {errors.branch && <FormHelperText>{errors.branch}</FormHelperText>}
        </FormControl>

        <FormControl fullWidth error={!!errors.person}>
          <InputLabel>Assign Person</InputLabel>
          <Select value={data.person} name="person" onChange={handleChange}>
            {filteredPerson.map((p) => (
              <MenuItem key={p._id} value={p.name}>
                {p.name}
              </MenuItem>
            ))}
          </Select>
          {errors.person && <FormHelperText>{errors.person}</FormHelperText>}
        </FormControl>
      </Box>
    </Paper>
  );
});

export default React.memo(IndividualPaperForm);
