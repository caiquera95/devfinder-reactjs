import Home from "./Page/Home";
import {ToastContainer} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <ToastContainer
        theme="dark"
        // style={{ width: "200px" }}
      />
      <Home />
    </div>
  );
}

export default App;
