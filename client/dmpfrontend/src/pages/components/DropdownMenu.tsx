import React, { useState, useEffect } from 'react';

interface DropdownMenuProps {
    title: string;
    children: React.ReactNode;
    className?: string;
    onToggle?: (isOpen: boolean) => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ title, children, className, onToggle }) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (onToggle) {
            onToggle(isOpen);
        }
    }, [isOpen, onToggle]);

    const handleToggle = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent form submission
        setIsOpen(!isOpen);
    };

    return (
        <div className={className}>
            <button onClick={handleToggle}>{title}</button>
            {isOpen && <div className="dropdown-menu">{children}</div>}
        </div>
    );
};

export default DropdownMenu;