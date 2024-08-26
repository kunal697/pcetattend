import React from "react";
import { useState } from "react";
import { createContext } from "react";
const Infocontex = createContext();


const InfoProvider = ({ children }) => {
  const [total, settotal] = useState(1);
  const [Perc,setPerc] = useState(0);


  return (
    <Infocontex.Provider value={{ total, settotal , Perc,setPerc }}>
      {children}
    </Infocontex.Provider>
  );
};

export { InfoProvider };
export default Infocontex;
