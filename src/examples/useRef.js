import React, { useState, useEffect, useRef } from 'react';

const App = () => {
  const [value, setValue] = useState('');

  /**1. useRef.current может хранить любое изменяемое значение, изменение которого
   * не должно приводить к повторному рендеру компонента.
   */
  const renderCount = useRef(1);

  /**При изменении содержимого поля ввода, изменяется state value, что
   * приводит к перерендеру компонента, и тогда useEffect добавляет 1 к
   * renderCount.
   * Если бы renderCount хранился в useState, то это бы привело к бесконечному
   * перерендеру компонента: useEffect изменяет renderCount -> изменение renderCount
   * приводит к перерендерингу -> при котором срабатывает useEffect, вновь изменяя
   * renderCount -> повторяется до бесконечности.
   */
  useEffect(() => {
    renderCount.current++;
  });

  /**2. useRef часто сохраняют ДОМ елементы при помощи пропа ref={}.
   * Это позволяет обращаться к ДОМ элементам как к переменным и вызывать их методы.
   */
  const inputRef = useRef(null);

  /**Функция вызывает метод focus для инпута. */
  const focus = () => inputRef.current.focus();

  /**3. При помощи useRef можно хранить предыдущее состояние любого useState. */
  const prevValue = useRef('');

  /**При изменении value его текущее значение будет записано в useRef и не
   * изменено до следующего изменения value.
   */
  useEffect(() => {
    prevValue.current = value;
  }, [value]);

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '400px',
        margin: '40px auto',
      }}>
      <h2 style={{ textAlign: 'center' }}>
        Render count: {renderCount.current}
      </h2>
      <h4 style={{ textAlign: 'center' }}>
        Previously value: {prevValue.current}
      </h4>
      <input
        /**Пердача инпута в useRef. */
        ref={inputRef}
        type='text'
        className='form-control'
        placeholder='type some thing'
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <button
        style={{ width: '50%' }}
        className='btn btn-secondary'
        /**Изменение useRef.current вне useEffect не приводит
         * к новому рендеру компонента.
         */
        onClick={() => renderCount.current++}>
        INC COUNT
      </button>
      <button
        style={{ width: '50%' }}
        className='btn btn-primary'
        onClick={focus}>
        FOCUS
      </button>
    </div>
  );
};

export default App;
