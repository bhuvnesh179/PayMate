import { Suspense } from "react"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import {Signup} from "./pages/Singup"
import {Signin} from "./pages/Singin"
import {Dashboard} from "./pages/Dashboard"
import { SendMoney } from "./pages/SendMoney"
import { Me } from "./pages/Me"

function App() {

  return (
    <>
    
    <BrowserRouter>
    <Suspense fallback={<div>Loading....</div>}>
    <Routes>
      <Route path="/" element={<Me/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/signin" element={<Signin/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/send" element={<SendMoney/>} />
    </Routes>
    </Suspense>

    </BrowserRouter>
    </>
  )
}

export default App
