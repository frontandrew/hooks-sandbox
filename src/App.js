import React, { useState, useEffect, useRef } from 'react';

const veryComplexCompute = (num) => {
  let i = 0;
  while (i < 1000000000) i++;
  return num;
};

const App = () => {
  const [number, setNumber] = useState(42);
  const [colored, setColored] = useState(false);

  const computed = veryComplexCompute(number);

  const btnStyle = { width: '30%' };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '400px',
        margin: '40px auto',
      }}>
      <h2 style={{ textAlign: 'center' }}>Calc value: {number}</h2>
      <button
        style={btnStyle}
        className='btn btn-success'
        onClick={() => setNumber((prev) => prev + 1)}>
        ADD
      </button>
      <button
        style={btnStyle}
        className='btn btn-danger'
        onClick={() => setNumber((prev) => prev - 1)}>
        DEL
      </button>
      <button
        style={btnStyle}
        className='btn btn-secondary'
        onClick={() => setColored((prev) => !prev)}>
        COLOR
      </button>
    </div>
  );
};

export default App;
