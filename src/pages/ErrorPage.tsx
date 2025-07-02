import { Box, Button, Text } from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { Navigate, useRouteError } from 'react-router-dom'
import { useAuthData } from '../state-management/store';

const ErrorPage = () => {
    const error = useRouteError();
    const logout = useAuthData(s => s.logout);
    const [navigateHome, setNavigateHome] = useState<boolean>(false);
    if (!(error instanceof AxiosError)) {
        return <Text color="red" fontSize={"xl"}>Unknown error</Text>
    }

    const status = error.response?.status;
    if (status === 401 || status === 403) {
            logout();
        }

        return (
        <>
                    {navigateHome && <Navigate to="/" />}
                    {status === 403 || status === 401 ? <Navigate to="/login" /> : <Box>
                        <Text color="red" fontSize={"xl"}>Server unavailable, try later</Text>
                        <Button onClick={() => setNavigateHome(true)}>Home</Button>
                    </Box>}
        </>
    )
}

export default ErrorPage