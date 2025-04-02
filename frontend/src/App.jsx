import Home from "./components/Home"
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import PageNotFound from "./pages/PageNotFound"


function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}  />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin"  element={<Signin/>}/>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
