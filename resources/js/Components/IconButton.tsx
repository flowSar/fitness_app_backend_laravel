import { ReactNode } from 'react';

interface IconButtonProps {
    children: ReactNode;
    onClick: () => void;
}
function IconButton({ children, onClick }: IconButtonProps) {
    return (
        <button className="text-blue-400 transition-colors hover:text-blue-300" onClick={onClick}>
            {children}
        </button>
    );
}

export default IconButton;
