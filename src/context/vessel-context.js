import { createContext, useState } from "react";
import { useQuery } from "react-query";
import { apiKeys } from "../config";

const VesselContext = createContext();

const VesselProvider = ({ children }) => {
  const [currentVesselRoute, setCurrentVesselRoute] = useState();
  const [currentTrackStep, setCurrentTrackStep] = useState(0);
  const [fetchErrors, setfetchErrors] = useState();
  const [coordinates, setCoordinates] = useState([]);
  const [searchParameters, setSearchParameters] = useState();

  const onSuccess = (data) => {
    if (!data.errors) {
      setCurrentVesselRoute(data);
      setCoordinates(
        data?.map((i) => ({
          lat: parseFloat(i.LAT),
          lng: parseFloat(i.LON),
        }))
      );
      setfetchErrors(undefined);
    } else {
      setfetchErrors(data.errors);
      setCurrentVesselRoute(undefined);
      setCoordinates(undefined);
    }
  };

  const onError = (error) => {
    console.log(error)
  }

  const fetchVesselRoute = async () => {
    const res = await fetch(
      `https://services.marinetraffic.com/api/exportvesseltrack/${apiKeys.marineTraficApiKey}/v:3/days:${searchParameters.days}/mmsi:${searchParameters.mmsi}/protocol:jsono`
    );
    return res.json();
  };

  useQuery(["vesselRoute", searchParameters], fetchVesselRoute, {
    onSuccess,
    onError,
    enabled: !!searchParameters
  });

  const state = {
    currentVesselRoute,
    setCurrentVesselRoute,
    currentTrackStep,
    setCurrentTrackStep,
    setSearchParameters,
    fetchErrors,
    coordinates,
  };

  return (
    <VesselContext.Provider value={state}>{children}</VesselContext.Provider>
  );
};

export { VesselContext, VesselProvider };
