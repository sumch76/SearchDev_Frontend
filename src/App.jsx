import { BrowserRouter,Routes,Route } from "react-router-dom"
import Body from "./components/Body";
import Login from "./components/Login";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Signup from "./components/Signup";
import Hero from "./components/Hero";
function App() {

  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element={<Body />} >
  <Route path="/" element={<Hero/>}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/signup"element={<Signup />}/>
      <Route path="/feed" element={<Feed/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/connections" element={<Connections/>}/>
      <Route path="/requests" element={<Requests/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
