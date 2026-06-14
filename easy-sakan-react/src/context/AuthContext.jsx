import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const AuthContext = createContext(null);

function buildUser() {
  const session = localStorage.getItem('hf_session');
  if (session !== 'active') return null;
  return {
    id: localStorage.getItem('hf_custID'),
    name: localStorage.getItem('hf_fname') || 'User',
    email: localStorage.getItem('hf_email') || '',
    role: localStorage.getItem('hf_role') || 'customer',
    avatar: (localStorage.getItem('hf_fname') || 'U')[0].toUpperCase(),
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(buildUser);
  const [isSeller, setIsSeller] = useState(() => localStorage.getItem('hf_is_seller') === 'true');

  const login = useCallback(async (fname, custID, email = '', role = 'customer') => {
    localStorage.setItem('hf_session', 'active');
    localStorage.setItem('hf_fname', fname);
    localStorage.setItem('hf_custID', custID);
    if (email) localStorage.setItem('hf_email', email);
    localStorage.setItem('hf_role', role);
    setUser({ id: String(custID), name: fname, email, role, avatar: fname[0].toUpperCase() });

    // Check DB-backed seller status for customers
    if (role === 'customer') {
      try {
        const res  = await fetch(`http://localhost/easysakan/become_seller_handler.php?cust_id=${custID}`, { credentials: 'include' });
        const data = await res.json();
        const seller = data.is_seller === true;
        localStorage.setItem('hf_is_seller', String(seller));
        setIsSeller(seller);
      } catch { /* keep existing value */ }
    }
  }, []);

  const isLoggedIn = user !== null;

  const logout = useCallback(() => {
    localStorage.removeItem('hf_session');
    localStorage.removeItem('hf_fname');
    localStorage.removeItem('hf_custID');
    localStorage.removeItem('hf_email');
    localStorage.removeItem('hf_role');
    localStorage.removeItem('hf_is_seller');
    setUser(null);
    setIsSeller(false);
  }, []);

  // Re-verify seller status from DB on every app load if session is active
  useEffect(() => {
    const custID = localStorage.getItem('hf_custID');
    const role   = localStorage.getItem('hf_role');
    if (!custID || role !== 'customer') return;
    fetch(`http://localhost/easysakan/become_seller_handler.php?cust_id=${custID}`, { credentials: 'include' })
      .then(r => r.json())
      .then(data => {
        const seller = data.is_seller === true;
        localStorage.setItem('hf_is_seller', String(seller));
        setIsSeller(seller);
      })
      .catch(() => {});
  }, []);

  const markAsSeller = useCallback(() => {
    localStorage.setItem('hf_is_seller', 'true');
    setIsSeller(true);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout, isSeller, markAsSeller }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx) return ctx;
  const user = buildUser();
  return {
    user,
    isLoggedIn: user !== null,
    logout: () => {},
    isSeller: localStorage.getItem('hf_is_seller') === 'true',
    markAsSeller: () => {},
  };
}
