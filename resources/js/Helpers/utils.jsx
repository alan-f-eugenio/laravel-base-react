import cep from "cep-promise";

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

export const cpfMaskOptions = {
   mask: "999.999.999-99",
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

let oldCepValueApp = null;
export function fetchAddressByCep(
   cepInp,
   oldCepValue = null,
   data,
   setData,
   streetInp = "street",
   neighborhoodInp = "neighborhood",
   cityInp = "city",
   stateInp = "state"
) {
   let cepValue = cepInp.value.replace(/[^\d.-]+/g, "");

   if (oldCepValue && oldCepValue != oldCepValueApp && oldCepValueApp == null) {
      oldCepValueApp = oldCepValue;
   }

   if (cepValue != oldCepValueApp && cepValue.length == 9) {
      oldCepValueApp = cepValue;
      let newAddress = {};
      cep(cepValue)
         .then((cepData) => {
            newAddress["cep"] = cepInp.value;
            newAddress[streetInp] = cepData.street;
            newAddress[neighborhoodInp] = cepData.neighborhood;
            newAddress[cityInp] = cepData.city;
            newAddress[stateInp] = cepData.state;
            setData({ ...data, ...newAddress, number: "", complement: "" });
         })
         .catch(() => {
            newAddress["cep"] = "";
            newAddress[streetInp] = "";
            newAddress[neighborhoodInp] = "";
            newAddress[cityInp] = "";
            newAddress[stateInp] = "";
            setData({ ...data, ...newAddress, number: "", complement: "" });
         });
   }
}
