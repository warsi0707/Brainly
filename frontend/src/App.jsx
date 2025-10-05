import Home from "./components/Home"
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import PageNotFound from "./pages/PageNotFound"
import { useContext } from "react"
import AuthContext from "./context/authContext"


function App() {
  const {authenticated} = useContext(AuthContext)
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={authenticated ==true? <Home/>:<Signin/> }  />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin"  element={<Signin/>}/>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
