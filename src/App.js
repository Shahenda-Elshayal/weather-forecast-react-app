import './App.css';
import Weather from './components/Weather';

function App() {
  return (
    <div className="App" style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Weather />
    </div>
  )
}

export default App;
