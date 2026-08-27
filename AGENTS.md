This file provides guidance to AI agents (like Codex, Copilot, etc.) when working in this repository.
Project Overview

A single-page React app for children (ages 6–10) to practice multiplication tables. The app is a quiz with 10 questions per round, typed answers, immediate feedback, accumulating stars, and progress tracking. It supports three languages: English, Russian, and Belarusian (classic). The UI is mobile-first, colorful, and cartoonish.

## Tech Stack

    React (with hooks, functional components only)

    Vite (build tool)

    JavaScript (ES6+) – no TypeScript

    CSS (plain CSS in a single styles.css file)

    localStorage for persistent data (stars, table stats, language)

## Commands

    npm install – install dependencies

    npm run dev – start development server

    npm run build – create production build

    npm run preview – preview production build

## Project Structure
```text
src/
├── components/
│   ├── StartScreen.jsx
│   ├── QuizScreen.jsx
│   ├── ResultScreen.jsx
│   ├── LanguageSwitcher.jsx
│   ├── StarDisplay.jsx
│   └── FeedbackMessage.jsx
├── hooks/
│   └── useLocalStorage.js
├── utils/
│   ├── translations.js
│   ├── questionGenerator.js
│   └── stats.js
├── App.jsx
├── main.jsx
└── styles.css
```

## Coding Conventions

    Functional components only – no class components.

    Small, pure functions – keep functions short and focused; extract logic into utils/ when possible.

    Custom hooks – use hooks for reusable stateful logic (e.g., useLocalStorage).

    No external state management – useState and props are sufficient.

    Language handling – all user-facing strings must come from translations.js (object with keys en, ru, by).

    Persistence – always use the useLocalStorage hook for data that must persist (stars, stats, language). Do not directly manipulate localStorage in components.

    Styling – use the classes defined in styles.css; do not add inline styles unless absolutely necessary. The design is mobile-first and uses CSS variables defined in :root.

    Imports – use relative imports; keep import order consistent (React, components, hooks, utils).

    No sound – no audio features; do not add any.

## State Management

    App.jsx manages the main application state:

        language (via useLocalStorage)

        totalStars (via useLocalStorage)

        tableStats (via useLocalStorage)

        screen (local state: 'start' | 'quiz' | 'result')

        questions (local state)

        lastScore (local state)

    QuizScreen manages its own internal state:

        currentIndex, userAnswer, feedback, answers

    All cross-component communication is via props and callbacks.

## Data Structures

    Table stats (tableStats): object where each key is a table number (e.g., 3) and value is { correct, wrong, total }.

    Questions: array of objects { a, b } where a and b are integers (2–9).

    Answers (passed from QuizScreen to App): array of { a, b, isCorrect }.

## Key Utilities

    generateWeightedQuestions(count, tableStats) – returns count questions with hard tables more likely.

    updateTableStats(prevStats, table, isCorrect) – returns new stats object.

    getHardTables(tableStats, threshold = 0.3, minAttempts = 3) – returns array of table numbers that need practice.

    translations – object containing all UI strings per language.

## Adding or Modifying Features

    Add a new language: add a new key to translations.js with all required strings, and add the language code/label to LanguageSwitcher.jsx.

    Change number of questions: update QUESTIONS_PER_ROUND in App.jsx.

    Adjust timing: modify the setTimeout delays in QuizScreen.jsx (currently 1200ms for correct, 2000ms for incorrect).

    Modify star rewards: update the earnedStars calculation in App.jsx (currently 1 star per correct, +3 bonus for perfect round).

    Add sound: not allowed per project requirements.

## Important Notes

    Feedback block stability: FeedbackMessage must always render a container with a class feedback and appropriate modifier (correct, wrong, or empty) to maintain layout height. Do not conditionally mount it.

    Autofocus: The answer input in QuizScreen must have autoFocus and be disabled after submission.

    No external libraries besides React and Vite – do not add additional dependencies without explicit user request.

    Accessibility: Buttons and inputs should be easily tappable on mobile (large hit areas, appropriate font-size). Keep contrast high.

## Testing

    Manually test language switching, star accumulation, persistence after page reload, and weighted question distribution.

    Ensure no console errors or warnings.
