export const ROOT_URL = "/little-lemon";

export const simulateFetch = (chance = 1, timeout = 1000) => {
  let result = (Math.random() <= chance) ? {status: 200} : {status: 500};
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(result), timeout);
  });
};