import React from 'react';
import Row from './Row';
import type { TileStatus } from './Tile';

// Props that the Board component will receive
interface BoardProps {
    guesses: string[];
    wordLength: number;
    guessesStatus: TileStatus[][];
}

// Functional component for the Board
const Board: React.FC<BoardProps> = ({ guesses, wordLength, guessesStatus }) => {

    return (
        <div className="board">
            {guesses.map((guess, index) => (
                <Row
                    key={index}
                    guess={guess}
                    wordLength={wordLength}
                    statuses={guessesStatus[index]}
                />
            ))}
        </div>
    );
};

export default Board;