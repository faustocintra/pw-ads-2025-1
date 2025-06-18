import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { parseISO } from 'date-fns'
import { feedbackWait, feedbackNotify, feedbackConfirm } from '../../ui/Feedback'
import { useNavigate, useParams } from 'react-router-dom'
import { useMask } from '@react-input/mask'
import { Checkbox, FormControlLabel } from '@mui/material'

export default function CarsForm() {

  const carsColor = [
    { value: "Amarelo", label: "Amarelo" },
    { value: "Azul", label: "Azul" },
    { value: "Branco", label: "Branco" },
    { value: "Carmim", label: "Carmim" },
    { value: "Ciano", label: "Ciano" },
    { value: "Cinza", label: "Cinza" },
    { value: "Dourado", label: "Dourado" },
    { value: "Marrom", label: "Marrom" },
    { value: "Prata", label: "Prata" },
    { value: "Preto", label: "Preto" },
    { value: "Roxo", label: "Roxo" },
    { value: "Verde", label: "Verde" },
    { value: "Vermelho", label: "Vermelho" },
    { value: "Vinho", label: "Vinho" }
  ]

  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear; year >= 1951; year--) {
    years.push({ value: year, label: year.toString() });
  }


  const platesRef = useMask({
    mask: "aaa-9$99",
    replacement: { 
      'a': /[A-Z]/,      // apenas letras maiúsculas
      '9': /[0-9]/,      // dígitos
      '$': /[A-J0-9]/    // letra de A a J ou dígito
    },
    showMask: false
  })

  // Por padrão, todos os campos começam com uma string vazia como valor.
  // A exceção é o campo birth_date, do tipo data, que, por causa do
  // funcionamento do componente DatePicker, deve começar como null
  const formDefaults = {
    brand: '',
    model: '',
    color: '',
    year_manufacture: '',
    imported: '',
    plates: '',
    selling_price: '',
    selling_date: null
  }

  const navigate = useNavigate()
  const params = useParams()

  // Variáveis de estado
  const [state, setState] = React.useState({
    car: { ...formDefaults },
    formModified: false
  })
  const {
    car,
    formModified
  } = state

  // Se estivermos editando um cliente, precisamos buscar os seus dados
  // no servidor assim que o componente for carregado
  React.useEffect(() => {
    // Sabemos que estamos editando (e não cadastrando um novo) cliente
    // quando a rota ativa contiver um parâmetro chamado id
    if(params.id) loadData()
  }, [])

  async function loadData() {
    feedbackWait(true)
    try {
      const response = await fetch(
        import.meta.env.VITE_API_BASE + `/cars/${params.id}`
      )
      const result = await response.json()

      // Converte o formato de data armazenado no banco de dados
      // para o formato reconhecido pelo componente DatePicker
      if(result.selling_date) result.selling_date = parseISO(result.selling_date)

      // Armazena os dados obtidos na variável de estado
      setState({ ...state, car: result })
    }
    catch(error) {
      console.error(error)
      feedbackNotify('ERRO: ' + error.message)
    }
    finally {
      feedbackWait(false)
    }
  }

  /* Preenche o campo do objeto "customer" conforme o campo correspondente do
     formulário for modificado */
  function handleFieldChange(event) {
    // Vamos observar no console as informações que chegam à função
    console.log('CAMPO MODIFICADO:', {
      name: event.target.name,
      value: event.target.value
    })

    const carCopy = { ...car }
    carCopy[event.target.name] = event.target.value
    setState({ ...state, car: carCopy, formModified: true })
  }

  async function handleFormSubmit(event) {
    event.preventDefault()    // Impede o recarregamento da página
    feedbackWait(true)
    try {
      // Prepara as opções para o fetch
      const reqOptions = {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(car)
      }

      // Se houver parâmetro na rota, significa que estamos alterando
      // um registro existente. Portanto, fetch() precisa ser chamado
      // com o verbo PUT
      if(params.id) {
        await fetch(
          import.meta.env.VITE_API_BASE + `/cars/${params.id}`,
          { ...reqOptions, method: 'PUT' }
        )
      }
      // Senão, envia com o método POST para criar um novo registro
      else {
        await fetch(
          import.meta.env.VITE_API_BASE + `/cars`,
          { ...reqOptions, method: 'POST' }
        )
      }

      feedbackNotify('Item salvo com sucesso.', 'success', 2500, () => {
        // Retorna para a página de listagem
        navigate('..', { relative: 'path', replace: true })
      })
    }
    catch(error) {
      console.error(error)
      feedbackNotify('ERRO: ' + error.message, 'error')
    }
    finally {
      feedbackWait(false)
    }
  }

  async function handleBackButtonClick() {
    if(
      formModified &&
      ! await feedbackConfirm('Há informações não salvas. Deseja realmente sair?')
    ) return    // Sai da função sem fazer nada

    // Aqui o usuário respondeu que quer voltar e perder os dados
    navigate('..', { relative: 'path', replace: 'true' })
  }

  return <>
    <Typography variant="h1" gutterBottom>
      Cadastro de Veiculos
    </Typography>

    <Box className="form-fields">
      <form onSubmit={handleFormSubmit}>

        {/* autoFocus ~> foco do teclado no primeiro campo */}
        <TextField 
          variant="outlined"
          name="brand"
          label="Marca"
          fullWidth
          required
          autoFocus
          value={car.brand}
          onChange={handleFieldChange}
        />

        <div className="MuiFormControl-root">
          <FormControlLabel
            control={
              <Checkbox
                checked={car.imported}
                onChange={e => {
                  const event = { target: { name: 'imported', value: e.target.checked } }
                  handleFieldChange(event)
                }}
              />
            }
            label="Importado"
          />
        </div>

        <TextField
          variant="outlined"
          name="model"
          label="Modelo"
          fullWidth
          required
          value={car.model}
          onChange={handleFieldChange}
        />

        <TextField
          inputRef={platesRef}
          variant="outlined"
          name="plates"
          label="Placa"
          fullWidth
          required
          value={car.plates}
          onChange={handleFieldChange}
        />

        <TextField
          variant="outlined" 
          name="color"
          label="Cor" 
          fullWidth
          required
          value={car.color}
          select
          onChange={handleFieldChange}
        >
          {
            carsColor.map(c => 
              <MenuItem key={c.value} value={c.value}>
                {c.label}
              </MenuItem>
            )
          }
        </TextField>
        
        <TextField
          variant="outlined"
          name="selling_price"
          label="Preço de Venda"
          fullWidth
          required
          inputMode="numeric"
          value={car.selling_price}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*$/.test(value)) {
              handleFieldChange(e);
            }
          }}
        />

        <TextField
          variant="outlined"
          name="year_manufacture"
          label="Ano de Fabricação"
          fullWidth
          required
          value={car.year_manufacture}
          select
          onChange={handleFieldChange}
          >
            {
            years.map(y => 
              <MenuItem key={y.value} value={y.value}>
                {y.label}
              </MenuItem>
            )
          }
            
        </TextField>
        
        {/* 
          O evento onChange do componente DatePicker não passa o parâmetro
          "event", como o TextField, e sim a própria data que foi modificada.
          Por isso, ao chamar a função handleFieldChange() no DatePicker,
          precisamos criar um parâmetro "event" "fake" com as informações
          necessárias.
        */}
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
          <DatePicker 
            label="Data de Venda"
            value={car.selling_date}
            slotProps={{
              textField: {
                variant: "outlined",
                fullWidth: true
              }
            }}
            onChange={ date => {
              const event = { target: { name: 'selling_date', value: date } }
              handleFieldChange(event)
            }}
          />
        </LocalizationProvider>

        <Box sx={{
          display: 'flex',
          justifyContent: 'space-around',
          width: '100%'
        }}>
          <Button
            variant="contained"
            color="secondary"
            type="submit"
          >
            Salvar
          </Button>
          <Button
            variant="outlined"
            onClick={handleBackButtonClick}
          >
            Voltar
          </Button>
        </Box>

        <Box sx={{
          fontFamily: 'monospace',
          display: 'flex',
          flexDirection: 'column',
          width: '100vw'
        }}>
          { JSON.stringify(car, null, ' ') }
        </Box>

      </form>
    </Box>
  </>
}