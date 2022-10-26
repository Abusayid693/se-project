export const saveUserInLocalStorage = (data: {token: string; user: any}) => {
  const {token, user} = data;
  localStorage.setItem('token', token);
  localStorage.setItem('currentUser', JSON.stringify(user));
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('currentUser');
};

export const ErrorFormat = (erors: any[]) => {
  const errors: Record<string, string> = {};
  erors.map(({field, message}) => (errors[field] = message));
  return errors;
};
