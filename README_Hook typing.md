//////// Типизация хуков ///////

//useState//

useState является одним из наиболее часто используемых хуков и понимание его типизации может быть очень полезным.

Можно определить типы состояния, которые необходимо сохранить с помощью useState . Вот базовый пример использования useState с типизацией:

export function Counter() {
const [count, setCount] = useState<number>(0);

const increment = () => {
setCount(prevCount => prevCount + 1);
};

return (
<div>
<p>Count: {count}</p>
<button onClick={increment}>Increment</button>
</div>
);
}

В этом примере useState<number>(0) говорит TypeScript, что count должно быть числом . Благодаря этому TypeScript будет предупреждать вас, если вы случайно попытаетесь присвоить count значение другого типа.

И как мы видим, тип для useState как и для других хуков принимает generic , тем самым сам count получает тип number и setCount принимает аргумент number .

Поскольку тип прост, мы можем не указывать <number> , потому что мы передали 0 в качестве начального значения . TypeScript, опираясь на тип переданного значения, сам бы присвоил number .

const [ count , setCount] = useState( 0 );

Типизацию можно использовать не только для простых типов, как number или string , но и для более сложных структур данных, таких как массивы или объекты:

type User = {
name: string;
email: string;
};

export function UserComponent() {
const [user, setUser] = useState<User>({ name: 'John Doe', email: 'john@example.com' });

//...
}

В этом примере useState<User> указывает, что user должен являться объектом определенного типа User . Это помогает гарантировать, что пользователь всегда будет иметь корректную структуру.

Мы также можем использовать Union Types , например для статуса загрузки, давайте посмотрим на примере:

import React, { useState } from 'react';

type Status = 'loading' | 'idle' | 'error';

export function LoadingComponent() {
const [status, setStatus] = useState<Status>('idle');

const loadData = async () => {
setStatus('loading');
try {
// Тут була б ваша логіка завантаження даних
// У випадку успіху:
setStatus('idle');
} catch (error) {
// У випадку помилки:
setStatus('error');
}
};

return (
<div>
<p>Status: {status}</p>
<button onClick={loadData}>Завантажити дані</button>
</div>
);
}

В этом примере Status – это union type , представляющий возможные состояния загрузки данных. Состояние status используется для отслеживания текущего состояния загрузки, и оно может принимать только значения, определенные в Status .

Давайте рассмотрим пример, когда у нас есть какое-то первоначальное значение и мы хотим его модифицировать в useState , а сохранять уже после изменения, рассмотрим на примере TextInput :

import React, { useState } from 'react';

type Props = {
initialValue: string;
onSave: (value: string) => void;
};

export function TextInput({ initialValue, onSave }: Props) {
const [value, setValue] = useState(initialValue);

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
setValue(event.target.value);
};

const handleSave = () => {
onSave(value);
};

return (
<div>
<input type="text" value={value} onChange={handleChange} />
<button onClick={handleSave}>Save</button>
</div>
);
}

В этом примере мы принимаем initialValue и onSave в качестве props . Мы сохраняем initialValue в состоянии и обновляем ее при смене текстового поля. После нажатия на кнопку " Save ", текущее значение из состояния передается в функцию onSave . Обратите внимание, что теперь для хука useState мы не задавали типы, потому что самое начальное значение уже типизировано и нам не нужны другие значени

/////// useRef ////////////

При использовании useRef можно указать тип ссылки. Это полезно, если у вас есть ссылка на DOM-элемент , и вы хотите получить доступ к его свойствам или методам.

Вот простой пример использования useRef с типом HTMLInputElement :

import React, { useRef } from 'react';

export function TextInputWithFocus() {
// Тут ми вказуємо, що ref буде посилатися на елемент типу HTMLInputElement
const inputEl = useRef<HTMLInputElement>(null);

const onButtonClick = () => {
// Поле current тепер має властивості, що є у елемента HTMLInputElement
inputEl.current?.focus();
};

return (
<>
{/_ Тут inputEl стане посиланням на цей input елемент _/}
<input ref={inputEl} type="text" />
<button onClick={onButtonClick}>Встановити фокус на поле введення</button>
</>
);
}

В этом примере useRef используется для создания ссылки на элемент input . Обратите внимание, что мы указываем HTMLInputElement как тип useRef . Это означает, что у нас будет доступ ко всем свойствам и методам input элемента, таким как метод focus .

useRef позволяет создавать ссылку на любой тип DOM-элемента . Таким образом, можно использовать ссылки не только на HTMLInputElement , но и на другие типы элементов, такие как HTMLTextAreaElement , HTMLDivElement , HTMLSelectElement и так далее.

import React, { useRef } from 'react';

export function ComponentWithRef() {
const divRef = useRef<HTMLDivElement>(null);
const textareaRef = useRef<HTMLTextAreaElement>(null);
const selectRef = useRef<HTMLSelectElement>(null);

// ...

return (
<>
<div ref={divRef}>Це div елемент</div>
<textarea ref={textareaRef}></textarea>
<select ref={selectRef}></select>
</>
);
}

В данном примере мы имеем ссылку на разные типы DOM-элементов . Все они типизированы соответствующим образом, что позволяет нам обращаться к свойствам и методам этих элементов без проблем с типами.

useRef не ограничивается только элементами DOM . Вы можете использовать useRef для хранения любого типа значений, которые следует сохранить между рендерами, но при этом изменение которых не вызывает повторный рендер. Это могут быть примитивные типы, объекты, функции и т.п. Важно учитывать, что каждое значение, сохраненное в useRef , должно быть типизировано.

import React, { useRef } from 'react';

export function ComponentWithRef() {
const countRef = useRef<number>(0);

const increment = () => {
countRef.current += 1;
console.log(`Поточне значення: ${countRef.current}`);
}

return (
<button onClick={increment}>Збільшити</button>
);
}

В этом примере мы ссылаемся на число, используемое для хранения состояния счетчика. Это значение не вызывает повторного рендера компонента при его изменении, но сохраняется между рендерами.

Здесь мы типизируем countRef как number посредством обобщения (<number>) , что гарантирует, что мы можем использовать только числовые операции с countRef.current .

Правда, поскольку у нас есть первоначальное значение, указывать <number> необязательно.

/////// useReducer //////

useReducer — это хук , используемый для управления сложным состоянием. Во многих случаях это может быть более удобной альтернативой useState , особенно когда имеются сложные состояния или переходы состояний, которые нужно обрабатывать.

Мы можем типизировать useReducer , определяя типы состояния и действий. В первую очередь, давайте определим тип состояния и тип действия:

type State = {
count: number;
};

type Action =
| { type: 'increment' }
| { type: 'decrement' }

В этом случае наше состояние просто содержит счетчик, а действия могут быть либо ' increment ', либо ' decrement '.

Далее мы определяем функцию-редюсер, принимающий текущее состояние и действие и возвращающий новое состояние:

function reducer(state: State, action: Action): State {
switch (action.type) {
case 'increment':
return { count: state.count + 1 };
case 'decrement':
return { count: state.count - 1 };
default:
throw new Error();
}
}

И, наконец, мы можем использовать useReducer в нашем компоненте, также типизировав исходное состояние:

const initialState: State = { count: 0 };

function Counter() {
const [state, dispatch] = useReducer(reducer, initialState);
// ...
}

Рассмотрим пример сложного состояния, используя useReducer . Состояние будет состоять из объекта User, имеющего id, name и email:

type User = {
id: string;
name: string;
email: string;
};

type State = {
loading: boolean;
error: string | null;
user: User | null;
};

type Action =
| { type: 'LOADING' }
| { type: 'SUCCESS'; payload: User }
| { type: 'ERROR'; error: string };

Здесь у нас есть три типа действий:

LOADING : установка состояния загрузки.
SUCCESS : устанавливает полученного пользователя и сбрасывает состояние загрузки и ошибки.
ERROR : устанавливает сообщение об ошибке и сбрасывает состояние загрузки.

Теперь определим функцию-reducer :

function reducer(state: State, action: Action): State {
switch (action.type) {
case 'LOADING':
return { ...state, loading: true, error: null };
case 'SUCCESS':
return { loading: false, error: null, user: action.payload };
case 'ERROR':
return { ...state, loading: false, error: action.error };
default:
throw new Error();
}
}

Использование useReducer в компоненте с типизированным исходным состоянием:

const initialState: State = {
loading: false,
error: null,
user: null,
};

function UserLoader() {
const [state, dispatch] = useReducer(reducer, initialState);
// ...
}

Теперь, когда мы используем dispatch , TypeScript будет проверять, чтобы наши действия были правильными.

dispatch({ type: 'LOADING' }); // OK
dispatch({ type: 'SUCCESS', payload: { id: '1', name: 'John', email: 'john@example.com' } }); // OK
dispatch({ type: 'ERROR', error: 'Failed to load user' }); // OK
dispatch({ type: 'SUCCESS' }); // Error, payload is missing
dispatch({ type: 'ERROR' }); // Error, error is missing

Соберем это вместе и посмотрим на результат:
type User = {
id: string;
name: string;
email: string;
};

type State = {
loading: boolean;
error: string | null;
user: User | null;
};

type Action =
| { type: 'LOADING' }
| { type: 'SUCCESS'; payload: User }
| { type: 'ERROR'; error: string };

function reducer(state: State, action: Action): State {
switch (action.type) {
case 'LOADING':
return { ...state, loading: true, error: null };
case 'SUCCESS':
return { loading: false, error: null, user: action.payload };
case 'ERROR':
return { ...state, loading: false, error: action.error };
default:
throw new Error();
}
}

const initialState: State = {
loading: false,
error: null,
user: null,
};

export function UserLoader() {
const [state, dispatch] = useReducer(reducer, initialState);

useEffect(() => {
const fetchUser = async () => {
dispatch({ type: 'LOADING' });

      try {
        const response = await fetch('/api/user');
        const user = await response.json();

        dispatch({ type: 'SUCCESS', payload: user });
      } catch (error) {
        dispatch({ type: 'ERROR', error: (error as Error).message });
      }
    };

    fetchUser();

}, []);

if (state.loading) {
return <div>Loading...</div>;
}

if (state.error) {
return <div>Error: {state.error}</div>;
}

if (!state.user) {
return null;
}

return (
<div>
<p>{state.user.name}</p>
<p>{state.user.email}</p>
</div>
);
}

////////// useContext //////

useContext — это хук , позволяющий нам иметь доступ к значению контекста, не обволакивая компонент в Consumer . Это действительно упрощает доступ к значениям контекста.

Когда мы работаем с TypeScript, важно типизировать не только наши компоненты и состояния, но и контексты. Вместе с useContext типизация контекста позволяет нам с уверенностью использовать значение контекста, зная, что они всегда будут типом, который мы определили.

import React, { createContext, useContext, useState } from 'react';

type User = {
name: string;
email: string;
};

type UserContextProps = {
user: User | null;
setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const UserContext = createContext<UserContextProps | undefined>(undefined);

type Props = {
children: React.ReactNode;
};

// Сам провайдер
export function UserProvider({ children }: Props) {
const [user, setUser] = useState<User | null>(null);

return (
<UserContext.Provider value={{ user, setUser }}>
{children}
</UserContext.Provider>
);
}

// Хук для використання контексту
export function useUserState() {
const context = useContext(UserContext);
if (context === undefined) {
throw new Error('useUser must be used within a UserProvider');
}
return context;
}

<!-- Контекст в React используется для управления состоянием, которое должно быть доступно в различных частях приложения без необходимости передавать это состояние через пропсы на всех уровнях компонентов. В данном примере создается контекст для хранения и управления состоянием пользователя.

Основные цели и задачи:
Управление глобальным состоянием:
Контекст позволяет хранить состояние, которое должно быть доступно многим компонентам в приложении. В данном случае это состояние пользователя (user) и функция для его изменения (setUser).

Избегание пропс-дриллинга:
Контекст помогает избежать передачи пропсов через многие уровни компонентов, что делает код более чистым и понятным. Вместо того, чтобы передавать состояние пользователя и функцию для его изменения через все компоненты, которые находятся между компонентом, где это состояние создается, и компонентами, которые его используют, контекст позволяет напрямую получать доступ к этим данным.

Повышение читаемости и поддерживаемости кода:
Использование контекста делает код более модульным и легко читаемым, поскольку компоненты, которые нуждаются в доступе к состоянию пользователя, могут просто использовать соответствующий контекст.

Конкретное применение:
Создание контекста и провайдера:

javascript
Копировать код
const UserContext = createContext<UserContextProps | undefined>(undefined);

export function UserProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
Здесь создается контекст UserContext и компонент UserProvider, который будет оборачивать те части приложения, которым нужен доступ к состоянию пользователя. UserProvider использует хук useState для создания состояния пользователя и функции для его изменения, и передает их через UserContext.Provider.

Создание хука для использования контекста:

javascript
Копировать код
export function useUserState() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
Хук useUserState позволяет компонентам получать доступ к контексту пользователя. Если хук используется вне провайдера UserProvider, будет выброшена ошибка.

Использование провайдера и хука в компонентах:

javascript
Копировать код
function App() {
  return (
    <UserProvider>
      <MyComponent />
    </UserProvider>
  );
}

function MyComponent() {
  const { user, setUser } = useUserState();

  // Используйте user и setUser в компоненте
  return <div>{user ? `Hello, ${user.name}` : 'Not logged in'}</div>;
}
В этом примере компонент MyComponent получает доступ к состоянию пользователя и функции для его изменения с помощью хука useUserState. Это позволяет компоненту отображать информацию о пользователе или выполнять действия, связанные с изменением состояния пользователя, без необходимости передавать пропсы через все уровни компонентов.





что конкретно подразумевается под доступ к контексту пользователя
ChatGPT
Под "доступом к контексту пользователя" подразумевается возможность получения и использования данных о пользователе (например, имя и email) и функции для их изменения в любом компоненте, который использует этот контекст, без необходимости передавать эти данные через пропсы.

Пример использования
Рассмотрим пошагово, как компоненты получают доступ к контексту пользователя и что это означает.

Создание контекста и провайдера

javascript
Копировать код
const UserContext = createContext<UserContextProps | undefined>(undefined);

export function UserProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
Здесь мы создаем контекст UserContext и компонент UserProvider, который использует хук useState для создания состояния пользователя (user) и функции для его изменения (setUser). Эти значения передаются в UserContext.Provider, который предоставляет их всем дочерним компонентам.

Создание хука для использования контекста

javascript
Копировать код
export function useUserState() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserState must be used within a UserProvider');
  }
  return context;
}
Хук useUserState использует функцию useContext, чтобы получить доступ к контексту UserContext. Если контекст равен undefined, это означает, что хук используется вне провайдера UserProvider, и выбрасывается ошибка. Если контекст существует, он возвращается.

Использование провайдера и хука в компонентах

javascript
Копировать код
function App() {
  return (
    <UserProvider>
      <MyComponent />
    </UserProvider>
  );
}

function MyComponent() {
  const { user, setUser } = useUserState();

  // Используйте user и setUser в компоненте
  return <div>{user ? `Hello, ${user.name}` : 'Not logged in'}</div>;
}
Что значит "доступ к контексту пользователя":
Получение данных пользователя:
Компонент MyComponent использует хук useUserState, чтобы получить доступ к текущему состоянию пользователя (user). Это позволяет компоненту отображать данные пользователя, такие как имя (user.name).

Изменение данных пользователя:
Компонент также получает доступ к функции setUser, которая позволяет обновлять состояние пользователя. Например, компонент может вызывать setUser, чтобы обновить имя или email пользователя на основе ввода пользователя или других действий.

Пример с изменением состояния пользователя:
Допустим, у нас есть кнопка, которая обновляет имя пользователя:

javascript
Копировать код
function MyComponent() {
  const { user, setUser } = useUserState();

  const updateUserName = () => {
    setUser({ name: 'New Name', email: user?.email || '' });
  };

  return (
    <div>
      {user ? `Hello, ${user.name}` : 'Not logged in'}
      <button onClick={updateUserName}>Update Name</button>
    </div>
  );
}
В этом примере при нажатии на кнопку вызывается функция updateUserName, которая использует setUser для изменения имени пользователя. Этот новый пользовательский объект будет доступен всем компонентам, использующим useUserState, так как они все получают доступ к одному и тому же контексту. -->

В примере выше мы создали контекст UserContext , содержащий текущего пользователя и функцию для установки текущего пользователя. Мы также создали пользовательский хук useUserState , который охватывает useContext , чтобы мы могли использовать этот контекст в наших компонентах. Если useUser используется вне провайдера, он выдаст ошибку, которая поможет избежать неправильного использования этого хука.

Также обратите внимание на то, как мы типизировали setUser . Мы добавили типы React.Dispatch<React.SetStateAction<User | null>> , поскольку в React функция, возвращаемая useState , это Dispatch .
import React, { useEffect } from 'react';
import { useUserState } from './UserProvider';

// Компонент, що використовує контекст
function UserProfile() {
const { user, setUser } = useUserState();

// Моделюємо завантаження даних про користувача.
useEffect(() => {
setTimeout(() => {
setUser({
name: 'John Doe',
email: 'john.doe@example.com',
});
}, 2000);
}, [setUser]);

if (!user) {
return <p>Loading...</p>;
}

return (
<div>
<h1>{user.name}</h1>
<p>{user.email}</p>
</div>
);
}

В этом примере мы импортируем useUserState хук внутри компонента UserProfile . Мы также используем setUser из контекста, чтобы обновить состояние пользователя в эмуляции загрузки данных.
export function App() {
return (
<UserProvider>
<UserProfile/>
</UserProvider>
);
}
Компонент UserProfile окутан в UserProvider в компоненте App, позволяющий использовать пользовательский контекст внутри UserProfile .

Хорошей практикой считается разделение обработчиков и состояния на разные контексты. Если мы беспокоимся о том, что какой-либо обработчик может обновиться и таким образом привести к обновлению компонента, использующего контекст, мы можем избежать этого. Для этого мы помещаем только значение в один контекст, а обработчики для их обновления в другой.
import React, {
createContext,
useState,
useContext,
FunctionComponent,
} from 'react';

type User = {
name: string;
email: string;
} | null;

type UserStateContextProps = {
user: User;
};

type UserActionsContextProps = {
setUser: React.Dispatch<React.SetStateAction<User>>;
};

const UserStateContext = createContext<UserStateContextProps | undefined>(
undefined
);
const UserActionsContext = createContext<UserActionsContextProps | undefined>(
undefined
);

type Props = {
children: React.ReactNode;
};

// Сам провайдер
export function UserProvider({ children }: Props) {
const [user, setUser] = useState<User>(null);

return (
<UserStateContext.Provider value={{ user }}>
<UserActionsContext.Provider value={{ setUser }}>
{children}
</UserActionsContext.Provider>
</UserStateContext.Provider>
);
}

export function useUserState() {
const context = useContext(UserStateContext);

if (context === undefined) {
throw new Error('useUserState must be used within a UserProvider');
}

return context;
}

export function useUserActions() {
const context = useContext(UserActionsContext);

if (context === undefined) {
throw new Error('useUserActions must be used within a UserProvider');
}

return context;
}
Теперь у нас есть два хука: useUserState и useUserActions , каждый из которых использует свой контекст. Это означает, что если мы только вызываем setUser , мы не будем перерисовываться при смене user . А компоненты, связанные с user , не будут перерисовываться (рендерироваться) при изменении функции setUser (хотя в нашем примере она неизменна).

////////////// Хуки, которые обычно не нужно типизировать ///////////

Такие хуки, как useEffect и useMemo, достаточно прямолинейны и обычно не требуют дополнительной работы.

useEffect((): void | (() => void) => {
let isActive = true;

    return (): void => {
      isActive = false;
    };

}, []);

useEffect ожидает, что передаваемая функция будет возвращать void или функцию очистки, которая тоже возвращает void . Все эти типы мы можем не указывать и просто писать так:

useEffect(() => {
let isActive = true;

    return (): void => {
      isActive = false;
    };

}, [])

И посмотрим на useMemo :

import React, { useMemo } from 'react';

type User = {
id: number;
name: string;
};

type Props = {
users: User[];
selectedUserId: number;
};

export function UserList({ users, selectedUserId }: Props) {
const selectedUser = useMemo(() => {
return users.find(user => user.id === selectedUserId);
}, [users, selectedUserId]);

return (
<div>
{selectedUser && <p>Selected user is {selectedUser.name}</p>}
{users.map(user => (
<p key={user.id}>{user.name}</p>
))}
</div>
);
}

В этом примере мы используем useMemo хук для оптимизации производительности. Мы создаем мемоизованное значение selectedUser , которое перечисляется только при смене users или selectedUserId .

////////// Кастомные хуки ////////

Кастомные хуки позволяют выделить часть функциональности компонентов в переиспользуемые функции. При работе с TypeScript кастомные хуки также должны быть правильно типизированы.

В этом примере useFormInput является кастомным хуком , который мы создали для управления значением input-формы. Этот хук принимает initialValue в качестве аргумента и возвращает объект с value и функцией onChange .

Мы определяем тип UseFormInput для возвращаемого значения. Этот тип включает value , являющееся строкой, и функцию onChange , которая принимает событие изменения ввода и ничего не возвращает.

Давайте продолжим. Сделаем хук, типизирующий функции. Предположим, нам нужна функция, которая будет неизменной, то есть паттерн синглтон.

import { useCallback, useRef } from 'react';

type Callback = (...args: unknown[]) => unknown;

export function useSingletonFunction<T extends Callback>(func: T) {
const funcRef = useRef(func);
funcRef.current = func;

const singletonFunction = (...args: Parameters<T>) =>
funcRef.current(...args) as ReturnType<T>;

return useCallback(singletonFunction, []);
}

Типизация для useSingletonFunction использует две встроенные TypeScript-утилиты: Parameters и ReturnType .

Parameters<T> извлекает типы параметров функции T .
ReturnType<T> извлекает тип возвращаемой функции T .

Функция useSingletonFunction принимает функцию типа T , где T ограничен типом Callback , а затем возвращает новую функцию, которая имеет те же типы параметров и возвращаемое значение, что и функция T .

Обратите внимание, что во втором случае мы не указываем тип, возвращаемый для useSingletonFunction . TypeScript самостоятельно выводит типы на основе возвращаемого значения и указывать его необязательно.




  

 

   

    
    
    

   
      
      
      

  



В этом примере, в обработчике события handleChange значение ввода преобразуется в число, если тип ввода задан как ' number '. Затем уже преобразованное значение передается в обработчик onChange , который был передан как пропс.



Давайте рассмотрим события типа KeyboardEvent . Предположим, мы захотели добавить в наш Input обработчик событий для нажатия клавиши Enter .



импортировать  React , { KeyboardEvent } из  «реагировать» ; тип InputProps = {
   значение : строка ;
   onChange : ( значение: строка ) => void ;
   onPressEnter : () => void ; 
} Function Input ( {value, onChange, onPressEnter}: InputProps ) { const handleKeyPress = ( событие: KeyboardEvent<HTMLInputElement> ) => {
     if (event. key === 'Enter' ) {
       console . log ( 'Натиснута клавіша Enter' );
       onPressEnter (); 
    } 
  }; const handleChange = ( событие: React.ChangeEvent<HTMLInputElement> ) =>
     { onChange ( event.target.value ) ; 
  }; return (
     < входное значение = {значение} onChange = {handleChange} onKeyPress = {handleKeyPress} 
    /> 
  ); 
} экспортировать ввод по умолчанию ;


   

 

   

   

   
      
      
      

  



В этом компоненте мы обрабатываем событие onKeyPress в обработчике handleKeyPress . Если нажатая клавиша является клавишей "Enter", мы вызываем функцию onPressEnter из наших пропсов. Это может быть полезно, например, в форме поиска, где мы хотим отправить форму, когда пользователь нажимает Enter .