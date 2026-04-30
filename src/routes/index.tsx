import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';

const Dashboard = () => <div><h1>Visão Geral</h1></div>;
const Contracts = () => <div><h1>Gestão de Contratos</h1></div>;

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { index: true, element: <Dashboard /> },
            { path: 'contracts', element: <Contracts /> },
        ],
    },
]);

export default function AppRouter() {
    return <RouterProvider router={router} />;
}