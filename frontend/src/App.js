
import './App.css';
import Footer from './components/Footer/footer';
import Signin from './components/Auth/signin';
import Signup from './components/Auth/signup';
import { Route, Switch } from 'react-router-dom'

function App() {
  return (
    <div className="App">
       <Switch>
            <Route path='/signup' component={Signup}/>
            <Route path='/' exact component={Signin}/>
        </Switch>
      <Footer/>
    </div>
  );
}

export default App;
