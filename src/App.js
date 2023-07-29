import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Form_login from "./components/form_login/form_login";
import Nav from "./components/nav/nav";
import Profile from "./components/profile/profile";
import FormRegistration from "./components/form_registration/form_registration";
import CommonCharts from "./components/charts/CommonCharts";
import ProfilePrivate from "./components/profile/ProfilePrivate";
import Nana from "./components/test/test";
import Foo from "./components/test/test";


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
      <Route path="/test" element={<Foo />} />
      {/*<Route path="/barChart" element={<CommonCharts />} />*/}
    </Routes>
  </div>
</div>
  </BrowserRouter>
)
}

export default App;
