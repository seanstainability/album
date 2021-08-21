import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import MainPage from "./pages/MainPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { Switch, Route } from "react-router-dom";
import ToolBar from "./components/ToolBar";

function App() {
  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
        <ToolBar/>
        <Switch>
            <Route path='/' exact component={MainPage} />
            <Route path='/auth/register' exact component={RegisterPage} />
            <Route path='/auth/login' exact component={LoginPage} />
        </Switch>
        <ToastContainer/>
    </div>
  );
}

export default App;
