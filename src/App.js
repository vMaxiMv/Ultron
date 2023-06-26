import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Form from "./components/form/form";
import Nav from "./components/nav/nav";


function App() {
  return(
  <BrowserRouter>

    <Routes>
      <Route path={""} element={<Nav/>}/>
      <Route path="/form" element={<Form />} />

    </Routes>
  </BrowserRouter>
)
}

export default App;
