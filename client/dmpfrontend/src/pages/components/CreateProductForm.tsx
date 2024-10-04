import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { papersAtom } from '../../atoms/Atoms';
import { createPaper } from '../../services/PaperService';
import DropdownMenu from './DropdownMenu';

const CreateProductForm: React.FC = () => {
    const [paperName, setPaperName] = useState('');
    const [discontinued, setDiscontinued] = useState(false);
    const [stock, setStock] = useState(0);
    const [price, setPrice] = useState(0);
    const [customProperty, setCustomProperty] = useState('');
    const [isCustomPropertyOpen, setIsCustomPropertyOpen] = useState(false);
    const [, setPapers] = useAtom(papersAtom);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (paperName.trim() === '') {
            setError('Paper name cannot be empty');
            return;
        }
        setError('');
        try {
            const createPaperRequest = {
                name: paperName,
                discontinued,
                stock,
                price,
            } as any;
            if (isCustomPropertyOpen && customProperty.trim() !== '') {
                createPaperRequest.propertyName = customProperty;
            }
            const createdPaper = await createPaper(createPaperRequest);
            // @ts-ignore
            setPapers((prevPapers) => [...prevPapers, createdPaper]);
            console.log('Paper created successfully');
        } catch (error) {
            console.error('Error creating paper:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Paper Name:</label>
                <input
                    type="text"
                    value={paperName}
                    onChange={(e) => setPaperName(e.target.value)}
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
            <div>
                <label>Discontinued:</label>
                <input
                    type="checkbox"
                    checked={discontinued}
                    onChange={(e) => setDiscontinued(e.target.checked)}
                />
            </div>
            <div>
                <label>Stock:</label>
                <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                />
            </div>
            <div>
                <label>Price:</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                />
            </div>
            <DropdownMenu
                title="Set custom property?"
                className="darker-dropdown"
                onToggle={(isOpen) => setIsCustomPropertyOpen(isOpen)}
            >
                <div>
                    <label>Custom Property Name:</label>
                    <input
                        type="text"
                        value={customProperty}
                        onChange={(e) => setCustomProperty(e.target.value)}
                    />
                </div>
            </DropdownMenu>
            <button type="submit">Create Product</button>
        </form>
    );
};

export default CreateProductForm;