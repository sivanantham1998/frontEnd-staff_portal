import React, { useRef, useState, useEffect } from "react";
import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import Loader from "../Loader";
import LeadForm from "./LeadForm";
import IndividualPaperForm from "./IndividualPaperForm";
import EducationForm from "./EducationForm";
import { useServerContext } from "../ApiContext/Server";
import axios from "axios";
import { toast, ToastContainer, Bounce } from "react-toastify";

export default function Lead() {
  const [isLoading, setLoading] = useState(true);
  const serverUrl = useServerContext();

  const leadRef = useRef();
  const paperRef = useRef();
  const eduRef = useRef();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <Loader size={150} arcWidth={8} />;

  const handleSubmitAll = async () => {
    try {
      const leadData = leadRef.current?.getData();
      if (!leadData) return;

      let payload = {
        ...leadData,
        deviceType: isMobile ? "mobile" : "desktop",
      };

      if (!isMobile) {
        const paperData = paperRef.current?.getData();
        const eduData = eduRef.current?.getData();
        if (!paperData || !eduData) return;
        payload = {
          ...leadData,
          ...paperData,
          ...eduData,
          deviceType: "desktop",
        };
      }

      const res = await axios.post(`${serverUrl}/admin/postLead`, payload, {
        withCredentials: true,
      });

      alert("Data saved successfully!");
      const leadPerson = res.data.data.person;
      toast.success("Lead sent to:" + leadPerson, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      // console.log(res.data.person);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (err) {
      console.error("Error saving data:", err.response?.data || err.message);
      alert("Error saving data. Check console.");
      toast.error("Check all details", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: 1, mt: 2 }}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 4,
        }}
      >
        <Box sx={{ gridRow: { md: "span 2" } }}>
          <LeadForm ref={leadRef} />
        </Box>

        {!isMobile && (
          <>
            <IndividualPaperForm ref={paperRef} />
            <EducationForm ref={eduRef} />
          </>
        )}
      </Box>

      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Button
          type="button"
          variant="contained"
          size="large"
          onClick={handleSubmitAll}
        >
          {isMobile ? "Submit Lead Form" : "Submit All Forms"}
        </Button>
      </Box>
    </Box>
  );
}
