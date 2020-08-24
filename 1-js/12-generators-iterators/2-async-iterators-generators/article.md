# Асинхронные итераторы и генераторы

Асинхронные итераторы позволяют перебирать данные, поступающие асинхронно. Например, когда мы загружаем что-то по частям по сети. Асинхронные генераторы делают такой перебор ещё удобнее.

<<<<<<< HEAD
Давайте сначала рассмотрим простой пример, чтобы понять синтаксис, а затем - реальный практический.
=======
Asynchronous iterators allow us to iterate over data that comes asynchronously, on-demand. Like, for instance, when we download something chunk-by-chunk over a network. And asynchronous generators make it even more convenient.
>>>>>>> b85413d0bdd6f4f468fcadeacb4c4056e3671ce1

## Асинхронные итераторы

Асинхронные итераторы похожи на обычные итераторы, но имеют некоторые синтаксические отличия.

<<<<<<< HEAD
"Обычный" перебираемый объект, как подробно рассказано в главе <info:iterable>, выглядит примерно так:
=======
Asynchronous iterators are similar to regular iterators, with a few syntactic differences.

A "regular" iterable object, as described in the chapter <info:iterable>, looks like this:
>>>>>>> b85413d0bdd6f4f468fcadeacb4c4056e3671ce1

```js run
let range = {
  from: 1,
  to: 5,

  // for..of вызывает этот метод один раз в самом начале
*!*
  [Symbol.iterator]() {
*/!*
    // ...возвращает объект-итератор:
    // далее for..of работает только с этим объектом, запрашивая следующее значение вызовом next()
    return {
      current: this.from,
      last: this.to,

      // next() вызывается на каждой итерации цикла for..of
*!*
      next() { // (2)
        // должен возвращать значение в виде объекта {done:.., value :...}
*/!*
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

for(let value of range) {
  alert(value); // 1, потом 2, потом 3, потом 4, потом 5
}
```

Если нужно, пожалуйста, ознакомьтесь с [главой про итераторы](info:iterable), где обычные итераторы разбираются подробно.

<<<<<<< HEAD
Чтобы сделать объект итерируемым асинхронно:
1. Используется `Symbol.asyncIterator` вместо `Symbol.iterator`.
2. `next()` должен возвращать промис.
3. Чтобы перебрать такой объект, используется цикл `for await (let item of iterable)`.
=======
To make the object iterable asynchronously:
1. We need to use `Symbol.asyncIterator` instead of `Symbol.iterator`.
2. `next()` should return a promise.
3. To iterate over such an object, we should use a `for await (let item of iterable)` loop.
>>>>>>> b85413d0bdd6f4f468fcadeacb4c4056e3671ce1

Давайте создадим итерируемый объект `range`, как и в предыдущем примере, но теперь он будет возвращать значения асинхронно, по одному в секунду:

```js run
let range = {
  from: 1,
  to: 5,

  // for await..of вызывает этот метод один раз в самом начале
*!*
  [Symbol.asyncIterator]() { // (1)
*/!*
    // ...возвращает объект-итератор:
    // далее for await..of работает только с этим объектом,
    // запрашивая у него следующие значения вызовом next()
    return {
      current: this.from,
      last: this.to,

<<<<<<< HEAD
      // next() вызывается на каждой итерации цикла for await..of
=======
      // next() is called on each iteration by the for await..of loop
>>>>>>> b85413d0bdd6f4f468fcadeacb4c4056e3671ce1
*!*
      async next() { // (2)
        // должен возвращать значение как объект {done:.., value :...}
        // (автоматически оборачивается в промис с помощью async)
*/!*

<<<<<<< HEAD
        // можно использовать await внутри для асинхронности:
=======
*!*
        // can use await inside, do async stuff:
>>>>>>> b85413d0bdd6f4f468fcadeacb4c4056e3671ce1
        await new Promise(resolve => setTimeout(resolve, 1000)); // (3)
*/!*

        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

(async () => {

*!*
  for await (let value of range) { // (4)
    alert(value); // 1,2,3,4,5
  }
*/!*

})()
```

Как видим, структура похожа на обычные итераторы:

<<<<<<< HEAD
1. Чтобы сделать объект асинхронно итерируемым, он должен иметь метод `Symbol.asyncIterator` `(1)`.
2. Этот метод должен возвращать объект с методом `next()`, который в свою очередь возвращает промис `(2)`.
3. Метод `next()` не обязательно должен быть `async`, он может быть обычным методом, возвращающим промис, но `async` позволяет использовать `await`, так что это удобно. Здесь мы просто делаем паузу на одну секунду `(3)`.
4. Для итерации мы используем `for await (let value of range)` `(4)`, добавляя "await" после "for". Он вызовет `range[Symbol.asyncIterator]()` один раз, а затем его метод `next()` для получения значений.
=======
1. To make an object asynchronously iterable, it must have a method `Symbol.asyncIterator` `(1)`.
2. This method must return the object with `next()` method returning a promise `(2)`.
3. The `next()` method doesn't have to be `async`, it may be a regular method returning a promise, but `async` allows us to use `await`, so that's convenient. Here we just delay for a second `(3)`.
4. To iterate, we use `for await(let value of range)` `(4)`, namely add "await" after "for". It calls `range[Symbol.asyncIterator]()` once, and then its `next()` for values.
>>>>>>> b85413d0bdd6f4f468fcadeacb4c4056e3671ce1

Вот небольшая шпаргалка:

|       | Итераторы | Асинхронные итераторы |
|-------|-----------|-----------------|
| Метод для создания итерируемого объекта | `Symbol.iterator` | `Symbol.asyncIterator` |
| `next()` возвращает              | любое значение         | промис  |
| для цикла используйте                          | `for..of`         | `for await..of` |

<<<<<<< HEAD

````warn header="Оператор расширения `...` не работает асинхронно"
Функции, которые требуют обычных синхронных итераторов, не работают с асинхронными.

Например, оператор расширения (три точки `...`) не будет работать:
=======
````warn header="The spread syntax `...` doesn't work asynchronously"
Features that require regular, synchronous iterators, don't work with asynchronous ones.

For instance, a spread syntax won't work:
>>>>>>> b85413d0bdd6f4f468fcadeacb4c4056e3671ce1
```js
alert( [...range] ); // Ошибка, нет Symbol.iterator
```

Это естественно, так как он ожидает `Symbol.iterator`, как и `for..of` без `await`. Ему не подходит `Symbol.asyncIterator`.
````

## Асинхронные генераторы

Как мы уже знаем, в JavaScript есть генераторы, и они являются перебираемыми.

Давайте вспомним генератор последовательности из главы [](info:generators). Он генерирует последовательность значений от `start` до `end`:

```js run
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

for(let value of generateSequence(1, 5)) {
  alert(value); // 1, потом 2, потом 3, потом 4, потом 5
}
```

В обычных генераторах мы не можем использовать `await`. Все значения должны поступать синхронно: в `for..of` нет места для задержки, это синхронная конструкция.

Но что если нам нужно использовать `await` в теле генератора? Для выполнения сетевых запросов, например.

Нет проблем, просто добавьте в начале `async`, например, вот так:

```js run
*!*async*/!* function* generateSequence(start, end) {

  for (let i = start; i <= end; i++) {

*!*
    // ура, можно использовать await!
    await new Promise(resolve => setTimeout(resolve, 1000));
*/!*

    yield i;
  }

}

(async () => {

  let generator = generateSequence(1, 5);
  for *!*await*/!* (let value of generator) {
    alert(value); // 1, потом 2, потом 3, потом 4, потом 5
  }

})();
```

Теперь у нас есть асинхронный генератор, который можно перебирать с помощью `for await ... of`.

Это действительно очень просто. Мы добавляем ключевое слово `async`, и внутри генератора теперь можно использовать `await`, а также промисы и другие асинхронные функции.

<<<<<<< HEAD
С технической точки зрения, ещё одно отличие асинхронного генератора заключается в том, что его метод `generator.next()` теперь тоже асинхронный и возвращает промисы.
=======
Technically, another difference of an async generator is that its `generator.next()` method is now asynchronous also, it returns promises.
>>>>>>> b85413d0bdd6f4f468fcadeacb4c4056e3671ce1

Из обычного генератора мы можем получить значения при помощи `result = generator.next()`. Для асинхронного нужно добавить `await`, вот так:

```js
result = await generator.next(); // result = {value: ..., done: true/false}
```

## Асинхронно перебираемые объекты

Как мы уже знаем, чтобы сделать объект перебираемым, нужно добавить к нему `Symbol.iterator`.

```js
let range = {
  from: 1,
  to: 5,
*!*
  [Symbol.iterator]() {
    return <объект с next, чтобы сделать range перебираемым>
  }
*/!*
}
```

Обычная практика для `Symbol.iterator` - возвращать генератор, а не простой объект с `next`, как в предыдущем примере.

Давайте вспомним пример из главы [](info:generators):

```js run
let range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() { // сокращение для [Symbol.iterator]: function*()
    for(let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
};

for(let value of range) {
  alert(value); // 1, потом 2, потом 3, потом 4, потом 5
}
```

Здесь созданный объект `range` является перебираемым, а генератор `*[Symbol.iterator]` реализует логику для перечисления значений.

Если хотим добавить асинхронные действия в генератор, нужно заменить `Symbol.iterator` на асинхронный `Symbol.asyncIterator`:

```js run
let range = {
  from: 1,
  to: 5,

*!*
  async *[Symbol.asyncIterator]() { // то же, что и [Symbol.asyncIterator]: async function*()
*/!*
    for(let value = this.from; value <= this.to; value++) {

      // пауза между значениями, ожидание  
      await new Promise(resolve => setTimeout(resolve, 1000));

      yield value;
    }
  }
};

(async () => {

  for *!*await*/!* (let value of range) {
    alert(value); // 1, потом 2, потом 3, потом 4, потом 5
  }

})();
```

Теперь значения поступают с задержкой в одну секунду между ними.


## Пример из реальной практики

До сих пор мы видели простые примеры, чтобы просто получить базовое представление. Теперь давайте рассмотрим реальную ситуацию.

<<<<<<< HEAD
Есть много онлайн-сервисов, которые предоставляют данные постранично. Например, когда нам нужен список пользователей, запрос возвращает предопределённое количество (например, 100) пользователей - "одну страницу", и URL следующей страницы.

Этот подход очень распространён, и речь не только о пользователях, а о чём угодно. Например, GitHub позволяет получать коммиты таким образом, с разбивкой по страницам:
=======
There are many online services that deliver paginated data. For instance, when we need a list of users, a request returns a pre-defined count (e.g. 100 users) - "one page", and provides a URL to the next page.

This pattern is very common. It's not about users, but just about anything. For instance, GitHub allows us to retrieve commits in the same, paginated fashion:
>>>>>>> b85413d0bdd6f4f468fcadeacb4c4056e3671ce1

- Нужно сделать запрос на URL в виде `https://api.github.com/repos/<repo>/commits`.
- В ответ придёт JSON с 30 коммитами, а также со ссылкой на следующую страницу в заголовке `Link`.
- Затем можно использовать эту ссылку для следующего запроса, чтобы получить дополнительную порцию коммитов, и так далее.

<<<<<<< HEAD
Но нам бы, конечно же, хотелось вместо этого сложного взаимодействия иметь просто объект с коммитами, которые можно перебирать, вот так:
=======
But we'd like to have a simpler API: an iterable object with commits, so that we could go over them like this:
>>>>>>> b85413d0bdd6f4f468fcadeacb4c4056e3671ce1

```js
let repo = 'javascript-tutorial/en.javascript.info'; // репозиторий на GitHub, откуда брать коммиты

for await (let commit of fetchCommits(repo)) {
  // обработка коммитов
}
```

<<<<<<< HEAD
Мы бы хотели сделать функцию `fetchCommits(repo)`, которая будет получать коммиты, делая запросы всякий раз, когда это необходимо. И пусть она сама разбирается со всем, что касается нумерации страниц, для нас это будет просто `for await..of`.
=======
We'd like to make a function `fetchCommits(repo)` that gets commits for us, making requests whenever needed. And let it care about all pagination stuff. For us it'll be a simple `for await..of`.
>>>>>>> b85413d0bdd6f4f468fcadeacb4c4056e3671ce1

С асинхронными генераторами это довольно легко реализовать:

```js
async function* fetchCommits(repo) {
  let url = `https://api.github.com/repos/${repo}/commits`;

  while (url) {
    const response = await fetch(url, { // (1)
      headers: {'User-Agent': 'Our script'}, // GitHub требует заголовок user-agent
    });

    const body = await response.json(); // (2) ответ в формате JSON (массив коммитов)

    // (3) Ссылка на следующую страницу находится в заголовках, извлекаем её
    let nextPage = response.headers.get('Link').match(/<(.*?)>; rel="next"/);
    nextPage = nextPage?.[1];

    url = nextPage;

    for(let commit of body) { // (4) вернуть коммиты один за другим, до окончания страницы
      yield commit;
    }
  }
}
```

<<<<<<< HEAD
1. Мы используем метод [fetch](info:fetch) браузера для загрузки с удалённого URL. Он позволяет при необходимости добавлять авторизацию и другие заголовки, здесь GitHub требует `User-Agent`.
2. Результат `fetch` обрабатывается как JSON, это опять-таки метод, присущий `fetch`.
3. Нужно получить URL следующей страницы из заголовка ответа `Link`. Он имеет специальный формат, поэтому мы используем регулярное выражение. URL следующей страницы может выглядеть как `https://api.github.com/repositories/93253246/commits?page=2`, он генерируется самим GitHub.
4. Затем мы выдаём все полученные коммиты, а когда они закончатся - сработает следующая итерация `while(url)`, которая сделает ещё один запрос.
=======
1. We use the browser [fetch](info:fetch) method to download from a remote URL. It allows us to supply authorization and other headers if needed -- here GitHub requires `User-Agent`.
2. The fetch result is parsed as JSON. That's again a `fetch`-specific method.
3. We should get the next page URL from the `Link` header of the response. It has a special format, so we use a regexp for that. The next page URL may look like `https://api.github.com/repositories/93253246/commits?page=2`. It's generated by GitHub itself.
4. Then we yield all commits received, and when they finish, the next `while(url)` iteration will trigger, making one more request.
>>>>>>> b85413d0bdd6f4f468fcadeacb4c4056e3671ce1

Пример использования (показывает авторов коммитов в консоли):

```js run
(async () => {

  let count = 0;

  for await (const commit of fetchCommits('javascript-tutorial/en.javascript.info')) {

    console.log(commit.author.login);

    if (++count == 100) { // остановимся на 100 коммитах
      break;
    }
  }

})();
```

Это именно то, что мы хотели. Внутренняя механика постраничных запросов снаружи не видна. Для нас это просто асинхронный генератор, который возвращает коммиты.

## Итого

Обычные итераторы и генераторы прекрасно работают с данными, которые не требуют времени для их создания или получения.

Когда мы ожидаем, что данные будут поступать асинхронно, с задержками, можно использовать их асинхронные аналоги и `for await..of` вместо` for..of`.

Синтаксические различия между асинхронными и обычными итераторами:

|       | Перебираемый объект | Асинхронно перебираемый |
|-------|-----------|-----------------|
| Метод для получения итератора | `Symbol.iterator` | `Symbol.asyncIterator` |
| `next()` возвращает              | `{value:…, done: true/false}`         | промис, который завершается с `{value:…, done: true/false}`  |

Синтаксические различия между асинхронными и обычными генераторами:

|       | Генераторы | Асинхронные генераторы |
|-------|-----------|-----------------|
| Объявление | `function*` | `async function*` |
| `generator.next()` возвращает              | `{value:…, done: true/false}`         | промис, который завершается с `{value:…, done: true/false}`  |

В веб-разработке мы часто встречаемся с потоками данных, когда они поступают по частям. Например, загрузка или выгрузка большого файла.

<<<<<<< HEAD
Мы можем использовать асинхронные генераторы для обработки таких данных. Также заметим, что в некоторых окружениях, например, браузерах, есть и другое API, называемое Streams (потоки), который предоставляет специальные интерфейсы для работы с такими потоками данных, их преобразования и передачи из одного потока в другой (например, загрузка из одного источника и сразу отправка в другое место).
=======
We can use async generators to process such data. It's also noteworthy that in some environments, like in browsers, there's also another API called Streams, that provides special interfaces to work with such streams, to transform the data and to pass it from one stream to another (e.g. download from one place and immediately send elsewhere).
>>>>>>> b85413d0bdd6f4f468fcadeacb4c4056e3671ce1
