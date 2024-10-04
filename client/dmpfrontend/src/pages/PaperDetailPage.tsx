import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPaper, updatePaper } from '../services/PaperService';

const PaperDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [paper, setPaper] = useState<any>(null);
    const [stockChange, setStockChange] = useState(0);

    useEffect(() => {
        const getPaper = async () => {
            try {
                const data = await fetchPaper(Number(id));
                setPaper(data);
            } catch (error) {
                console.error('Error fetching paper:', error);
            }
        };

        getPaper();
    }, [id]);

    const handleDiscontinuedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPaper({ ...paper, discontinued: e.target.checked });
    };

    const handleStockIncrement = () => {
        setStockChange(stockChange + 10);
    };

    const handleStockDecrement = () => {
        setStockChange(stockChange - 10);
    };

    const handleSaveChanges = async () => {
        try {
            const updatedPaper = {
                ...paper, // Spread the original paper properties
                discontinued: paper.discontinued,
                stock: paper.stock + stockChange
            };
            await updatePaper(Number(id), updatedPaper);
            setPaper(updatedPaper);
            setStockChange(0);
            console.log('Paper updated successfully');
        } catch (error) {
            console.error('Error updating paper:', error);
        }
    };

    if (!paper) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{paper.name}</h1>
            <p>Discontinued:
                <input
                    type="checkbox"
                    checked={paper.discontinued}
                    onChange={handleDiscontinuedChange}
                />
            </p>
            <p>
                Stock: {paper.stock} {stockChange !== 0 && `(${stockChange >= 0 ? '+' : ''}${stockChange})`}
                <button onClick={handleStockIncrement}>+10</button>
                <button onClick={handleStockDecrement}>-10</button>
            </p>
            <p>Price: ${paper.price}</p>
            {paper.propertyName && <p>Custom Property: {paper.propertyName}</p>}
            <button onClick={handleSaveChanges}>Save changes</button>
        </div>
    );
};

export default PaperDetailPage;