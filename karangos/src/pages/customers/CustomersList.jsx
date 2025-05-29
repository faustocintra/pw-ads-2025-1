import React from 'react'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';

import { feedbackWait, feedbackConfirm, feedbackNotify } from '../../ui/Feedback'

const columns = [
  { 
    field: 'id', 
    headerName: 'Cód.', 
    width: 90 
  },
  {
    field: 'name',
    headerName: 'Nome',
    width: 250
  },
  {
    field: 'birth_date',
    headerName: 'Data nasc.',
    width: 150,
    valueFormatter: value => {
      if(value) {
        const date = new Date(value)
        return date.toLocaleDateString('pt-BR')
      }
      else return ''
    }
  },
  {
    field: 'city',
    headerName: 'Município/UF',
    width: 250,
    valueGetter: (value, row) => row.city + '/' + row.uf
  },
  {
    field: 'phone',
    headerName: 'Celular',
    width: 150
  },
  {
    field: 'email',
    headerName: 'E-mail',
    width: 250
  }  
];

export default function CustomersList() {
  const [state, setState] = React.useState({
    customers: []
  })
  const {
    customers
  } = state

  // Função que é chamada pelo useEffect() para carregar os dados
  // do back-end quando o componente for exibido
  async function loadData() {
    feedbackWait(true)
    try {
      const response = await fetch('https://api.faustocintra.com.br/customers')
      const data = await response.json()

      // Atualiza a variável de estado com os dados obtidos
      setState({ ...state, customers: data })
    }
    catch(error) {
      console.error(error)
      feedbackNotify(error.message, 'error')
    }
    finally {
      feedbackWait(false)
    }
  }

  // useEffect() que será executado apenas quando o componente for carregado
  React.useEffect(() => {
    loadData()
  }, [])

  return <>
    <Typography variant="h1" gutterBottom>
      Listagem de clientes
    </Typography>
    <Paper sx={{ height: 400, width: '100%' }} elevation={10}>
      <DataGrid
        rows={customers}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Paper>
  </>
}