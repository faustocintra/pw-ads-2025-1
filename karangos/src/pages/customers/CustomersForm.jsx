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

export default function CustomersForm() {

  const states = [
    { value: 'DF', label: 'Distrito Federal' },
    { value: 'ES', label: 'Espírito Santo' },
    { value: 'GO', label: 'Goiás' },
    { value: 'MS', label: 'Mato Grosso do Sul' },
    { value: 'MG', label: 'Minas Gerais' },
    { value: 'PR', label: 'Paraná' },
    { value: 'RJ', label: 'Rio de Janeiro' },
    { value: 'SP', label: 'São Paulo' }
  ]

  const phoneMaskFormatChars = {
    '9': '[0-9]',     // Somente dígitos
    '%': '[\s0-9]'    // Dígitos ou espaço em branco (\s)
  }

  // Por padrão, todos os campos começam com uma string vazia como valor.
  // A exceção é o campo birth_date, do tipo data, que, por causa do
  // funcionamento do componente DatePicker, deve começar como null
  const formDefaults = {
    name: '',
    ident_document: '',
    birth_date: null,
    street_name: '',
    house_number: '',
    complements: '',
    district: '',
    municipality: '',
    state: '',
    phone: '',
    email: ''
  }

  const navigate = useNavigate()
  const params = useParams()

  // Variáveis de estado
  const [state, setState] = React.useState({
    customer: { ...formDefaults },
    formModified: false
  })
  const {
    customer,
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
        import.meta.env.VITE_API_BASE + `/customers/${params.id}`
      )
      const result = response.json()

      // Converte o formato de data armazenado no banco de dados
      // para o formato reconhecido pelo componente DatePicker
      if(result.birth_date) result.birth_date = parseISO(result.birth_date)

      // Armazena os dados obtidos na variável de estado
      setState({ ...state, customer: result })
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

    // Tira uma cópia da variável de estado "customer"
    const customerCopy = { ...customer }
    // Altera em customerCopy apenas o campo da vez
    customerCopy[event.target.name] = event.target.value
    // Atualiza a variável de estado, substituindo o objeto "customer"
    // por sua cópia atualizada
    setState({ ...state, customer: customerCopy, formModified: true })
  }

  return <>
    <Typography variant="h1" gutterBottom>
      Cadastro de clientes
    </Typography>
  </>
}