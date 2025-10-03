import React, { useContext } from "react";

const server_url = import.meta.env.VITE_URI;

export const serverContext = React.createContext(server_url);

export const useServerContext = () => {
  return useContext(serverContext);
};
export default function Server({ children }) {
  return (
    <serverContext.Provider value={server_url}>
      {children}
    </serverContext.Provider>
  );
}
