
import { Switch, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage'
import Layout from './components/Layout/Layout'
import RolesListPage from './pages/RolesListPage';
import AddNewRolePage from './pages/AddNewRolePage';
import UpdateRolePage from './pages/UpdateRolePage';


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
      <Route path = '/roles-list'>
        <RolesListPage/>
      </Route>
      <Route path = '/add-new-role'>
        <AddNewRolePage/>
      </Route>
       <Route path = '/:id/:name/:description'>
         <UpdateRolePage/>
      </Route>
    </Switch>
    
    </Layout>
  );
}

export default App;
