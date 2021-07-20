import { createContext, useContext } from 'react';

const initialContext = {
  owned: []
}

const UserContext = createContext(initialContext);

export const useUser = () => useContext(UserContext);

export default UserContext;