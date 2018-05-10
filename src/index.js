import md5 from "md5";

const unifierCache = {};
export default function unifyAsyncCall(func, resolver = (...args) => JSON.stringify(args)) {
  return function(...args) {
    const key = md5(`${func.toString()}_${resolver(...args)}`);

    if (unifierCache.hasOwnProperty(key)) {
      return unifierCache[key];
    }

    let result = func(...args);

    if (!(result instanceof Promise)) {
      throw new TypeError("The decorated method must return promise.");
    }

    result = result
      .catch(error => {
        delete unifierCache[key];

        throw error;
      })
      .then(response => {
        delete unifierCache[key];

        return response;
      });

    unifierCache[key] = result;

    return result;
  };
}
