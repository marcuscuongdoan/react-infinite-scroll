import { LoginForm, ScrollList } from "./components";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import { createContext, useEffect, useState } from "react";
import { TUser } from "./type";

const queryClient = new QueryClient();

export const UserContext = createContext<{
  user?: TUser;
  setUser: (user?: TUser) => void;
}>({
  user: undefined,
  setUser: () => {},
});

function App() {
  const [user, setUser] = useState<TUser>();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setUser(JSON.parse(user));
  }, []);
  return (
    <QueryClientProvider client={queryClient} contextSharing>
      <UserContext.Provider value={{ user: user, setUser: setUser }}>
        <div className="App">
          {!user && <LoginForm />}
          {user && <ScrollList />}
        </div>
      </UserContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
