import React from 'react'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import { DataGrid } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import IconButton from '@mui/material/IconButton'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { feedbackWait, feedbackConfirm, feedbackNotify } from '../../ui/Feedback'

export default function CarsList() {
  const columns = [
    { field: 'id', 
      headerName: 'Cód.', 
      width: 90 
    },
    {
      field: 'brandAndModel',
      headerName: 'Marca e Modelo',
      width: 250,
      renderCell: params => (
        <span>{`${params.row.brand || ''} ${params.row.model || ''}`}</span>
      )
    },
    { field: 'color', 
      headerName: 'Cor', 
      width: 150 },
    { field: 'year_manufacture', 
      headerName: 'Ano de fabricação',
       width: 160 },
    {
      field: 'imported',
      headerName: 'Importado',
      width: 150,
      renderCell: params => params.row.imported ? 'Sim' : ''
    },
    { field: 'plates',
       headerName: 'Placas',
        width: 150 },
    {
      field: 'selling_price',
      headerName: 'Preço de venda',
      width: 250,
      renderCell: params => new Intl.NumberFormat('pt-BR', {
        style: 'currency', currency: 'BRL'
      }).format(params.row.selling_price || 0)
    },
    {
      field: '_actions',
      headerName: 'Ações',
      width: 150,
      sortable: false,
      align: 'center',
      headerAlign: 'center',
      renderCell: params => {
        return(
        <>
          <Link to={'./' + params.id}>
            <IconButton aria-label="editar">
              <EditIcon />
              </IconButton>
          </Link>
          
          <IconButton aria-label="excluir"
           onClick={() => handleDeleteButtonClick(params.id)}>
            <DeleteForeverIcon color="error" />
          </IconButton>
        </>
        )
      }
    }
  ];

  const [state, setState] = React.useState({
     cars: [] 
    })
  const {
     cars 
    } = state

 // Função que é chamada pelo useEffect() para carregar os dados
// do back-end quando o componente for exibido
  async function loadData() {
    feedbackWait(true)
    try {
      const response = await fetch('https://api.faustocintra.com.br/cars?by=id')
      const data = await response.json()

      // Atualiza a variável de estado com os dados obtidos
      setState({ ...state, cars: data })
    }
    catch (error) {
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

  async function handleDeleteButtonClick(id) {
    if (await feedbackConfirm('Deseja realmente excluir este item?')) {
      feedbackWait(true)
      try {
        // Envia a requisição para a exclusão do registro
       await fetch(`https://api.faustocintra.com.br/cars/${id}`, {
       method: 'DELETE'}
      )
          // Atualiza os dados do datagrid
        loadData()
        feedbackNotify('Exclusão efetuada com sucesso.')
      }
      catch (error) {
        feedbackNotify('ERRO: ' + error.message, 'error')
      }
      finally {
        feedbackWait(false)
      }
    }
  }

  return <>
    <Typography variant="h1" gutterBottom>
      Listagem de veículos
    </Typography>

    <Box sx={{
       display: 'flex',
        justifyContent: 'right',    //Conteudo alinhado à direita
        mb: 2                       //Margem inferior (margin-bottom)
    }}>
      <Link to={'./new'}>
        <Button 
        variant="contained" 
        size="large" 
        color="secondary" 
        startIcon={<AddCircleIcon />}
        >
          Novo veículo
        </Button>
      </Link>
    </Box>

    <Paper sx={{ height: 400, width: '100%' }} elevation={10}>
      <DataGrid
        rows={cars}
        columns={columns}
        initialState={{
          pagination: { 
            paginationModel: { 
              pageSize: 5,
             },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Paper>
  </>
}
