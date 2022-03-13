import {
    Alert,
    Box,
    Button,
    Paper,
    Stack,
    TextField,
  } from "@mui/material";
  import React, { useContext, useState } from "react";
  import { VesselContext } from "../context/vessel-context";
  
  const Search = () => {
    const { setSearchParameters, fetchErrors, setCurrentTrackStep } =
      useContext(VesselContext);
  
    const [formInput, setFormInput] = useState({
      mmsi: "241486000",
      days: "1",
    });
  
    const handleInputValue = (e) => {
      const { name, value } = e.target;
      setFormInput((oldParameters) => ({
        ...oldParameters,
        [name]: value,
      }));
    };
  
    const handleClickSearch = () => {
      setSearchParameters(formInput);
      setCurrentTrackStep(0);
    };
  
    return (
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          width: "fit-content",
          margin: "auto",
          left: 0,
          right: 0,
        }}
      >
        <Paper
          sx={{
            padding: 4,
            margin: 3,
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {fetchErrors &&
            fetchErrors.map((error) => (
              <Alert sx={{ mb: 3 }} key={error.code} severity="error">
                {error.detail}
              </Alert>
            ))}
          <Stack
            direction="row"
            spacing={2}
          >
            <TextField
              required
              label="MMSI"
              name="mmsi"
              variant="outlined"
              value={formInput.mmsi}
              onChange={handleInputValue}
            />
            <TextField
            required
              label="Days"
              name="days"
              variant="outlined"
              value={formInput.days}
              onChange={handleInputValue}
            />
            <Button variant="contained" onClick={handleClickSearch}>
              Search
            </Button>
          </Stack>
        </Paper>
      </Box>
    );
  };
  
  export default Search;
  