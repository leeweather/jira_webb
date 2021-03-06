import React, { ReactNode, useContext } from "react";
import * as auth from "auth-provider";
import { User } from "scrrens/project-list/search-panel";
import { http } from "utils/http";
import { useMount } from "utils";
import { useAsync } from "utils/use-async";
import { FullLoading, FullPageErrorFallback } from "components/lib";
interface AuthForm {
  username: string;
  password: string;
}

const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

const AuthContext = React.createContext<
  | {
      user: User | null;
      login: (form: AuthForm) => Promise<void>;
      register: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    setData: setUser,
    isIdle,
    isError,
    isLoading,
    run,
    error,
  } = useAsync<User | null>();

  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then((res) => window.location.reload());

  useMount(() => {
    run(bootstrapUser());
  });

  if (isIdle || isLoading) {
    return <FullLoading></FullLoading>;
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    ></AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth必须在AuthProvider内部使用");
  }

  return context;
};
