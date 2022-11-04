import React from 'react';
import CustomMenu from 'components/dashMenu';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams, useNavigate } from 'react-router-dom';
import { useAxios } from 'utils/useAxios';
import { toast } from 'react-toastify';

const DeleteCompany = (): JSX.Element => {
  const navigate = useNavigate();
  const params = useParams();
  const { idCompany } = params;

  const handleDeleteSubmit = async (): Promise<void> => {
    const { response } = await useAxios({
      method: 'DELETE',
      url: `company/${idCompany}`,
    });
    if (response) {
      navigate(-1);
    } else {
      toast.error('erro ao remover empresa');
    }
  };

  return (
    <>
      <CustomMenu />
      <Button
        color='info'
        startIcon={<ArrowBackIcon />}
        sx={{ mb: '10px' }}
        size='large'
        variant='outlined'
        onClick={(): void => {
          navigate(-1);
        }}
      >
        Voltar
      </Button>
      <div className='modal'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Apagar empresa {idCompany}</h5>
            </div>
            <div className='modal-body'>
              <p>Tem certeza que deseja apagar.</p>
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-secondary' data-bs-dismiss='modal' onClick={handleDeleteSubmit}>
                Sim
              </button>
              <button
                type='button'
                className='btn btn-primary'
                onClick={(): void => {
                  navigate(-1);
                }}
              >
                Não
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteCompany;
