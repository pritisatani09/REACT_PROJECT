import { useState } from "react";
import './Calculater.css';

const Button = () => {
  const [list] = useState(['7','8','9','+','4','5','6','-','1','2','3','*','.','0','/']);
  const [input, setInput] = useState('0');

  const handleClick = (val) => {
    setInput(prev => (prev === '0' ? val : prev + val));
  };

  const handleClear = () => {
    setInput('0');
  };

  const handleEvaluate = () => {
    try {
      const result = eval(input);
      setInput(result.toString());
    } catch (error) {
      setInput('Error');
    }
  };

  return (
    <>
      <header>
        <h1>Calculator</h1>
      </header>
      <div className="calculator">
        <input type="text" value={input} readOnly />
        <div className="button-grid">
          <button onClick={handleClear} className="clear-button">Clear</button>
          {list.map((item, index) => (
            <button onClick={() => handleClick(item)} key={index}>
              {item}
            </button>
          ))}
          <button className="eq-btn" onClick={handleEvaluate}>=</button>
        </div>
      </div>
    </>
  );
};

export default Button;
