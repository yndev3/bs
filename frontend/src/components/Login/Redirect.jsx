import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAccount } from 'wagmi';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isConnected } = useAccount();

    return (
        <Route 
            {...rest} 
            render={props => 
              isConnected ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/wallet-connect" /> 
                )
            }
        />
    );
};

export default PrivateRoute;