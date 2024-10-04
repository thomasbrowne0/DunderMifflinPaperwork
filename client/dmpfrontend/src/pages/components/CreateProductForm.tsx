import React, { useState } from 'react';

const CreateProductForm: React.FC = () => {
    const [paperName, setPaperName] = useState('');
    const [discontinued, setDiscontinued] = useState(false);
    const [stock, setStock] = useState(0);
    const [price, setPrice] = useState(0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log({ paperName, discontinued, stock, price });
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