import React, { useState, useEffect } from 'react';
import './App.css';
import Board from './components/Board';
import { TileStatus } from './components/Tile';

// Game constants
const MAX_GUESSES = 6;
const WORD_LENGTH = 5;

const evaluateGuess = (guess: string, solutionWord: string): TileStatus[] => {
    const splitSolution = solution.split('');
    const splitGuess = guess.split('');

    const result: TileStatus[] = Array(solution.length).fill('absent');
    const solutionLetterCount: Record<string, number> = {};

    splitSolution.forEach(letter => {
        solutionLetterCount[letter] = (solutionLetterCount[letter] || 0) + 1;
    });

    splitGuess.forEach((letter, index) => {
        if (letter === splitSolution[index]) {
            result[index] = 'correct';
            solutionLetterCount[letter]--;
        }
    });

    splitGuess.forEach((letter, index) => {
        if (result[index] !== 'correct') {
            if (splitSolution.includes(letter) && solutionLetterCount[letter] > 0) {
                result[index] = 'present';
                solutionLetterCount[letter]--;
            }
        }
    });

    return result;
};

function App() {
    const [solutionWord, setSolutionWord] = useState<string>('REACT');
    const [guesses, setGuesses] = useState<string[]>(Array(MAX_GUESSES).fill(''));
    const [guessesStatus, setGuessesStatus] = useState<TileStatus[][]>(Array(MAX_GUESSES).fill(Array(WORD_LENGTH).fill('empty')));
    const [currentGuess, setCurrentGuess] = useState<string>('');
    const [currentAttempt, setCurrentAttempt] = useState<number>(0);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (currentAttempt >= MAX_GUESSES) {
                return;
            }

            const { key } = event;

            if (key === 'Enter') {
                if (currentGuess.length === WORD_LENGTH) {
                    const newGuesses = [...guesses];
                    newGuesses[currentAttempt] = currentGuess;
                    setGuesses(newGuesses);
                    setCurrentAttempt(prev => prev + 1);
                    setCurrentGuess('');

                    console.log('Submitted guess:', currentGuess);

                } else {
                    console.log('Word not long enough');
                }
                return;
            }
            if (key === 'Backspace') {
                setCurrentGuess(prev => prev.slice(0, -1));
                return;
            }

            if (/^[a-zA-Z]$/.test(key)) {
                if (currentGuess.length < WORD_LENGTH) {
                    setCurrentGuess(prev => prev + key.toUpperCase());
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };

    }, [currentGuess, guesses, currentAttempt, solutionWord]);, guessesStatus]);

    const displayGuesses = [...guesses];
    if (currentAttempt < MAX_GUESSES) {
        displayGuesses[currentAttempt] = currentGuess;
    }

    console.log('App Solution Word:', solutionWord);
    console.log('App Guesses (committed):', guesses);
    console.log('App Current Guess:', currentGuess);
    console.log('App Current Attempt:', currentAttempt);

    return (
        <div className="App">
            <header>
                <h1>Wordle Game</h1>
            </header>
            <main>
                <Board
                    guesses={displayGuesses}
                    solutionWord={solutionWord}
                    wordLength={WORD_LENGTH}
                />
            </main>
        </div>
    );
}
export default App;