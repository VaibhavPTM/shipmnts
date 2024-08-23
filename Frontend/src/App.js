import logo from "./logo.svg";
import "./App.css";
import Navigation from "./components/Navigation";
import UploadForm from "./components/Form";

function App() {
  return (
    <div className="App">
      <Navigation />
      <UploadForm />
    </div>
  );
}

export default App;
