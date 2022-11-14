import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import RouteContainer from './RouteContainer';

function App() {
  return (
    <div className="App">
      <Router>
        <RouteContainer/>
      </Router>
    </div>
  );
}

export default App;