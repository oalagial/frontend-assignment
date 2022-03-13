import React, { useContext } from "react";
import { VesselContext } from "../context/vessel-context";
import Map from "./Map";
import Search from "./Search";
import RoutePlayer from "./RoutePlayer";

const MainContainer = () => {
  const { currentVesselRoute } = useContext(VesselContext);

  return (
    <>
      <Map />
      <Search />
      {currentVesselRoute && <RoutePlayer />}
    </>
  );
};

export default MainContainer;
