import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Simple Calculator
// Objective:
// Build a fully functional calculator using React that allows users to perform basic arithmetic operations such
// as addition. subtraction, multiplication. and division. The focus will be on implementing event handling using
// onC1ick for button clicks to peform
// Functionality:
// 1. Basic Operations: The calculator should support the fillowing operations:
// Addition (+)
// Subtraction (-)
// Multiplication (x)
// Division (+)
// 2. Numberlnput:Buttons for numbers (0-9) and a decimal point for entering numerical values.
// 3. Clear& Equals: Include a "C" button to clear the currentinputandan "=" button to display the
// result.
// 4. Input Display: A display areaatthe top to show the entered numbers and the result of the
// c alculations.Display
// Requ irements:
// Use Reut onal components and hooks.
// • Handle button clicks using the onC1ick eventto capture user inputand pafirmcalculations.
// Maintain the current input and resultin the component's state.
// Ensure that the cal culatorhandles edge cases such as division by zero.
// Bonus:
// Add basic styling to make the calculator visually appealing.
// Skills Focus:
// • Handling user input with onC1ick events.
// Managing state with React hooks.
// • Implementing basi c arithmetic logic in JavaScript.