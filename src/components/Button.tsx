// Lib para utilizar os estados dos componentes
import { useState } from "react"

// FUNÇÃO DO COMPONENTE BUTTON
export function Button() {
    const [counter, setCounter] = useState(0)

    function increment() {
        setCounter(counter + 1)
        console.log(counter)
    }

    return (
        // CLICK CHAMA A FUNÇÃO INCREMENT / COUNTER SENDO MOSTRADO DENTRO DO BOTÃO
        <button onClick={increment}>{counter}</button>
    )
}
