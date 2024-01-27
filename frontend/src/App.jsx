import {BrowserRouter,Route,Routes} from "react-router-dom";
import HomeAdmin from "./Pages/HomeAdmin";
function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomeAdmin/>} />
    </Routes>
    
    
    
    </BrowserRouter>

    
    </>
  )
}

export default App
