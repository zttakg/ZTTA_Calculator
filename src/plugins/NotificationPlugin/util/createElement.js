/* Example usage:
 * let el = createElement('div', {style: 'color: green'}, 'Hello world!');
 * document.body.appendChild(el);
 */

const isObject = value => Object(value) === value;
const isDomNode = object => isObject(object) && object.nodeType > 0;

export const createElement = (type, props, ...children) => {
  if (type.constructor === Function) {
    return type(props);
  }

  const el = document.createElement(type);

  // eslint-disable-next-line no-restricted-syntax
  for (const propName in props || {}) {
    if (/^on/.test(propName)) {
      el.addEventListener(propName.substring(2).toLowerCase(), props[propName]);
    } else {
      el[propName] = props[propName];
    }
  }

  // eslint-disable-next-line no-restricted-syntax
  for (let child of children || []) {
    if (child) {
      if (child.constructor === String) {
        child = document.createTextNode(child);
      }

      el.appendChild(child);
    }
  }

  return el;
};

export const render = (element, rootComponent) => {
  if (!isDomNode(element)) {
    throw new Error("First parameter should be a DOM Node");
  }

  return element.appendChild(rootComponent());
};
