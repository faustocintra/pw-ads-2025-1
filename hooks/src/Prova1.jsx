import React from 'react'

function Prova1() {
	return (<main>
		<h1>Cálculo de descontos</h1>

		<div id="container">
			<div className="input-set">
				<label>
					<span>Preço cheio</span><br />
					<input name="preco" type="number" />
				</label>
			</div>

			<div className="input-set">
				<label>
					<span>Desconto (%)</span><br />
					<input name="desconto" type="number" />
				</label>
			</div>

			<div className="result">
				<div>Preço com desconto: </div>
				<div>Classe: </div> 
			</div>
		</div>
	</main>) 
    function Form(){
        const[preco,setPreco] = useState(0);
        const[desconto,setDesconto] = useState(0);
    //funcao declara os imputs com inicialização em 0 
        let resultado = preco - desconto
        console.count ('Atualizou')
       
     const[descNegocio,setDescNegocio] = useState('')
     const[descPromo,setDescPromo] = useState('')
     const[descliqui,setDescliqui] = useState('')
     let descontado = 
    }
     function Modifica(){
        return<>
        <div>
            <label>
            <input onChange={event => setPreco(event.target.value) } />
            </label>
            <label>
            <input onChange={event => setDesconto(event.target.value) } />
            </label>
        </div>
        <div>{resultado}</div>
        </> 
     }
   
    }
export default Prova1
