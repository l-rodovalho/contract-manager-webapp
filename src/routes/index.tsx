import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { ContractsList } from '../features/contracts/ContractsList';

const Dashboard = () => <div><h1>Visão Geral</h1></div>;

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { index: true, element: <Dashboard /> },
            { path: 'contracts', element: <ContractsList /> },
        ],
    },
]);

export default function AppRouter() {
    return <RouterProvider router={router} />;
}