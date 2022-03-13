import { Box, Divider, IconButton, Paper, Slider, Stack } from "@mui/material";
import {
  Pause as PauseIcon,
  PlayArrow as PlayArrowIcon,
  Replay as ReplayIcon,
} from "@mui/icons-material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { VesselContext } from "../context/vessel-context";

import Clock from "./Clock";

const RoutePlayer = () => {
  const [paused, setPaused] = useState(true);
  const [playSpeed, setPlaySpeed] = useState(10);
  const { currentTrackStep, setCurrentTrackStep, currentVesselRoute } =
    useContext(VesselContext);

  let timePoints = currentVesselRoute?.map((timePoint) =>
    new Date(timePoint.TIMESTAMP).getTime()
  );

  const [time, setTime] = useState(() => timePoints[0]);

  useEffect(() => {
    setTime(timePoints[0]);
  }, [currentVesselRoute]);

  useEffect(() => {
    if (!paused) {
      if (timePoints[currentTrackStep + 1] === time) {
        if (currentTrackStep + 1 === timePoints.length - 1) {
          setPaused(true);
        }
        setCurrentTrackStep((currentTrackStep) => currentTrackStep + 1);
      }
    }
  }, [time, timePoints, currentTrackStep, paused]);

  const intervalRef = useRef();

  useEffect(() => {
    if (!paused) {
      intervalRef.current = setInterval(() => {
        setTime((previousTime) => previousTime + 1000);
      }, playSpeed);
    }
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [paused, playSpeed]);

  const handleSliderChange = (event, value) => {
    setTime(timePoints[value]);
    setCurrentTrackStep(value);
    setPaused(true);
  };

  const handlePauseClick = () => {
    setPaused((oldValue) => !oldValue);
  };

  const handleReplayClick = () => {
    setTime(timePoints[0]);
    setCurrentTrackStep(0);
    setPaused(true);
  };

  const handleSpeedChange = (event) => {
    setPlaySpeed(event.target.value);
  };

  return timePoints.length !== 0 ? (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        display: "flex",
        justifyContent: "center",
        left: 0,
        right: 0,
      }}
    >
      <Paper
        sx={{
          display: "flex",
          padding: 4,
          margin: 5,
          backgroundColor: "white",
        }}
      >
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
        >
          {currentTrackStep === timePoints.length - 1 ? (
            <IconButton
              onClick={handleReplayClick}
              color="primary"
              size="large"
            >
              <ReplayIcon fontSize="inherit" />
            </IconButton>
          ) : (
            <IconButton onClick={handlePauseClick} color="primary" size="large">
              {paused ? (
                <PlayArrowIcon fontSize="inherit" />
              ) : (
                <PauseIcon fontSize="inherit" />
              )}
            </IconButton>
          )}
          <Box sx={{ width: "15vw" }}>
            <Slider
              aria-label="Small steps"
              value={currentTrackStep}
              onChange={handleSliderChange}
              marks
              min={0}
              max={timePoints.length - 1}
              valueLabelDisplay="on"
            />
            <label>Play speed:</label>
            <select value={playSpeed} onChange={handleSpeedChange}>
              <option value={1000}>Realtime</option>
              <option value={10}>Speed 1</option>
              <option value={2}>Speed 2</option>
            </select>
          </Box>
          <Box>
            <Clock time={time} />
          </Box>
        </Stack>
      </Paper>
    </Box>
  ) : null;
};

export default RoutePlayer;
