import React, { useState } from 'react'

function Greeting({Prova1 = ''}) { //Buscando no LocalStorage e utilizando o Lazyinitializer
    const [preco, setPreco] = React.useState(
    () => window.localStorage.getItem('preco') ?? preco
    )
    const [count, setCount] = React.useState(0)
    React.useEffect(() => {
        window.localStorage.setItem('preco', preco)
        console.count('Atualizou o localStorage')
      }, [preco])
}
function Prova1() {  
    const [preco, setPreco] =
    useState(' ');
    const [desconto, setDesconto] = 
    useState(' ');

    const precoFinal = preco && desconto ? preco - (preco * (desconto/100)) : ' ';
    const classe = desconto 
    ? desconto <= 150 
    ? 'desconto negocial'
    : desconto > 151 <= 50 
    ? 'desconto promocional'
    : 'desconto de liquidação'
    : '';

	return (<main> 
		<h1>Cálculo de descontos</h1> 
		<div id="container">
			<div className="input-set">
				<label>
					<span>Preço cheio</span><br />
					<input name="preco" type="number" 
                  //Preço inicial
                  value={preco} onChange={(e) => setPreco(parseFloat(e.target.value) || '')}/>
				</label>
			</div>

			<div className="input-set">
				<label>
					<span>Desconto (%)</span><br />
					<input name="desconto" type="number" 
                    //Calculando o desconto
                    value={desconto} onChange={(e) => setDesconto(parseFloat(e.target.value) || '')}/>
				</label>
			</div>

			<div className="result">
				<div>Preço com desconto: {precoFinal ? precoFinal.toFixed(2) : '-'}</div>
				<div>Classe: {classe}</div>
			</div>
		</div>
	</main>)
}

return <Greeting />

export default Prova1


