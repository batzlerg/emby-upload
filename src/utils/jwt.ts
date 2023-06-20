export const getJWT = () => sessionStorage.getItem('jwt');
export const setJWT = (token: string) => sessionStorage.setItem('jwt', token);