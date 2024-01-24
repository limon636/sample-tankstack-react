import { Suspense, lazy } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Routes } from 'react-router-dom';
import Loading from '@/components/Loading';
import LockScreen from './pages/LockScreen';
import Layout from './layout/Layout';
import Dashboard from './pages/Dashboard';

const List = lazy(() => import('@/pages/posts/List'));
const Edit = lazy(() => import('@/pages/posts/Edit'));
const PostAdd = lazy(() => import('@/pages/posts/Add'));

const queryClient = new QueryClient();

function App() {
    return (
        <main>
            <QueryClientProvider client={queryClient}>
                <Routes>
                    <Route
                        path="/lock-screen"
                        element={
                            <Suspense fallback={<Loading />}>
                                <LockScreen />
                            </Suspense>
                        }
                    />

                    <Route path="/*" element={<Layout />}>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="post" element={<List />} />
                        <Route path="post/create" element={<PostAdd />} />
                        <Route path="edit/:id" element={<Edit />} />
                    </Route>
                </Routes>
            </QueryClientProvider>
        </main>
    );
}

export default App;
