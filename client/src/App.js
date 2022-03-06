
import { Switch, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage'
import Layout from './components/Layout/Layout'


function App() {
  return (
    <Layout>
      <Switch>
      <Route path='/' exact>
        <AuthPage/>
      </Route>
      <Route path='/auth'> 
        <AuthPage/>
      </Route>
      <Route path='/home'>
        <HomePage/>
      </Route>
    </Switch>
    
    </Layout>
  );
}

export default App;
