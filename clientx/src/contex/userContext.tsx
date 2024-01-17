import { createContext, useEffect, useState, ReactNode, Dispatch, SetStateAction } from 'react';

interface UserData {
  userId: string;
  userName: string;
  email: string;
  avatar?: string;
  posts: number;
  token?: string;
}


interface UserContextProps {
  currentUser: UserData | null;
  setCurrentUser: Dispatch<SetStateAction<UserData | null>>;
}

export const UserContext = createContext<UserContextProps>({ currentUser: null, setCurrentUser: () => {} });

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);

  useEffect(() => {
    const storedUserString = localStorage.getItem('user');
    if (storedUserString) {
      const storedUser = JSON.parse(storedUserString) as UserData;
      setCurrentUser(storedUser);
    }
  }, []);

  return <UserContext.Provider value={{ currentUser, setCurrentUser }}>{children}</UserContext.Provider>;
};


export default UserProvider;
