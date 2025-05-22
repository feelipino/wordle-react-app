import React from 'react';
import Tile from './Tile';
import type { TileStatus } from './Tile';

interface RowProps {
    guess: string;
    wordLength: number;
    statuses: TileStatus[];
}
const Row: React.FC<RowProps> = ({ guess, wordLength, statuses }) => {
    const tiles = Array(wordLength).fill(null);

    return (
        <div className="row">
            {tiles.map((_, index) => {
                const letter = guess[index] || '';
                const status = statuses && statuses[index] ? statuses[index] : 'empty';
                return(
                    <Tile
                        key={index}
                        letter={letter}
                        status={status}
                    />
                );
            })}
        </div>
    );
};

export default Row;