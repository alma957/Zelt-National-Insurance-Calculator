import "./App.css";
import {NationalInsurance} from "./Forms/nationalInsurance";
import {Box} from "@mui/material";
function App() {
  
  return (
    <Box style={window.screen.width<740 ? {width:window.screen.width*0.9}:{}}>
      <NationalInsurance />
    </Box>
  );
}

export default App;
