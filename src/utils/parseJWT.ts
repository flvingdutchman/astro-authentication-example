export const parseJWT = (token: string): Record<string, any> => {
    const [,payload] = token.split('.');
    
    return JSON.parse(atob(payload));
};