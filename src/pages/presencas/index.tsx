import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  Alert,
  Snackbar,
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { PresencaForm } from './PresencaForm';
import { presencaService, type Presenca, type PresencaFormData } from '../../services/presencaService';

export function Presenca() {
  const [open, setOpen] = useState(false);
  const [presencas, setPresencas] = useState<Presenca[]>([]);
  const [selectedPresenca, setSelectedPresenca] = useState<Presenca | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const carregarPresencas = async () => {
    try {
      const data = await presencaService.listar();
      setPresencas(data);
    } catch {
      mostrarMensagem('Erro ao carregar presenças', 'error');
    }
  };

  useEffect(() => {
    carregarPresencas();
  }, []);

  const handleOpen = () => {
    setSelectedPresenca(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPresenca(null);
  };

  const handleEdit = (presenca: Presenca) => {
    setSelectedPresenca(presenca);
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await presencaService.excluir(id);
      await carregarPresencas();
      mostrarMensagem('Presença excluída com sucesso', 'success');
    } catch {
      mostrarMensagem('Erro ao excluir presença', 'error');
    }
  };

  const handleSave = async (data: PresencaFormData) => {
    try {
      if (selectedPresenca) {
        await presencaService.atualizar(selectedPresenca.id_presenca, data);
        mostrarMensagem('Presença atualizada com sucesso', 'success');
      } else {
        await presencaService.criar(data);
        mostrarMensagem('Presença criada com sucesso', 'success');
      }
      await carregarPresencas();
      handleClose();
    } catch {
      mostrarMensagem('Erro ao salvar presença', 'error');
    }
  };

  const mostrarMensagem = (message: string, severity: 'success' | 'error') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h5" component="h2">
              Controle de Presença
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleOpen}
            >
              Nova Presença
            </Button>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Aluno</TableCell>
                  <TableCell>Turma</TableCell>
                  <TableCell>Data da Aula</TableCell>
                  <TableCell>Presente</TableCell>
                  <TableCell align="right">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {presencas.map((presenca) => (
                  <TableRow key={presenca.id_presenca}>
                    <TableCell>{presenca.nome_aluno}</TableCell>
                    <TableCell>{presenca.nome_turma}</TableCell>
                    <TableCell>
                      {format(new Date(presenca.data_aula), 'dd/MM/yyyy', {
                        locale: ptBR,
                      })}
                    </TableCell>
                    <TableCell>{presenca.presente ? 'Sim' : 'Não'}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={() => handleEdit(presenca)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(presenca.id_presenca)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <PresencaForm
          presenca={selectedPresenca}
          onClose={handleClose}
          onSave={handleSave}
        />
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
} 