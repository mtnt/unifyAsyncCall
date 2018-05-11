# Why?

It\`s a frequent case when you call an asynchronously function several times from undependently places.

For example, you need to load some data from a server when a user press on a button - he can press it several times in second. You can disable the button while a responce will not be got. Or you can unify the request.

# Install

```
npm install --save unify-async-call
```
or
```
yarn add unify-async-call
```

# Usage

It\`s a default export, so
```
import unifyAsyncCall from "unify-async-call"
```

Call it with one or two params:
```
function makeRequest(url, params) {
  return fetch(url, params);
}

const makeUnifiedRequest = unifyAsyncCall(request, url => url);

const request0 = makeUnifiedRequest("someUrl", "someParams");
const request1 = makeUnifiedRequest("someUrl", "someParams");

expect(request0).toBe(request1); // true
```

## Syntax

```
unifyAsyncCall(func[, resolver])
```

- `func` is a function that must return a promise. It does not matter how many params the funcntion expect.
- `resolver` is a function that generate a key for storing cache. It will be called with the same params that `func`.

> - It will throw a `TypeError` if the func will not return a promise.
> - If you will not specify the resolver, it will try to stringify all passed arguments by default. So you should not pass a cyclic structures in this case.


