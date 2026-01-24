export const isStrongPassword = (password: string) => {
    return password.length >= 8;
  };

export  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);