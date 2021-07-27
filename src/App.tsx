// LIB E FUNÇÕES PRA POSSIBILITAR O ROTEAMENTO DA APLICAÇÃO 
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// IMPORTAÇÃO DOS COMPONENTES
import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';


import { AuthContextProvider } from './contexts/AuthContext'
import { Room } from './pages/Room';


function App() {


  return (
    // TAG COM A LIB PARA AS ROTAS
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          {/* ROTAS E SEUS COMPONENTES */}
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  )
}

export default App;
