import React from 'react';

export type TileStatus = 'correct' | 'present' | 'absent' | 'empty' | 'default';

interface TileProps {
    letter: string;
    status: TileStatus;
}

const Tile: React.FC<TileProps> = ({ letter, status }) => {
    return (
        <div className={`tile ${letter ? 'filled' : 'empty'} ${status}`}>
            {letter}
        </div>
    );
};

export default Tile;