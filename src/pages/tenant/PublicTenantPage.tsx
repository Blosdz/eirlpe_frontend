import { useTenantAuth } from '../../context/TenantAuthContext';

export default function PublicTenantPage() {
    const { tenantHost } = useTenantAuth();
    // Extract subdomain only: "test.localhost:3000" → "test", "test.eirl.pe" → "test"
    const tenant = tenantHost.split('.')[0];

    return (
        <div className="w-full h-screen overflow-hidden bg-white">
            <iframe
                src={`/api/tenant-page?tenant=${tenant}`}
                className="w-full h-full border-0"
                title={`${tenant} public site`}
            />
        </div>
    );
}
