import { Suspense } from 'react';
import Loading from '@/components/Loading';
import Sidebar from '@/components/partials/sidebar';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="page-content page-min-height">
            <div className="container-fluid">
                <div className="flex">
                    <Sidebar />
                    <Suspense fallback={<Loading />}>
                        <div className="w-full block p-8">
                            <Breadcrumbs />
                            {<Outlet />}
                        </div>
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

export default Layout;
