import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';
import { useDisconnect } from 'wagmi';

const PrivateRoute = ({ component: Component, ...rest }) => {

    const { isAuthenticated } = useAuth();
    const { disconnect } = useDisconnect();
    
    return (
        <Route 
            {...rest} 
            render={props => 
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <>
                        {disconnect()}
                        <Redirect to="/wallet-connect" /> 
                    </>
                )
            }
        />
    );
};

export default PrivateRoute;
