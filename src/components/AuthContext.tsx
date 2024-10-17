import axios from "axios";
import { createContext, useState } from "react";
import { ReactNode } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface LoginDto {
  email: string;
  password: string;
  role: string;
}

interface AuthData {
  fullName: string;
  roleId: string;
  email: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
  token: string;
}

interface CustomJwtPayload extends JwtPayload {
  FullName: string;
  RoleId: string;
  Email: string;
  Phone: string;
  Gender: string;
  DateOfBirth: string;
}

interface AuthContextProps {
  authData: AuthData | null;
  login: (data: LoginDto) => Promise<string>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authData, setAuthData] = useState<AuthData | null>(null);

  const login = async (data: LoginDto): Promise<string> => {
      const response = await axios.post(
        "https://localhost:7007/api/Auth/login",
        data
      );

      localStorage.setItem("authToken", response.data.accessToken);

      const decodedToken = jwtDecode<CustomJwtPayload>(response.data.accessToken);
      // console.log(decodedToken);

      const userData: AuthData = {
        fullName: decodedToken.FullName,
        roleId: decodedToken.RoleId,
        email: decodedToken.Email,
        phone: decodedToken.Phone,
        gender: decodedToken.Gender,
        dateOfBirth: decodedToken.DateOfBirth,
        token: response.data.accessToken,
      };

      // console.log(userData);
      setAuthData(userData);
      return userData.roleId;
      // console.log(userData);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setAuthData(null);
  };

  return (
    <AuthContext.Provider value={{ authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
