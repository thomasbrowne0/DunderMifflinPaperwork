import React, { useState } from 'react';

interface DropdownMenuProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ title, children, className }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={className}>
            <button onClick={() => setIsOpen(!isOpen)}>{title}</button>
            {isOpen && <div className="dropdown-menu">{children}</div>}
        </div>
    );
};

export default DropdownMenu;