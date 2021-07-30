// IMPORTA LIB CONTENDO TODOS OS ATRIBUTOS QUE UM BOTÃO PODE TER
import { ButtonHTMLAttributes } from 'react';
import '../styles/button.scss'

// TYPE RECEBE TODOS OS PARÂMETROS QUE UM BOTÃO PODE TER
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean
};

// FUNÇÃO DO COMPONENTE BUTTON
// ... É TODO O RESTO DA PROPRIEDADE
export function Button({ isOutlined = false, ...props }: ButtonProps) {
    return (
        // {...props} RECEBE TODAS AS PROPRIEDADES ENVIADAS PELO PARÂMETRO
        <button
            className={`button ${isOutlined ? 'outlined' : ''}`}
            {...props} />
    )
}
