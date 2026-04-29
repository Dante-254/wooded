import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { auth } from "../firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  /*signInWithRedirect,*/
  signOut,
  onAuthStateChanged,
  type User,
  getRedirectResult,
} from "firebase/auth";

const ADMIN_EMAILS = ["giciadaniel575@gmail.com"];

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRedirectResult(auth).then((result) => {
      if (result?.user) {
        console.log("Redirect result user:", result.user.email);
      }
    });

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed:", currentUser?.email);
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };
  // const login = () => {
  //   console.log("login clicked");
  //   const provider = new GoogleAuthProvider();
  //   signInWithRedirect(auth, provider);
  // };

  const logout = () => signOut(auth);

  const isAdmin = ADMIN_EMAILS.includes(user?.email ?? "");

  return (
    <>
      <AuthContext.Provider value={{ user, isAdmin, loading, login, logout }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
