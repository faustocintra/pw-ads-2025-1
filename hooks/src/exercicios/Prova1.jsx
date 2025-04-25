import * as React from 'react'

function Prova1() {

    //cria a possibilidade de armazenar o preço e o desconto
	//quando a página carrega, vê se tem valores salvos salvos para pegar no localStorage ou coloca 0 como valor inicial
	const [preco, setPreco] = useState(() => {
		const valorSalvo = localStorage.getItem('preço')
		return valorSalvo ? Number(valorSalvo) : 0
	})

	const [desconto, setDesconto] = useState(() => {
		const valorSalvo = localStorage.getItem('desconto')
		return valorSalvo ? Number(valorSalvo) : 0
	})


	//função que lida com a mudança nos inputs (preço ou desconto)
	function handleChange(e) {
		const { name, value } = e.target
		const numero = Number(value)

        // Verifica se é o input do preço ou do desconto e atualiza o estado correto
		if (name === 'preco') {
			setPreco(numero)
		} else if (name === 'desconto') {
			setDesconto(numero)
		}
	}

    //salva no localStorage o preço e o desconto, quando algum deles mudar
	useEffect(() => {
		localStorage.setItem('preco', preco)
	}, [preco])

	useEffect(() => {
		localStorage.setItem('desconto', desconto)
	}, [desconto])

    //calcula o preço com desconto
	function calcularPrecoComDesconto() {
		return preco - (preco * desconto) / 100
	}

    //determina o tipo de desconto, com base no valor do desconto
	function determinarClasseDesconto() {
		if (desconto <= 15) {
			return 'Desconto negocial'
		} else if (desconto > 15 && desconto <= 50) {
			return 'Desconto promocional'
		} else {
			return 'Desconto de liquidação'
		}
	}

    // Variáveis que armazenam os valores calculados do preço com desconto e da classe de desconto
	const precoComDesconto = calcularPrecoComDesconto()
	const classeDesconto = determinarClasseDesconto()

	return (
		<main>
			<h1>Cálculo de descontos</h1>

			<div id="container">
				<div className="input-set">
					<label>
						<span>Preço cheio</span><br />
						<input
							name="preco"
							type="number"
							value={preco}
							onChange={handleChange} //chama a função quando o valor do input mudar
						/>
					</label>
				</div>

				<div className="input-set">
					<label>
						<span>Desconto (%)</span><br />
						<input
							name="desconto"
							type="number"
							value={desconto}
							onChange={handleChange}//chama a função quando o valor do input mudar
						/>
					</label>
				</div>

				<div className="result">
					<div>Preço com desconto: R$ {precoComDesconto.toFixed(2)}</div>
					<div>Classe: {classeDesconto}</div>
				</div>
			</div>
		</main>
	)
}

export default Prova1