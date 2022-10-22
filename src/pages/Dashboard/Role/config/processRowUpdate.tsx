import { GridRowModel } from '@mui/x-data-grid';
import { toast } from 'react-toastify';
import { useAxios } from 'utils/useAxios';
import IProcessRowUpdate from './IProcessRowUpdate';

const processRowUpdate = async ({ ...props }: IProcessRowUpdate): Promise<GridRowModel> => {
  const updatedRow = { ...props.newRow, isNew: false };
  if (!props.newRow.isNew) {
    const { response, error } = await useAxios({ method: 'put', url: `role/${props.newRow.id}`, data: props.newRow });
    if (response) {
      props.props.setRows(props.props.rows?.map(row => (row.id === props.newRow.id ? updatedRow : row)));
    } else {
      if (error?.data == 'Unauthorized.' && error?.status == 401) {
        toast.error('Sessão do usuario expirada, faça login novamente!', {
          onClose: () => {
            props.props.auth.logout();
          },
        });
      }
    }
  } else {
    const { response, error } = await useAxios({ method: 'post', url: `role`, data: props.newRow });
    if (response) {
      const formatedRow = { ...updatedRow, id: response.data.id };
      props.props.setRows(props.props.rows?.map(row => (row.id === props.newRow.id ? formatedRow : row)));
    } else {
      if (error?.data == 'Unauthorized.' && error?.status == 401) {
        toast.error('Sessão do usuario expirada, faça login novamente!', {
          onClose: () => {
            props.props.auth.logout();
          },
        });
      }
      if (error?.status !== 201) {
        toast.error('Erro ao inserir nova role');
        props.props.setRows(props.props.rows?.filter(row => row.id !== props.newRow.id));
      }
    }
  }
  return updatedRow;
};

export default processRowUpdate;
