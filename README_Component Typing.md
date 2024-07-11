///// Типизация компонентов //////

React и TypeScript вместе создают очень мощное средство для создания масштабируемых и стабильных веб-приложений. Один из наиболее полезных аспектов их совместного использования – это возможность типизации компонентов .

Это помогает увеличить уверенность в корректности вашего кода, улучшает автодополнение в IDE и делает ваш код более читабельным и понятным.

Мы рассмотрим разные подходы для определения компонента, начнем с самого простого.

import React from 'react';

type Props = {
name: string;
age: number;
};

export function User({ name, age }: Props) {
return (
<div>
<p>{`User name is ${name}`}</p>
<p>{`User age is ${age}`}</p>
</div>
);
}

В этом примере мы определяем тип Props , описывающий пропсы, принимаемые нашим компонентом User . Затем мы используем этот тип для аннотации пропсов в функции компонента.

Мы можем использовать React.FC или React.FunctionComponent для определения типов функционального компонента:

import React from 'react';

type Props = {
name: string;
age: number;
};

export const User: React.FC<Props> = ({ name, age }) => {
return (
<div>
<p>{`User name is ${name}`}</p>
<p>{`User age is ${age}`}</p>
</div>
);
};

В этом примере React.FC<Props> определяет тип функционального компонента, принимающего пропсы типа Props . Это использование generic позволяет автоматически уточнить тип аргументов функции. Однако следует отметить, что React.FC и React.FunctionComponent автоматически добавляют определение типа для пропа children даже если он не определен в типах пропсов.

Некоторые разработчики предпочитают избегать использования React.FC и React.FunctionComponent по этой причине.

Здесь указано, что React.FC сам типизирует children , но давайте посмотрим, как это сделать самостоятельно:

import React from 'react';

type Props = {
name: string;
age: number;
children: React.ReactNode; // Типизация для children
};

export function User({ name, age, children }: Props) {
return (
<div>
<p>{`User name is ${name}`}</p>
<p>{`User age is ${age}`}</p>
{children} {/_ Рендерим children _/}
</div>
);
}
Давайте немного разберемся в этих типах для children .

React.ReactNode : это более общий тип, содержащий почти все возможные типы, которые могут быть отрендерены в компоненте React . Это может содержать string, number, null, undefined, boolean, ReactElement, ReactFragment, ReactPortal .

React.ReactElement : если вы используете ReactElement в типах children , вы сможете принимать только элементы React.

Вот пример типизации children как ReactElement :

import React from 'react';

type Props = {
children: React.ReactElement;
};

export function Panel({ children }: Props) {
return <div>{children}</div>;
}

Теперь Panel может принимать только дочерние элементы, являющиеся элементами React:

// Это работает:
<Panel>

  <div> Hello, world! </div> 
</Panel>

// Это не работает, потому что
// "Hello, world!" – это строка, а не элемент
<Panel> Hello, world! </Panel>

Вы также можете увидеть такой тип данных , как JSX.Element , это по сути React.ReactElement , единственная разница, что ReactElement – ​​это встроенный тип в библиотеке React, а JSX.Element – ​​это интерфейс, определенный в глобальной области JSX TypeScript . Однако использование ReactElement более очевидно и надежно.

Давайте еще рассмотрим типизацию функций и объектов в пропсах:

import React from 'react';

type User = {
name: string;
email: string;
};

type Props = {
user: User;
onUserUpdate: (user: User) => void;
};

export function UserProfile({ user, onUserUpdate }: Props) {
// компонент UserProfile
return null;
}

Здесь user – это объект с определенной структурой, а onUserUpdate – это функция, принимающая объект такой же структуры.
