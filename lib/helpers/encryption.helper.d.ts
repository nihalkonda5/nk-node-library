declare const encryptPassword: (password: string) => string;
declare const checkPassword: (encrypted: string, plain: string) => boolean;
export { encryptPassword, checkPassword };
