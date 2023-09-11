import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Form_login from "./components/AuthForms/form_login/form_login";
import Nav from "./components/nav/nav";
import Profile from "./components/profile/profile";
import FormRegistration from "./components/AuthForms/form_registration/form_registration";
import Test from "./components/test/test";
import HomeInfPage from "./components/nav/HomeInfPage";


function App() {
  return(
  <BrowserRouter>
<div className="wrapper">
  <div className="container">
    <Routes>
      <Route path={""} element={<Nav/>}/>
      <Route path="/home" element={<HomeInfPage/>}/>
      <Route path="/login" element={<Form_login />} />
      <Route path="/registration" element={<FormRegistration />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/test" element={<Test />} />
      {/*<Route path="/barChart" element={<CommonCharts />} />*/}
    </Routes>
  </div>
</div>
  </BrowserRouter>
)
}

export default App;
