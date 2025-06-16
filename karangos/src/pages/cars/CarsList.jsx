import React from 'react'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import IconButton from '@mui/material/IconButton'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import AddCircleIcon from '@mui/icons-material/AddCircle'

import { feedbackWait, feedbackConfirm, feedbackNotify } from '../../ui/Feedback'

export default function CarsList() {

  const [cars, setCars] = React.useState([])

  const columns = [
    { 
      field: 'id', 
      headerName: 'Cód.', 
      width: 90 
    },
    {
      field: 'brand_model', 
      headerName: 'Marca/Modelo',
      width: 250,
      renderCell: params => `${params.row.brand} ${params.row.model}` 
    },
    {
      field: 'color',
      headerName: 'Cor',
      width: 120
    },
    {
      field: 'year_manufacture',
      headerName: 'Ano Fabricação',
      width: 150,
      valueFormatter: params => {
        if (params.value) {
          return new Date(params.value).getFullYear();
        }
        return '';
      }
    },
    {
      field: 'imported',
      headerName: 'Importado',
      width: 100,
      renderCell: params => params.value === 1 ? 'Sim' : '' 
    },
    {
      field: 'plates',
      headerName: 'Placas',
      width: 120
    },
    {
      field: 'selling_price',
      headerName: 'Preço Venda',
      width: 150,
      renderCell: params => { 
        if (params.value) {
          return Number(params.value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        }
        return '';
      }
    },
    {
      field: 'selling_date',
      headerName: 'Data Venda',
      width: 150,
      valueFormatter: params => {
        if (params.value) {
          const date = new Date(params.value)
          return date.toLocaleDateString('pt-BR')
        }
        return ''
      }
    },
    {
      field: 'edit',
      headerName: 'Editar',
      width: 90,
      renderCell: params => (
        <Link to={'./' + params.id}>
          <IconButton aria-label="Editar">
            <EditIcon />
          </IconButton>
        </Link>
      )
    },
    {
      field: 'delete',
      headerName: 'Excluir',
      width: 90,
      renderCell: params => (
        <IconButton aria-label="Excluir" onClick={() => handleDelete(params.id)}>
          <DeleteForeverIcon color="error" />
        </IconButton>
      )
    }
  ];

  React.useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    feedbackWait(true)
    try {
      const response = await fetch(import.meta.env.VITE_API_BASE + '/cars')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setCars(data)
    } catch (error) {
      console.error(error)
      feedbackNotify('ERRO: ' + error.message, 'error')
    } finally {
      feedbackWait(false)
    }
  }

  async function handleDelete(id) {
    if (await feedbackConfirm('Deseja realmente excluir este item?')) {
      feedbackWait(true)
      try {
        await fetch(import.meta.env.VITE_API_BASE + `/cars/${id}`, {
          method: 'DELETE'
        })
        loadData()
        feedbackNotify('Exclusão efetuada com sucesso.')
      } catch (error) {
        console.error(error)
        feedbackNotify('ERRO: ' + error.message, 'error')
      } finally {
        feedbackWait(false)
      }
    }
  }

  return (
    <>
      <Typography variant="h1" gutterBottom>
        Listagem de Veículos
      </Typography>

      <Box sx={{
        display: 'flex',
        justifyContent: 'right',
        mb: 2
      }}>
        <Link to={'./new'}>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            startIcon={<AddCircleIcon />}
          >
            Novo Veículo
          </Button>
        </Link>
      </Box>

      <Paper sx={{ height: 600, width: '100%' }} elevation={10}>
        <DataGrid
          rows={cars}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10, 20, 50]}
        />
      </Paper>
    </>
  )
}