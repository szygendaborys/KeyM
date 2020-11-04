import React, { useContext } from 'react';

const host = 'http://localhost:8000'; // to be changed later on
const hostApi = `${host}/api`;

const HostContext = React.createContext({host, hostApi});

export const useHost = () => useContext(HostContext);

export default useHost;

// Example usage : const { hostApi } = useHost();
