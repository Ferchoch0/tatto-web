import { useState } from "react";
import StartScreen from "./components/StartScreen";
import Navbar from "./components/Navbar";
import TurnForm from "./components/TurnForm";
import Footer from "./components/Footer";

{/* Estilos */}
import "./styles/App.css";
import "./styles/icon.css";
import "./styles/global.css";

function App() {
  const [started, setStarted] = useState(false);

  return (
    <div className="app-container">
      {!started ? (
        <StartScreen onStart={() => setStarted(true)} />
      ) : (
        <div id="global">
          <Navbar />
          <main className="global-form">
            <TurnForm />
          </main>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
