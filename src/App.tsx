import React, { useState, useEffect } from 'react';
import './App.css';
import Board from './components/Board';
import type { TileStatus } from './components/Tile';

// Game constants
const MAX_GUESSES = 6;
const WORD_LENGTH = 5;

// Helper function to evaluate the guess
const evaluateGuess = (guess: string, solution: string): TileStatus[] => {
    const splitSolution = solution.split('');
    const splitGuess = guess.split('');

    const result: TileStatus[] = Array(solution.length).fill('absent');
    const solutionLetterCount: Record<string, number> = {};

    // Count occurrences of each letter in the solution
    splitSolution.forEach(letter => {
        solutionLetterCount[letter] = (solutionLetterCount[letter] || 0) + 1;
    });

    // First pass: Mark correct letters (green)
    splitGuess.forEach((letter, index) => {
        if (letter === splitSolution[index]) {
            result[index] = 'correct';
            solutionLetterCount[letter]--;
        }
    });

    // Second pass: Mark present letters (yellow)
    splitGuess.forEach((letter, index) => {
        if (result[index] !== 'correct') { // Only process if not 'correct'
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
    // Initialize guessesStatus with 'empty' for all tiles
    const [guessesStatus, setGuessesStatus] = useState<TileStatus[][]>(
        Array(MAX_GUESSES).fill(null).map(() => Array(WORD_LENGTH).fill('empty'))
    );
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
                    // Evaluate the current guess
                    const currentGuessEvaluation = evaluateGuess(currentGuess, solutionWord);

                    const newGuesses = [...guesses];
                    newGuesses[currentAttempt] = currentGuess;
                    setGuesses(newGuesses);

                    // Update the statuses of the guesses
                    const newGuessesStatus = [...guessesStatus];
                    newGuessesStatus[currentAttempt] = currentGuessEvaluation;
                    setGuessesStatus(newGuessesStatus);

                    setCurrentAttempt(prev => prev + 1);
                    setCurrentGuess('');

                    console.log('Submitted guess:', currentGuess);
                    console.log('Guess status:', currentGuessEvaluation); // For debugging

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
        // Corrected dependency array
    }, [currentGuess, guesses, currentAttempt, solutionWord, guessesStatus]);

    const displayGuesses = [...guesses];
    if (currentAttempt < MAX_GUESSES) {
        displayGuesses[currentAttempt] = currentGuess;
    }

    // Debug logs (can be removed later)
    // console.log('App Solution Word:', solutionWord);
    // console.log('App Guesses (committed):', guesses);
    // console.log('App Guesses Status:', guessesStatus);
    // console.log('App Current Guess:', currentGuess);
    // console.log('App Current Attempt:', currentAttempt);

    return (
        <div className="App">
            <header>
                <h1>Wordle Game</h1>
            </header>
            <main>
                <Board
                    guesses={displayGuesses}
                    // solutionWord={solutionWord} // Not directly needed by Board if statuses are passed
                    wordLength={WORD_LENGTH}
                    guessesStatus={guessesStatus} // Pass statuses to Board
                />
            </main>
        </div>
    );
}
export default App;