import "./App.css";
import MainContainer from "./components/MainContainer";
import { VesselProvider } from "./context/vessel-context";

function App() {
  return (
    <div className="App">
      <VesselProvider>
        <MainContainer />
      </VesselProvider>
    </div>
  );
}

export default App;
