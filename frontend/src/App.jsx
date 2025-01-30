import Home from "./components/Home"
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import userAuthContext from "./context/authContext"
import { useContext } from "react"
import PageNotFound from "./pages/PageNotFound"

function App() {
  const {isLogin} = useContext(userAuthContext)
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}  />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin"  element={isLogin?<Home/> : <Signin/> }/>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
