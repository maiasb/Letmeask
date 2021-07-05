// IMPORTA LIB CONTENDO TODOS OS ATRIBUTOS QUE UM BOTÃO PODE TER
import { ButtonHTMLAttributes } from 'react';
import '../styles/button.scss'

// TYPE RECEBE TODOS OS PARÂMETROS QUE UM BOTÃO PODE TER
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

// FUNÇÃO DO COMPONENTE BUTTON
export function Button(props: ButtonProps) {
    return (
        // {...props} RECEBE TODAS AS PROPRIEDADES ENVIADAS PELO PARÂMETRO
        <button className="button" {...props} />
    )
}
