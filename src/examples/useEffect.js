import React, { useState, useEffect } from 'react';

const App = () => {
  const [type, setType] = useState('users');
  const [data, setData] = useState([]);
  const [pos, setPos] = useState({
    x: 0,
    y: 0,
  });

  /**В данном случае useEffect срабатывает только при изменении
   * стэйта 'type'. Вторым аргументом в useEffect можно передать
   * массив переменных (стэйтов), при изменении которых и будет вызван
   * колбэк.
   * Если же массив не передать useEffect будет вызывать колбэк при
   * каждом рендере.*/
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${type}`)
      .then((response) => response.json())
      .then((json) => setData(json));

    return () => console.log('clean type');
  }, [type]);

  /**Реализация жизненого цикла 'ComponentDidMount' на хуке useEffect
   * Вторым аргументом передан пустой массив. Вызывается только при
   * монтировании компонента */
  useEffect(() => {
    console.log('ComponentDidMount');
  }, []);

  /**Реализация жизненого цикла 'ComponentDidUpdate' на хуке useEffect
   * Второй аргумент не передан. Вызывается при каждом рендеринге, в том числе
   * и при первом, вместе с ComponentDidMount */
  useEffect(() => {
    console.log('ComponentDidUpdate');
  });

  const mouseMoveHandler = (event) =>
    setPos({
      x: event.clientX,
      y: event.clientY,
    });

  useEffect(() => {
    window.addEventListener('mousemove', mouseMoveHandler);

    /**Внутри диррективы return можно очищать ресурсы (таймеры, слушатели).
     * Этот код вызвается в момент unmount компонента. */
    return () => window.removeEventListener('mousemove', mouseMoveHandler);
  }, []);

  return (
    <div>
      <h2>Ресурс: {type}</h2>
      <button className='btn btn-primary' onClick={() => setType('users')}>
        USERS
      </button>
      <button className='btn btn-primary' onClick={() => setType('todos')}>
        TODOS
      </button>
      <button className='btn btn-primary' onClick={() => setType('posts')}>
        POSTS
      </button>

      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <pre>{JSON.stringify(pos, null, 2)}</pre>
    </div>
  );
};

export default App;
