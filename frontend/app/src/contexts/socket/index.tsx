import React, { useState } from "react";
import SocketContext from './context'
const SocketProvider = (props:any) => {

  const [value, setValue] = useState({
    socket: io()
  });

  return(
      <SocketContext.Provider value={ value }>
        { props.children }
      </SocketContext.Provider>
    )
};

export default SocketProvider;