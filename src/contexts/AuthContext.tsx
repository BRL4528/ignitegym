import { createContext, ReactNode, useState } from "react";
import { UserDTO } from "@dtos/UserDTO";

export type AuthContextDataProps = {
  user: UserDTO;
}

type AuthContextProviderProps = {
  children: ReactNode;
}


export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({children}: AuthContextProviderProps) {
 const [user, setUser] = useState({
    id: '1',
    name: '2',
    email: '2@example.com',
    avatar: 'http://example.com'
});

  return (
    <AuthContext.Provider value={{user}}>
  {children}
  </AuthContext.Provider>
    )
}