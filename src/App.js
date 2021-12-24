import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './Components/Login'
import success from './Components/Success';
import Welcome from './Components/Welcome';
import DirectLogin from './Components/DirectLogin';
import ApplyLoan from './Components/ApplyLoan';
import UpdateUser from './Components/UpdateDetails';
import UpdatedDetails from './Components/UpdatedDetails';
import LoanDetaiils from './Components/Displaydetails';
import Home from './Components/Home';
import Registration from './Components/Registration';
function App() {
  return (
    <div>
    <Home/>
      <Router>
          <Route exact path='/' component={Welcome} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/success" component={success} />
          <Route exact path="/directlogin" component={DirectLogin} />
          <Route exact path="/applyloan" component={ApplyLoan} />
          <Route exact path="/updateuser" component={UpdateUser} />
          <Route exact path="/UpdatedDetails" component={UpdatedDetails} />
          <Route exact path="/register" component={Registration} />
          <Route exact path="/displaydetails" component={LoanDetaiils} />
      </Router>
    </div>
  );
}
export default App;
