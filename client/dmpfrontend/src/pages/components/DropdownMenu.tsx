import React, { useState } from 'react';

interface DropdownMenuProps {
    title: string;
    children: React.ReactNode;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <button onClick={() => setIsOpen(!isOpen)}>{title}</button>
            {isOpen && <div className="dropdown-menu">{children}</div>}
        </div>
    );
};

export default DropdownMenu;