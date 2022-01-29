/* eslint-disable import/prefer-default-export */
export const parseCode = (code: string) => {
  return code
    .trim()
    .toUpperCase()
    .replace(/[^A-Za-z0-9]/g, '');
};
