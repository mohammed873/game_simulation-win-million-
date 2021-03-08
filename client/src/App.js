import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AdminPanel from "./Components/admin_panel.jsx";
import LoginForm from "./Components/adminLogin.jsx";
import Question from "./Components/add_question.jsx";
import Question_show from "./Components/question.jsx";
import Validate from "./Components/validate_acounts.jsx";
import Home from "./Components/home";
import Radit from "./Components/dashboard.jsx";
import ParticiapntSignup from "./Components/participantSignup";
import Lobby from "./Components/lobby.jsx";
import Winner from "./Components/Winer.jsx";
import NotFound from "./Components/notFound.jsx";
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/admin" exact component={LoginForm} />
          <Route path="/admin_panel" exact component={AdminPanel} />
          <Route path="/question" exact component={Question} />
          <Route path="/show_question" exact component={Question_show}></Route>
          <Route path="/validate" exact component={Validate} />
          <Route path="/participant" exact component={Radit} />
          <Route path="/signup" exact component={ParticiapntSignup} />
          <Route path="/lobby" exact component={Lobby} />
          <Route path="/winner" exact component={Winner} />
          <Route path="/*" exact component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
