import React from 'react';

interface TileProps {
    letter: string;
}

const Tile: React.FC<TileProps> = ({ letter }) => {
    return (
        <div className={`tile ${letter ? 'filled' : 'empty'}`}>
            {letter}
        </div>
    );
};