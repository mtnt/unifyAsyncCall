import md5 from "md5";

const unifierCache = new Map();
export default function unifyAsyncCall(func, resolver = (...args) => JSON.stringify(args)) {
  return function(...args) {
    const key = md5(`${func.toString()}_${resolver(...args)}`);

    if (unifierCache.has(key)) {
      return unifierCache.get(key);
    }

    let result = func(...args);

    if (!(result instanceof Promise)) {
      throw new TypeError("The decorated method must return promise.");
    }

    result = result
      .catch(error => {
        unifierCache.delete(key);

        throw error;
      })
      .then(response => {
        unifierCache.delete(key);

        return response;
      });

    unifierCache.set(key, result);

    return result;
  };
}
