import React from 'react';

const locationContext = React.createContext({
    location: {},
    setLocation: () => {}    
});

export { locationContext };