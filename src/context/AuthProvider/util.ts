import { IUser } from './type';
import { useAxios } from 'utils/useAxios';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const setUserLocalStorage = (user: IUser | null) => {
  localStorage.setItem('u', JSON.stringify(user));
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getUserLocalStorage = () => {
  const json = localStorage.getItem('u');
  if (!json) {
    return null;
  }
  const user = JSON.parse(json);
  return user ?? null;
};

export async function LoginRequest(credential: string, password: string): Promise<{ token: string } | null> {
  const { response } = await useAxios({
    method: 'post',
    url: 'login',
    data: { credential, password },
  });
  if (response) {
    return response.data;
  }
  return null;
}
