import React, {useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../contex/userContext'

import './logout.css'

export const Logout = () => {
  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    
    setCurrentUser(null);

    localStorage.setItem('user', JSON.stringify(null));

    navigate('/login');
  }, [setCurrentUser, navigate]);

  return <></>;
};