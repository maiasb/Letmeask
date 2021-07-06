// LIB E FUNÇÕES PRA POSSIBILITAR O ROTEAMENTO DA APLICAÇÃO 
import { BrowserRouter, Route } from 'react-router-dom';

// IMPORTAÇÃO DOS COMPONENTES
import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';

function App() {
  return (
    // TAG COM A LIB PARA AS ROTAS
    <BrowserRouter>
      {/* ROTAS E SEUS COMPONENTES */}
      <Route path="/" exact component={Home} />
      <Route path="/rooms/new" component={NewRoom} />
    </BrowserRouter>
  )
}

export default App;
