import React, { useState } from 'react';
import './App.css';
import Board from './components/Board';

// Game constants
const MAX_GUESSES = 6;
const WORD_LENGTH = 5;

function App() {
    const [solutionWord, setSolutionWord] = useState<string>('REACT');
    const [guesses, setGuesses] = useState<string[]>(Array(MAX_GUESSES).fill(''));

    console.log('Solution Word:', solutionWord);
    console.log('Guesses:', guesses);

    return (
        <div className="App">
            <header>
                <h1>Wordle Game</h1>
            </header>
            <main>
                <Board
                    guesses={guesses}
                    solutionWord={solutionWord}
                    wordLength={WORD_LENGTH}
                />
            </main>
        </div>
        );
}
export default App;
