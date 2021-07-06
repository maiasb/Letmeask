// LIB E FUNÇÕES PRA POSSIBILITAR O ROTEAMENTO DA APLICAÇÃO 
import { BrowserRouter, Route } from 'react-router-dom';

// IMPORTAÇÃO DOS COMPONENTES
import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';


import { AuthContextProvider } from './contexts/AuthContext'


function App() {


  return (
    // TAG COM A LIB PARA AS ROTAS
    <BrowserRouter>
      <AuthContextProvider>
        {/* ROTAS E SEUS COMPONENTES */}
        <Route path="/" exact component={Home} />
        <Route path="/rooms/new" component={NewRoom} />
      </AuthContextProvider>
    </BrowserRouter>
  )
}

export default App;
