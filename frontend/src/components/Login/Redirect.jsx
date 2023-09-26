import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';
import { useAccount } from 'wagmi';
import { useAuth } from './providers/AuthProvider';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isConnected } = useAccount();
    const { isAuthenticated } = useAuth();
    
    return (
        <Route 
            {...rest} 
            render={props => 
                isAuthenticated && isConnected ? ( 
                    <Component {...props} />
                ) : (
                    <Redirect to="/wallet-connect" /> 
                )
            }
        />
    );
};

export default PrivateRoute;
