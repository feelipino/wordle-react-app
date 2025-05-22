import React from 'react';
import Tile from './Tile';

interface RowProps {
    guess: string;
    wordLength: number;
}
const Row: React.FC<RowProps> = ({ guess, wordLength }) => {
    const tiles = Array(wordLength).fill(null);

    return (
        <div className="row">
            {tiles.map((_, index) => {
                const letter = guess[index] || '';
                return(
                    <Tile key={index} letter={letter} />
                );
            })}
        </div>
    );
};

export default Row;