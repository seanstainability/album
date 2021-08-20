import UploadForm from "./components/UploadForm";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
        <h1>사진첩</h1>
        <UploadForm/>
        <ToastContainer/>
    </>
  );
}

export default App;
