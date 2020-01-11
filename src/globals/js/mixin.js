function flatten(args) {
  return args.reduce((arr, arg) => {
    if (Array.isArray(arg)) {
      arr.push(...flatten(arg));
    } else {
      arr.push(arg);
    }
    return arr;
  }, []);
}

export default function mixin(...mixinfns) {
  let result = flatten(mixinfns).reduce((Class, mixinfn) => mixinfn(Class), class{})
  return result
}
