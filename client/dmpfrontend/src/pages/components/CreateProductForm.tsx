import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { papersAtom } from '../../atoms/Atoms';
import { createPaper } from '../../services/PaperService';

const CreateProductForm: React.FC = () => {
    const [paperName, setPaperName] = useState('');
    const [discontinued, setDiscontinued] = useState(false);
    const [stock, setStock] = useState(0);
    const [price, setPrice] = useState(0);
    const [, setPapers] = useAtom(papersAtom);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newPaper = {
                name: paperName,
                discontinued,
                stock,
                price
            };
            const createdPaper = await createPaper(newPaper);
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
            <button type="submit">Create Product</button>
        </form>
    );
};

export default CreateProductForm;