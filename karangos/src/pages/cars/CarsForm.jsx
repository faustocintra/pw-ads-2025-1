import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import InputMask from 'react-input-mask'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { parseISO } from 'date-fns'
import { feedbackWait, feedbackNotify, feedbackConfirm } from '../../ui/Feedback'
import { useNavigate, useParams } from 'react-router-dom'

export default function CarsForm() {

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1950 }, (_, i) => currentYear - i);


  const carsColors = [
    { value: 'Amarelo', label: 'Amarelo' },
    { value: 'Azul', label: 'Azul' },
    { value: 'Bege', label: 'Bege' },
    { value: 'Branco', label: 'Branco' },
    { value: 'Cinza', label: 'Cinza' },
    { value: 'Laranja', label: 'Laranja' },
    { value: 'Marrom', label: 'Marrom' },
    { value: 'Preto', label: 'Preto' },
    { value: 'Prata', label: 'Prata' },
    { value: 'Verde', label: 'Verde' },
    { value: 'Vermelho', label: 'Vermelho' },
  ]

  const plateMaskFormatChars = {
     '9': '[0-9]',     // Somente dígitos
    '%': '[\s0-9]'    // Dígitos ou espaço em branco (\s)
  }

  // Por padrão, todos os campos começam com uma string vazia como valor.
  // A exceção é o campo birth_date, do tipo data, que, por causa do
  // funcionamento do componente DatePicker, deve começar como null
  const formDefaults = {
    brand: "",
    model: "",
    color: "",
    year_manufacture: "",
    imported: 0,
    plates: '',
    selling_price: 0,
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
    // Sabemos que estamos editando (e não cadastrando um novo) carro
    // quando a rota ativa contiver um parâmetro id
    if (params.id) loadData()
  }, [])

  async function loadData() {
    feedbackWait(true)
    try {
      const response = await fetch(
        import.meta.env.VITE_API_BASE + `/cars/${ params.id}`
      )
      const result = response.json()
      
      //  Converte o formato da data armazenada no banco de dados
      //  para o formato reconhecido pelo componente DatePicker

      if (result.selling_date) result.selling_date = parseISO(result.selling_date)

        // Armazena os dados obtidos na variável de estado
      setState({ ...params, car: result })
    }
    catch (error) {
      console.log(error)
      feedbackNotify('ERRO: ' + error.message, 'error')
    }
    finally {
      feedbackWait(false)
    }
  }

  /*
    Preenche o campo do objeto customer conforme
    o campo correspondente do formulário for
    modificado
  */
  function handleFieldChange(event) {
    // Vamos observar no console as informações que chegam
    // à função handleFieldChange
    console.log('CAMPO MODIFICADO:',{
       name: event.target.name, 
       value: event.target.value 
      })

    // Tira uma cópia da variável de estado car
    const carCopy = { ...car }
    // Altera em carCopy apenas o campo da vez
    carCopy[event.target.name] = event.target.value
    // Atualiza a variável de estado, substituindo o objeto
    // car por sua cópia atualizada
    setState({ ...state, car: carCopy, formModified: true })
  }

  async function handleFormSubmit(event) {
    event.preventDefault()      // Impede o recarregamento da página

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
      if (params.id) {
        await fetch(
          import.meta.env.VITE_API_BASE + `/cars/${params.id}`,
          { ...reqOptions, method: 'PUT' }
        )
      }

      //  Senão, envia com o método POST para criar novo registro
      else {
        await fetch(
          import.meta.env.VITE_API_BASE + '/cars/',
         { ...reqOptions, method: 'POST' }
        )
      }

      feedbackNotify('Item salvo com sucesso.', 'success', 2500, () => {
        // Retorna para a página de listagem
        navigate('..', { relative: 'path', replace: true })
      })

    }
    catch (error) {
      console.error(error)
      feedbackNotify('ERRO: ' + error.message, 'error')
    }
    finally {
      feedbackWait(false)
    }
  }

  async function handleBackButtonClick() {
    if (
      formModified &&
      ! await feedbackConfirm('Há informações não salvas. Deseja Realmente sair?')
    ) return // sai da função sem fazer nada

    //  Aqui o usuário respondeu que quer voltar e perder os dados
    navigate('..', { relative: 'path', replace: 'true' })
  }

 
   return <>
     <Typography variant="h1" gutterBottom>
       Cadastro de carros
     </Typography>
 
     <Box className="form-fields">
       <form onSubmit={handleFormSubmit}>
 

          {/* autoFocus = foco do teclado no primeiro campo */}
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
              label="Modelo do carro"
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
              carsColors.map(s =>
                <MenuItem key={s.value} value={s.value}>
                  {s.label}
                </MenuItem>
              )
            }
          </TextField>

          <TextField
            variant="outlined"
            name="year_manufacture"
            label="Ano de fabricação"
            fullWidth
            value={car.year_manufacture}
            select
            onChange={handleFieldChange}
          >
            {
              years.map(year => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))
            }
          </TextField>

          <FormControl className="MuiFormControl-root" sx={{ width: '100%' }}>
            <FormControlLabel
              label="Carro importado"
              sx={{
                display: 'inline-flex',
                flexDirection: 'row-reverse',
                width: '50%',
                justifyContent: 'space-around',
              }}
              control={
                <Checkbox
                  sx={{
                    color: yellow[600],
                    '&.Mui-checked': {
                      color: pink['A200'],
                    },
                  }}
                  name="imported"
                  checked={car.imported}
                  onChange={(event) =>
                    handleFieldChange({
                      target: {
                        name: event.target.name,
                        value: event.target.checked,
                      },
                    })
                  }
                />
              }
            />
          </FormControl>

          <InputMask
            mask="AAA-9$99"
            formatChars={plateMaskFormatChars}
            value={car.plates}
            onChange={handleFieldChange}
          >
            {() => (
              <TextField
                name="plates"
                label="Placa"
                variant="outlined"
                required
                fullWidth
              />
            )}
          </InputMask>

          <TextField
            variant="outlined"
            name="selling_price"
            label="Valor de venda"
            fullWidth
            type='number'
            value={car.selling_price}
            onChange={handleFieldChange}
          />
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={ptBR}
          >
            <DatePicker
              label="Data da venda"
              value={car.selling_date}
              slotProps={{
                textField: {
                  variant: 'outlined',
                  fullWidth: true
                }
              }}
              onChange={date => {
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
            {JSON.stringify(car, null, ' ')}
          </Box>

        </form>
      </Box>

    </>
  
}