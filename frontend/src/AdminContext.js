import { useState } from "react";
import { createContext } from "react";
//to create Content  
export const AdminContext = createContext();
export const AdminProvider = ({ children ,currentUser}) => {
  //to share this data across the components
  const [loggedIn, setloggedIn] = useState(currentUser!==null);
  return (
    <AdminContext.Provider value={{ loggedIn, setloggedIn }}>
      {children}
    </AdminContext.Provider>
  );
};