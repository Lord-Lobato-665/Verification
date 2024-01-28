import {BrowserRouter,Route,Routes} from "react-router-dom";
import HomeAdmin from "./Pages/HomeAdmin";
import ResourcesAdmin from "./Pages/ResourcesAdmin"
function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomeAdmin/>} />
      <Route path="/resources" element={<ResourcesAdmin/>} />

    </Routes>
    
    
    
    </BrowserRouter>

    
    </>
  )
}

export default App
