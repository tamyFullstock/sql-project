import React, {createContext, useContext, useState, useEffect}  from 'react'

const UserContext = createContext();
const SetUserContext = createContext();
const FetchErrorContext = createContext();
const SetFetchErrorContext = createContext();

//functions to make all children components know the sates and inherit them.

export function useUser(){
    return useContext(UserContext);
}

export function useSetUser(){
    return useContext(SetUserContext);
}

export function useFetchError(){
    return useContext(FetchErrorContext);
}

export function useSetFetchError(){
    return useContext(SetFetchErrorContext);
}

export function ThemeProvider({children}) {
  const [user, setUser] = useState({}
  );
  const [fetchError, setFetchError] = useState(false);

  //save change in user in local storage in object called "user"
  useEffect(
    ()=>{
        localStorage.setItem("user", JSON.stringify(user));
    },[user]
  )

  return (
    <UserContext.Provider value = {user}>
        <SetUserContext.Provider value = {setUser}>
            <FetchErrorContext.Provider value = {fetchError}>
                <SetFetchErrorContext.Provider value = {setFetchError}>
                    {children}
                </SetFetchErrorContext.Provider>
            </FetchErrorContext.Provider>
        </SetUserContext.Provider>
    </UserContext.Provider>
  )
}


