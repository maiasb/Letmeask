import { createContext, ReactNode, useState, useEffect } from "react";
import { auth, firebase } from "../services/firebase";

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

type AuthContextProviderProps = {
    children: ReactNode;
}

// CONTEXT EM UMA VARIÁVEL
// NOS PARÂMETROS DEVE SER COLOCADO O INICIO DO VALOR. NESTE CASO, OBJETO
// AS ANY IGNORA A TIPAGEM
export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider(props: AuthContextProviderProps) {
    // CRIAÇÃO DE ESTADO PARA O USUÁRIO
    const [user, setUser] = useState<User>();

    // USEEFFECT DISPARA FUNÇÃO QUANDO HOUVER MUDANÇAS NA INFORMAÇÃO PASSADA NO ARRAY
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
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

        return () => {
            unsubscribe();
        }
    }, [])

    // LOGIN COM UM POPUP DO GOOGLE
    async function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();

        // RESULT ESPERA RESPOSTA DE LOGIN COM POPUP DO GOOGLE
        const result = await auth.signInWithPopup(provider);

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
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            {props.children}
        </AuthContext.Provider>
    );
}