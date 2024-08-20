import { createContext, useState } from "react";


export const StoreContext = createContext(null)

const StoreContextProvider = (props) =>{
  const url = "http://localhost:3000"
  const [token, setToken] = useState(localStorage.getItem('token') || "")

  const contextvalue = {
    url,
    token,
    setToken
  }


  return (
    <StoreContext.Provider value={contextvalue}>
      {props.children}
    </StoreContext.Provider>
  );

}

export default StoreContextProvider;
