import React from 'react'

function Prova1() {
    // declaração das variaveis, que ficam armazenadas no localStorage
    // utilizando lazzy initializer
    const[preco, setPreco] = useState(
        () => window.localStorage.getItem('preco') || 0
    )
    const[desconto, setDesconto] = useState(
        () => window.localStorage.getItem('desconto') || 0
    )


    // armazenada o valor de 'preco', 'desconto', para
    // caso a página seja fechada nao perder os valores
    React.useEffect (() =>{
        window.localStorage.setItem('preco', preco)
        window.localStorage.setItem('desconto', desconto)
    }, [preco, desconto] ) 

    // atualiza o valor das variaveis de acordo com suas modificações
    function handleChange(event){
        const {name, value} = event.target
        if(name === 'preco'){
            setPreco(value)
        }
        else if(name === 'desconto'){
            setDesconto(value)
        }
    }

    // função para calcular o preco com desconto
    function precoDesconto(preco, desconto){
        return preco - (preco * (desconto/100))
    }

    // função que retorna a classe que o desconto de encontra
    function percentualDesc(descontoperc){
        if(descontoperc <= 15){
            return "Desconto negocial"
        }
        else if(descontoperc > 15 && descontoperc <= 50){
            return "Desconto promocional"
        }
        else{
            return "Desconto de liquidação"
        }
    }

    // variaveis comuns que recebem os valores retornados
    const comDesconto = precoDesconto(preco, desconto)
    const classeDesconto =  percentualDesc(desconto)
    

	return (<main>
		<h1>Cálculo de descontos</h1>

		<div id="container">
			<div className="input-set">
				<label>
					<span>Preço cheio</span><br />
					<input name="preco" type="number" value={preco} onChange={handleChange}/>
				</label>
			</div>

			<div className="input-set">
				<label>
					<span>Desconto (%)</span><br />
					<input name="desconto" type="number" value={desconto} onChange={handleChange}/>
				</label>
			</div>

			<div className="result">
				<div>Preço com desconto: {comDesconto} </div>
				<div>Classe: {classeDesconto} </div>
			</div>
		</div>
	</main>)
}

export default Prova1


