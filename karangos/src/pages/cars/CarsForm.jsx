import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'; 
import FormControlLabel from '@mui/material/FormControlLabel'; 
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { parseISO } from 'date-fns'
import { feedbackWait, feedbackNotify, feedbackConfirm } from '../../ui/Feedback'
import { useNavigate, useParams } from 'react-router-dom'
import { useMask } from '@react-input/mask'

export default function CarsForm() {

  const colors = [
    'Amarelo', 'Azul', 'Bege', 'Branco', 'Carmim', 'Cinza', 'Laranja',
    'Marrom', 'Ouro', 'Prata', 'Preto', 'Roxo', 'Verde', 'Vermelho'
  ].sort();

  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = currentYear; i >= 1951; i--) {
    years.push(i);
  }

  const platesRef = useMask({
    mask: "AAA-9$99",
    replacement: {
      'A': /[A-Z]/,
      '9': /[0-9]/,
      '$': /[A-J0-9]/
    },
    showMask: false
  })

  const formDefaults = {
    brand: '',
    model: '',
    color: '',
    year_manufacture: null,
    imported: 0, 
    plates: '',
    selling_price: '',
    selling_date: null
  }

  const navigate = useNavigate()
  const params = useParams()

  const [state, setState] = React.useState({
    car: { ...formDefaults },
    formModified: false
  })
  const {
    car,
    formModified
  } = state

  React.useEffect(() => {
    if(params.id) loadData()
  }, [])

  async function loadData() {
    feedbackWait(true)
    try {
      const response = await fetch(
        import.meta.env.VITE_API_BASE + `/cars/${params.id}`
      )
      const result = await response.json()

      if(result.year_manufacture) result.year_manufacture = new Date(result.year_manufacture, 0, 1) 
      if(result.selling_date) result.selling_date = parseISO(result.selling_date)

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

  function handleFieldChange(event) {
    console.log('CAMPO MODIFICADO:', {
      name: event.target.name,
      value: event.target.value
    })

    const carCopy = { ...car }
    carCopy[event.target.name] = event.target.value
    setState({ ...state, car: carCopy, formModified: true })
  }

  function handleImportedChange(event) {
    const carCopy = { ...car };
    carCopy.imported = event.target.checked ? 1 : 0;
    setState({ ...state, car: carCopy, formModified: true });
  }

  function handleNumericFieldChange(event) {
    const { name, value } = event.target;
    const numericValue = value.replace(/[^0-9]/g, ''); 
    carCopy[name] = numericValue;
    setState({ ...state, car: carCopy, formModified: true });
  }

  async function handleFormSubmit(event) {
    event.preventDefault()   
    feedbackWait(true)
    try {
      const reqOptions = {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(car)
      }

      if(params.id) {
        await fetch(
          import.meta.env.VITE_API_BASE + `/cars/${params.id}`,
          { ...reqOptions, method: 'PUT' }
        )
      }
      else {
        await fetch(
          import.meta.env.VITE_API_BASE + `/cars`,
          { ...reqOptions, method: 'POST' }
        )
      }

      feedbackNotify('Item salvo com sucesso.', 'success', 2500, () => {
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
    ) return    
    navigate('..', { relative: 'path', replace: 'true' })
  }

  return <>
    <Typography variant="h1" gutterBottom>
      Cadastro de veículos
    </Typography>

    <Box className="form-fields">
      <form onSubmit={handleFormSubmit}>

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
            colors.map(color =>
              <MenuItem key={color} value={color}>
                {color}
              </MenuItem>
            )
          }
        </TextField>

        <TextField
          variant="outlined"
          name="year_manufacture"
          label="Ano de Fabricação"
          fullWidth
          required
          value={car.year_manufacture ? new Date(car.year_manufacture).getFullYear() : ''}
          select
          onChange={event => {
            const year = event.target.value;
            const date = year ? new Date(year, 0, 1) : null;
            handleFieldChange({ target: { name: 'year_manufacture', value: date } });
          }}
        >
          {
            years.map(year =>
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            )
          }
        </TextField>

        <div className="MuiFormControl-root">
          <FormControlLabel
            control={
              <Checkbox
                checked={car.imported === 1}
                onChange={handleImportedChange}
                name="imported"
                color="primary"
              />
            }
            label="Veículo importado?"
          />
        </div>

        <TextField
          inputRef={platesRef}
          variant="outlined"
          name="plates"
          label="Placas"
          fullWidth
          required
          value={car.plates}
          onChange={handleFieldChange}
        />

        <TextField
          variant="outlined"
          name="selling_price"
          label="Preço de Venda"
          fullWidth
          required
          value={car.selling_price}
          onChange={handleNumericFieldChange}
          type="text"
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        />

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