import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import Exercicio01 from './exercicios/01'
import Exercicio02 from './exercicios/02'
import Exercicio03 from './exercicios/03'

function App() {
  return (
    <>
      <h1>React Hooks</h1>

      <BrowserRouter>
        <ul>
          <li> <Link to="/">Início</Link> </li>
          <li> <Link to="/01">Exercício 01</Link> </li>
          <li> <Link to="/02">Exercício 02</Link> </li>
          <li> <Link to="/03">Exercício 03</Link> </li>
        </ul>
        
        <hr />

        <Routes>
          <Route path="/" element={
            <p>Clique em um dos <em>links</em> acima para exibir um exercício.</p>
          } />

          <Route path="/01" element={ <Exercicio01 /> } />
          <Route path="/02" element={ <Exercicio02 /> } />
          <Route path="/03" element={ <Exercicio03 /> } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
