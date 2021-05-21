import React from 'react';

const userContext = React.createContext({
    user: { profile: {}},
    setUser: () => {}    
});

export { userContext };