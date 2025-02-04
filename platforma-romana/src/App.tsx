import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import Navbar from "./components/Navbar.tsx";
import Home from "./pages/Home.tsx";
import Create from "./pages/Create.tsx";
import CreateLesson from "./pages/CreateLesson.tsx";
import CreateTest from "./pages/CreateTest.tsx";
import LessonDetailed from "./components/LessonDetailed.tsx";
import TestDetailed from "./components/TestDetailed.tsx";
import NotFound from "./pages/NotFound.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import Logout from "./pages/Logout.tsx";
import NeedToBeLoggedIn from "./pages/NeedToBeLoggedIn.tsx";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/create" element={<Create/>} />
            <Route path="/createLesson" element={<CreateLesson/>} />
            <Route path="/createTest" element={<CreateTest/>} />
            <Route path="/lessons/:id" element={<LessonDetailed/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/logout" element={<Logout/>} />
            <Route path="/not-allowed" element={<NeedToBeLoggedIn/>} />
            <Route path="/test/:id" element={<TestDetailed/>} />
            <Route path="*" element={<NotFound/>} />
          </Routes> 
        </div>
      </div>
    </Router>
  )
}

export default App
