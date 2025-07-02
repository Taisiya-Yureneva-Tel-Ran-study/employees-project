import { useAuthData } from '../state-management/store'
import { LoginData, UserData } from '../services/AuthClient';
import authClient from '../services/AuthClientJsonServer';
import LoginForm from '../components/LoginForm';
import apiClient from '../services/ApiClientJsonServer';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AxiosError } from 'axios';

const LoginPage = () => {
    const login = useAuthData(s => s.login);
    const [navigateHome, setNavigateHome] = useState(false);
    const [isError, setIsError] = useState<AxiosError | null>(null);
    useEffect(() => {
      if (isError) {
        throw isError;
      }
    }, [isError])

    const submitter = async (loginData: LoginData) => {
        let res = false;
        try {
            const userData: UserData = await authClient.login(loginData);
            login(userData);
            apiClient.setToken(userData.token);
            res = true;
            setNavigateHome(true);
        } catch (e) {
          if (!(e as AxiosError).response) {
            setIsError(e as AxiosError); 
          }
            console.log(e);
        }
        return res;
    }
    
  return (
    <>
    { navigateHome ? <Navigate to="/" /> :
      <LoginForm submitter={submitter} />
    }
    </>
  )
}

export default LoginPage