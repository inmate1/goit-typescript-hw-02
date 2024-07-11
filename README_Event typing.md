//////  Типизация событий ////////
//Типизация событий//

React и TypeScript предоставляют типы для разных событий , соответствующих типу событий DOM. Вот некоторые из них:

React.MouseEvent — это тип событий для мыши, таких как клик ****(onClick), двойной клик (onDoubleClick), нажатие мыши (onMouseDown), движение мыши (onMouseMove) и т.д. Мы можем использовать его вместе с различными элементами, например, <HTMLButtonElement>.

React.ChangeEvent — это тип событий происходящих изменений, когда состояние элемента формы изменяется. Он часто используется с <HTMLInputElement>, <HTMLSelectElement> и <HTMLTextAreaElement>.

React.FormEvent — это тип событий, связанных с формами, например, при отправке формы (onSubmit).

React.KeyboardEvent — это тип событий клавиатуры, таких как нажатие кнопки (onKeyPress), отпускание кнопки (onKeyUp) и т.п.

React.FocusEvent — это тип событий фокусировки, таких как получение фокуса (onFocus) и потеря фокуса (onBlur).

React.DragEvent — это тип событий для перетаскивания.

React.WheelEvent — это тип событий для прокрутки колеса мыши.

React.TouchEvent – ​​это тип, предназначенный для обработки событий касания. Он часто используется для создания интерфейсов, оптимизированных для устройств с сенсорным экраном.

Давайте начнем с события onSubmit .

Прекрасный пример ситуации, когда нам нужен объект происшествия – это использование preventDefault . Этот метод часто используется, когда нужно предотвратить стандартное поведение браузера.

Например, при отправке формы:

import React, { FormEvent } from 'react';

function MyForm() {
  const handleSubmit = (event: FormEvent) => {
    // запобігаємо стандартній поведінці форми (відправці форми)
    event.preventDefault();
    console.log('Форма була відправлена!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Відправити</button>
    </form>
  );
}

export default MyForm;

В этом примере event.preventDefault() предотвращает обновление страницы, которое обычно происходит при отправке формы.

Давайте рассмотрим onClick . Обычно нам не нужно использовать типизацию для event внутри события onClick , однако могут возникнуть ситуации, где это может оказаться полезным.

import React, { MouseEvent } from 'react';

function ChildComponent() {
  const handleChildClick = (event: MouseEvent<HTMLButtonElement>) => {
    // Зупиняємо спливання події до батьківського компонента
    event.stopPropagation();

    console.log('Клікнуто дитячий компонент');
<!--
// Создаем обработчик событий для кнопки
const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
  // Останавливаем всплытие события
  event.stopPropagation();

  // Приводим event.currentTarget к типу HTMLButtonElement
  const button = event.currentTarget as HTMLButtonElement;

  // Теперь мы можем получить доступ к свойствам HTMLButtonElement
  console.log(`Кнопка с текстом "${button.innerText}" была нажата`);

  // Меняем текст кнопки
  button.innerText = 'Нажата!';
};

// Создаем кнопку и добавляем её на страницу
const button = document.createElement('button') as HTMLButtonElement;
button.innerText = 'Нажми меня';
button.addEventListener('click', handleButtonClick);

// Добавляем кнопку в body документа
document.body.appendChild(button);
 Определение функции handleChildClick:
Функция принимает параметр event типа MouseEvent<HTMLButtonElement>. Это событие мыши, которое происходит на кнопке (HTMLButtonElement).
Остановка всплытия события:

event.stopPropagation(); останавливает всплытие события к родительскому компоненту. Это значит, что событие, вызванное на дочернем компоненте, не будет передаваться родительскому элементу.
Вывод сообщения в консоль:

console.log('Клікнуто дитячий компонент'); выводит сообщение "Клікнуто дитячий компонент" в консоль разработчика, когда кнопка нажата.
Таким образом, этот код позволяет обрабатывать клики на кнопке, предотвращая передачу события к родительским элементам и выводя сообщение в консоль при каждом клике на эту кнопку. -->
  };

  return (
    <button onClick={handleChildClick}>Натисни мене</button>
  );
}

function ParentComponent() {
  const handleParentClick = (event: MouseEvent<HTMLDivElement>) => {
    console.log('Клікнуто батьківський компонент');
  };

  return (
    <div onClick={handleParentClick}>
      <ChildComponent />
    </div>
  );
}

export default ParentComponent;

В этом примере, когда вы нажимаете кнопку внутри ChildComponent , вызывается обработчик события handleChildClick . Этот обработчик останавливает истечение события к родительскому компоненту с помощью event.stopPropagation() . Это означает, что обработчик события клика handleParentClick родительского компонента не будет вызван, если вы нажмете кнопку.

Давайте разберем onChange . Здесь часто требуется типизация, поскольку мы обычно работаем со значением ( value ) внутри этого обработчика. Давайте рассмотрим типизацию события ChangeEvent на примере обработчика изменений в текстовом поле ввода.

В этом контексте ChangeEvent<HTMLInputElement> означает событие изменения в элементе ввода.

import React, { ChangeEvent, useState } from 'react';

function TextInput() {
  const [text, setText] = useState<string>('');

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
    console.log('Введений текст:', event.target.value);
  };

  return <input type="text" value={text} onChange={handleTextChange} />;
}

export default TextInput;

В этом примере функция handleTextChange обрабатывает событие смены ChangeEvent<HTMLInputElement> . Это означает, что она ожидает происходящее в элементе ввода. С помощью этого события мы можем получить текущее значение текстового поля ввода с помощью event.target.value , затем обновить состояние компонента с этим новым значением.

Примечание: event.target.value всегда будет строкой, поскольку это значение атрибута value HTML элемента ввода. Это верно, даже если вы вводите цифры.

Поэтому давайте создадим свой компонент Input , который будет принимать обработчик onChange и тип ввода в качестве пропсов. В зависимости от типа ввода мы превращаем значение в нужный формат перед тем, как передать его обработчику onChange .

import React, { ChangeEvent } from 'react';

type InputProps = {
  value: string | number;
  type: 'text' | 'number';
  onChange: (value: string | number) => void;
  <!-- Тип InputProps определяет три свойства:
value: текущее значение инпута, может быть строкой или числом.
type: тип инпута, может быть только 'text' или 'number'.
onChange: функция, которая вызывается при изменении значения инпута. Эта функция принимает новое значение инпута в виде строки или числа -->
}

function Input({ value, type, onChange }: InputProps) {
<!-- В этом примере функция Input является функциональным компонентом React, который принимает пропсы. Пропсы передаются в компонент как объект, и они сразу деструктурируются на value, type и onChange. -->
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  <!-- Функция handleChange обрабатывает изменения значения инпута.
Она принимает  объект события event типа ChangeEvent<HTMLInputElement>.
 Это означает, что event представляет собой событие изменения, произошедшее на элементе <input>
event.target.value — это новое значение инпута.
Если тип инпута — 'number', новое значение приводится к числу с помощью Number(newValue).
Значение выводится в консоль и передается функции onChange, которая была передана в пропсах. -->
    let newValue = event.target.value;

    if (type === 'number') {
      newValue = Number(newValue);
    }
    
    console.log('Змінене значення:', newValue);
    onChange(newValue);
  };

  return (
    <input 
      value={value.toString()}
      type={type}
      onChange={handleChange}
    />

<!-- Функция принимает параметр event, который имеет тип ChangeEvent<HTMLInputElement>. Это означает, что event представляет собой событие изменения, произошедшее на элементе <input>.  -->

<!-- Компонент возвращает JSX, который рендерит элемент <input>. Пропсы элемента:
value: устанавливается в текущее значение, преобразованное в строку с помощью value.toString().
type: устанавливается в значение пропса type (либо 'text', либо 'number').
onChange: устанавливается в обработчик события handleChange. -->
  );
}
<!-- Таким образом, компонент Input принимает пропсы value, type и onChange, которые соответствуют типу InputProps, и рендерит элемент <input>, обрабатывая изменения значения с помощью функции handleChange. -->

export default Input;

В этом примере, в обработчике события handleChange значение ввода преобразуется в число, если тип ввода задан как ' number '. Затем уже преобразованное значение передается в обработчик onChange , который был передан как пропс.

Давайте рассмотрим события типа KeyboardEvent . Предположим, мы захотели добавить в наш Input обработчик событий для нажатия клавиши Enter .

import React, { KeyboardEvent } from 'react';

type InputProps = {
  value: string;
  onChange: (value: string) => void;
  onPressEnter: () => void;
}

function Input({ value, onChange, onPressEnter }: InputProps) {

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      console.log('Натиснута клавіша Enter');
      onPressEnter();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <input 
      value={value}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
    />
  );
}

export default Input;

В этом компоненте мы обрабатываем событие onKeyPress в обработчике handleKeyPress . Если нажатая клавиша является клавишей "Enter", мы вызываем функцию onPressEnter из наших пропсов. Это может быть полезно, например, в форме поиска, где мы хотим отправить форму, когда пользователь нажимает Enter .