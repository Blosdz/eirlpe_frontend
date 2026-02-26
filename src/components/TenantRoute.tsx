import { Navigate, Outlet } from 'react-router-dom';
import { useTenantAuth } from '../context/TenantAuthContext';

export default function TenantRoute() {
    const { isAuthenticated } = useTenantAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}
