import { createContext, useState } from "react";
import { db } from "./firebase.setting";
import { getDocs, collection } from "firebase/firestore";
import { useEffect } from "react";

const AppContext = createContext();

const FacepalContext = ({ children }) => {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    const onSnapShot = await getDocs(collection(db, "users"));
    setUsers(
      onSnapShot.docs.map((doc) => {
        return {
          id: doc.id,
          data: {
            ...doc.data(),
          },
        };
      })
    );
  };

  useEffect(() => {
    getUsers();
  }, []);
  // const [ip,setIp] = useState('192.168.1.1');
  // const [signedIn,setSignedIn] = useState(false);

  return (
    <AppContext.Provider value={{ users }}>{children}</AppContext.Provider>

    //shift + alt + arrow down ==== duplicate

    // <AppContext.Provider value={{ip,setIp,signedIn,setSignedIn}}>
    //     {children}
    // </AppContext.Provider>
  );
};

export { AppContext, FacepalContext };
