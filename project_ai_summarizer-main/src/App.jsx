import Front from "./components/Front";
import Back from "./components/Back";

import "./App.css";

const App = () => {
  return (
    <main>
      <div className='main'>
        <div className='gradient' />
      </div>

      <div className='app' style={{ marginBottom: '170px' }}>
        <Front />
        <Back />
      </div>
    </main>
  );
};

export default App;
