import {BrowserRouter,Route,Routes} from "react-router-dom";
import HomeAdmin from "./Pages/HomeAdmin";
import PageNotFound from "./Pages/404";
function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomeAdmin/>} />
      <Route path="/404" element={<PageNotFound/>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
