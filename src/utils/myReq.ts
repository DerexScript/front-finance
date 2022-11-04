import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { IContext } from 'context/AuthProvider/type';
import { toast } from 'react-toastify';
import { useAxios } from 'utils/useAxios';

interface IAxiosResponse {
  response: AxiosResponse | undefined;
  error: AxiosResponse | undefined;
  axiosLoading: boolean;
}

export const myReq = async (config: AxiosRequestConfig, auth: IContext): Promise<IAxiosResponse> => {
  const { response, error, axiosLoading } = await useAxios(config);
  if (!response) {
    if (error?.data === 'Unauthorized.' && error?.status === 401) {
      toast.error('Sessão do usuario expirada, faça login novamente!', {
        onClose: () => {
          localStorage.setItem('u', JSON.stringify(null));
          auth.logout();
        },
      });
    }

    if (error?.status == 0) {
      toast.error('Erro ao obter dados');
    }
  }
  return { response, error, axiosLoading };
};
