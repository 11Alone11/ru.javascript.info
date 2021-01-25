
# Перепишите, используя async/await

<<<<<<< HEAD
Перепишите один из примеров раздела <info:promise-chaining>, используя `async/await` вместо `.then/catch`:
=======
Rewrite this example code from the chapter <info:promise-chaining> using `async/await` instead of `.then/catch`:
>>>>>>> 97ef86242f9f236b13152e1baf52a55c4db8728a

```js run
function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    });
}

loadJson('no-such-user.json')
  .catch(alert); // Error: 404
```
