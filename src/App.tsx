// LIB PARA O COMPARTILHAMENTO DE INFORMAÇÕES ENTRE OS COMPONENTES
import { createContext, useState, useEffect } from 'react'

// LIB E FUNÇÕES PRA POSSIBILITAR O ROTEAMENTO DA APLICAÇÃO 
import { BrowserRouter, Route } from 'react-router-dom';

// IMPORTAÇÃO DOS COMPONENTES
import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { firebase, auth } from './services/firebase'

type User = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: User | undefined;
  // FUNÇÃO ASYNC RETORNA PROMISSE
  signInWithGoogle: () => Promise<void>;
}

// CONTEXT EM UMA VARIÁVEL
// NOS PARÂMETROS DEVE SER COLOCADO O INICIO DO VALOR. NESTE CASO, OBJETO
// AS ANY IGNORA A TIPAGEM
export const AuthContext = createContext({} as AuthContextType)

function App() {
  // CRIAÇÃO DE ESTADO PARA O USUÁRIO
  const [user, setUser] = useState<User>();

  // USEEFFECT DISPARA FUNÇÃO QUANDO HOUVER MUDANÇAS NA INFORMAÇÃO PASSADA NO ARRAY
  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        // SE O USUÁRIO NÃO POSSUIR NOME OU FOTO, RETORNA ERRO
        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.');
        }

        // FUNÇÃO PARA CRIAR USER
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    });
  }, [])

  // LOGIN COM UM POPUP DO GOOGLE
  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    // RESULT ESPERA RESPOSTA DE LOGIN COM POPUP DO GOOGLE
    const result = await auth().signInWithPopup(provider);

    // SE POSSUIR O USUÁRIO NA AUTENTICAÇÃO
    if (result.user) {
      const { displayName, photoURL, uid } = result.user;

      // SE O USUÁRIO NÃO POSSUIR NOME OU FOTO, RETORNA ERRO
      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account.');
      }

      // FUNÇÃO PARA CRIAR USER
      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }

  return (
    // TAG COM A LIB PARA AS ROTAS
    <BrowserRouter>
      <AuthContext.Provider value={{ user, signInWithGoogle }}>
        {/* ROTAS E SEUS COMPONENTES */}
        <Route path="/" exact component={Home} />
        <Route path="/rooms/new" component={NewRoom} />
      </AuthContext.Provider>
    </BrowserRouter>
  )
}

export default App;
