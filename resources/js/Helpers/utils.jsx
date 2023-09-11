export function capitalize(text) {
   return text.charAt(0).toUpperCase() + text.slice(1);
}

export function isObject(item) {
   return item && typeof item === "object" && !Array.isArray(item);
}

export function deepMerge(target, ...sources) {
   if (!sources.length) return target;
   const source = sources.shift();

   if (isObject(target) && isObject(source)) {
      for (const key in source) {
         if (isObject(source[key])) {
            if (!target[key])
               Object.assign(target, {
                  [key]: {},
               });
            deepMerge(target[key], source[key]);
         } else {
            Object.assign(target, {
               [key]: source[key],
            });
         }
      }
   }

   return deepMerge(target, ...sources);
}

export const cepMaskOptions = {
   mask: "99999-999",
};

export const cnpjMaskOptions = {
   mask: "99.999.999/9999-99",
};

export const phoneMaskOptions = {
   greedy: false,
   mask: "((99) 9999-9999)|((99) 99999-9999)",
};

export const whatsMaskOptions = {
   mask: "(99) 99999-9999",
};

export const integerMaskOptions = {
   alias: "numeric",
   digits: "9,0",
   radixPoint: "",
   rightAlign: false,
   autoUnmask: true,
   removeMaskOnSubmit: true,
};

export const moneyMaskOptions = {
   alias: "currency",
   radixPoint: ",",
   prefix: "R$ ",
   rightAlign: false,
   autoUnmask: true,
   removeMaskOnSubmit: true,
};

export const decimalMaskOptions = {
   alias: "numeric",
   digits: "9,2",
   radixPoint: ",",
   rightAlign: false,
   autoUnmask: true,
   removeMaskOnSubmit: true,
};

export const weightMaskOptions = {
   alias: "numeric",
   digits: "9,3",
   radixPoint: ",",
   rightAlign: false,
   autoUnmask: true,
   removeMaskOnSubmit: true,
};

export const percentMaskOptions = {
   alias: "percentage",
   radixPoint: "",
   prefix: "",
   rightAlign: false,
   autoUnmask: true,
   removeMaskOnSubmit: true,
};
