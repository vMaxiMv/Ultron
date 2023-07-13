import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Form_login from "./components/form_login/form_login";
import Nav from "./components/nav/nav";
import Profile from "./components/profile/profile";
import Test from "./components/test/test";
import FormRegistration from "./components/form_registration/form_registration";


function App() {
  return(
  <BrowserRouter>
<div className="wrapper">
  <div className="container">
    <Routes>
      <Route path={""} element={<Nav/>}/>
      <Route path="/login" element={<Form_login />} />
      <Route path="/registration" element={<FormRegistration />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  </div>
</div>
  </BrowserRouter>
)
}

export default App;
