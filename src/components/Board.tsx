import React from 'react';
import Row from './Row';

// Props that the Board component will receive
interface BoardProps {
    guesses: string[];
    solutionWord: string;
    wordLength: number;
}

// Functional component for the Board
const Board: React.FC<BoardProps> = ({ guesses, solutionWord }) => {
    // Props test
    console.log('Board received guesses:', guesses);
    console.log('Board received solutionWord:', solutionWord);

    return (
        <div className="board">
            {guesses.map((guess, index) => (
                <Row
                    key={index}
                    guess={guess}
                    wordLength={solutionWord.length}
                    // solutionWord={solutionWord}
                />
            ))}
        </div>
    );
};

export default Board;