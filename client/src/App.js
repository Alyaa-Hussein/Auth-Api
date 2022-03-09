
import { Switch, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage'
import UsersPage from './pages/UsersPage';
import RolesListPage from './pages/RoleListPage';
import Layout from './components/Layout/Layout'
import DevelopementPage from './pages/DevelopmentPage';
import TestingPage from './pages/Testing';


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
      <Route path='/users'>
        <UsersPage/>
      </Route>
      <Route path='/roles'>
        <RolesListPage/>
      </Route>
      <Route path='/development'>
        <DevelopementPage/>
      </Route>
      <Route path='/testing'>
        <TestingPage/>
      </Route>
    </Switch>
    
    </Layout>
  );
}

export default App;
