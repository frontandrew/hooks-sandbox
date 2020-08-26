import React, { useState } from 'react';

const calcCounter = () => {
  console.log('calced!!');
  return Math.trunc(Math.random() * 10);
};

const App = () => {
  const [counter, setCounter] = useState(calcCounter);

  const inc = () => {
    // Увеличение счетчика 2 раза подряд не сработает
    // тк useState реботает асинхронно.
    //
    // setCounter(counter + 1);
    // setCounter(counter + 1);
    //
    // В связи с этим хук можно вызвать используя
    // предыдыущее состояние:

    setCounter((prevState) => prevState + 1);
    setCounter((prevState) => prevState + 1);

    // Такой подход позволяет избежать сайд-эффектов
  };
  const dec = () => setCounter(counter - 2);

  /**State содержит обьект */
  const [state, setState] = useState({
    title: 'Counter',
    date: Date.now(),
  });

  return (
    <div>
      <h2>Counter: {counter}</h2>
      <button className='btn btn-success' onClick={inc}>
        INC
      </button>
      <button className='btn btn-danger' onClick={dec}>
        DEC
      </button>
      <button
        className='btn btn-default'
        /**Для корректного изменения стэйта, содержащего обьект,
         * бэст практис пользоваться деструктуризацией предыдущего state */
        onClick={() => setState((prev) => ({ ...prev, title: 'Каунтер' }))}>
        NAME
      </button>

      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
};

export default App;
