import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';
import { useAccount } from 'wagmi';

const PrivateRoute = ({ component: Component, ...rest }) => {

    const { isAuthenticated } = useAuth();
    const { isConnected } = useAccount();
    
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
