// LIB PARA NAVEGAÇÃO NO CLICK DO BUTTON
import { useHistory } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'

import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth';

import '../styles/auth.scss'
import { FormEvent } from 'react';
import { useState } from 'react';
import { database } from '../services/firebase';

export function Home() {
    // ADICIONANDO HOOK DE ROTA NA CONSTANTE
    const history = useHistory();
    const { user, signInWithGoogle } = useAuth();
    const [roomCode, setRoomCode] = useState('');

    // CRIAÇÃO DE FUNÇÃO PARA REDIRECIONAMENTO DA ROTA
    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle();
        }

        // REDIRECIONA PARA A ROTA
        history.push("/rooms/new");
    };

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if (roomCode.trim() === '') {
            return;
        }

        const roomRef = await database.ref(`/rooms/${roomCode}`).get();

        if (!roomRef.exists()) {
            alert('Room does not exists.');
            return;
        }

        if (roomRef.val().endedAt) {
            alert('Room already closed.');
            return;
        }

        history.push(`/rooms/${roomCode}`)
    }

    return (
        <div id="page-auth">
            <aside>
                {/* CHAVE EM VOLTA, POIS É UMA VARIÁVEL JAVASCRIPT */}
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>

            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />

                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Logo do Google" />
                        Crie sua sala com o Google
                    </button>

                    <div className="separator">ou entre em uma sala</div>

                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}