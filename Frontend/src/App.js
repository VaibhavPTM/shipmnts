import logo from "./logo.svg";
import "./App.css";
import Navigation from "./components/Navigation";
import UploadForm from "./components/Form";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ViewTable from "./components/ViewTable";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="App">
        <ToastContainer />
        <Navigation />
        <Routes>
          <Route path="/" element={<UploadForm />} />
          <Route path="/view" element={<ViewTable />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
