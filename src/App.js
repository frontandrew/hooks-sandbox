import React, { useState, useMemo } from 'react';

const veryComplexCompute = (num) => {
  let i = 0;
  while (i < 1000000000) i++;
  return num;
};

const App = props => {

  const [number, setNumber] = useState(42);
  const [colored, setColored] = useState(false);

  /**useMemo */
  const computed = useMemo(() => veryComplexCompute(number), [number]);

  const color = colored ? 'grey' : 'darkgrey';
  const styles = {
    buttons: { width: '32%' },
    header: {
      textAlign: 'center',
      flexBasis: '100%',
      color: color,
    },

    root: {
      width: '100%',
      maxWidth: '400px',
      margin: '40px auto',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
  }

  return (
    <div
      style={styles.root}>
      <h2 style={styles.header}>Calc value: {number}</h2>
      <button
        style={styles.buttons}
        className='btn btn-success'
        onClick={() => setNumber((prev) => prev + 1)}>
        ADD
      </button>
      <button
        style={styles.buttons}
        className='btn btn-danger'
        onClick={() => setNumber((prev) => prev - 1)}>
        DEL
      </button>
      <button
        style={{ ...styles.buttons, background: color }}
        className='btn'
        onClick={() => setColored((prev) => !prev)}>
        COLOR
      </button>
    </div>
  );
};

export default App;
