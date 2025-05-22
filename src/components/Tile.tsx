import React from 'react';

export type TileStatus = 'correct' | 'present' | 'absent' | 'empty' | 'default';

interface TileProps {
    letter: string;
    status: TileStatus;
}

const Tile: React.FC<TileProps> = ({ letter, status }) => {

    const classNames = `tile ${letter ? 'filled' : 'empty'} ${status}`;

    return (
        <div className={classNames}>
            {letter}
        </div>
    );
};

export default Tile;