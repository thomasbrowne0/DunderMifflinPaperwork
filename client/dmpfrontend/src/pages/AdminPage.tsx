import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import NavBar from './components/NavBar';
import DropdownMenu from './components/DropdownMenu';
import CreateProductForm from './components/CreateProductForm';
import { fetchPapers } from '../services/PaperService';
import { papersAtom } from '../atoms/Atoms';

const AdminPage: React.FC = () => {
    const [papers, setPapers] = useAtom(papersAtom);

    useEffect(() => {
        const getPapers = async () => {
            try {
                const data = await fetchPapers();
                setPapers(data);
            } catch (error) {
                console.error('Error fetching papers:', error);
            }
        };

        getPapers();
    }, [setPapers]);

    return (
        <div>
            <NavBar />
            <h1>All Papers</h1>
            <ul>
                {papers.map((paper: any) => (
                    <li key={paper.id}>{paper.name}</li>
                ))}
            </ul>
            <h1>Admin Page</h1>
            <p>Welcome to the Admin Page!</p>
            <DropdownMenu title="Create Product">
                <CreateProductForm />
            </DropdownMenu>
            {/* Add more buttons and dropdown menus as needed */}
        </div>
    );
};

export default AdminPage;