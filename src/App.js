import './App.css';
import Arg from './components/Arg';
import Chart from './components/Chart'

function App() {
  return (
    <div>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
        <Arg />
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
        <Chart />
      </div>
    </div>
  );
}

export default App
