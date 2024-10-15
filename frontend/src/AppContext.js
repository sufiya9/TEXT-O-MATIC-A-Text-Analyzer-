import { useState } from "react";
import { createContext } from "react";
//to create Content  
export const AppContext = createContext();
export const AppProvider = ({ children ,currentUser}) => {
  //to share this data across the components
  const [loggedIn, setloggedIn] = useState(currentUser!==null);
  return (
    <AppContext.Provider value={{ loggedIn, setloggedIn }}>
      {children}
    </AppContext.Provider>
  );
};