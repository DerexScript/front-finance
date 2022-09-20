export interface IUser {
  credential?: string;
  token?: string;
}

export interface IContext extends IUser {
  authenticate: (credential: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export interface IAuthProvider {
  children: JSX.Element;
}
