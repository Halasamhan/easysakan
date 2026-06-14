import { Navigate } from 'react-router-dom';

const PARTNER_ROLES = ['provider', 'service_provider'];

export default function ProtectedRoute({ children, requireRole, customerOnly }) {
  const session = localStorage.getItem('hf_session');
  const role    = localStorage.getItem('hf_role');

  if (session !== 'active') {
    return <Navigate to="/login" replace />;
  }

  // Partners cannot access customer-only pages
  if (customerOnly && PARTNER_ROLES.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  if (requireRole && role !== requireRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}

/** Wrap public (no-login-required) routes to redirect logged-in partners away. */
export function PartnerRedirect({ children }) {
  const session = localStorage.getItem('hf_session');
  const role    = localStorage.getItem('hf_role');

  if (session === 'active' && PARTNER_ROLES.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
