import React from 'react';

const Button = ({ onClick, className = '', children }) =>
  <button onClick={onClick} className={className} type="button">
    {children}
  </button>

const Loading = () =>
  <div>Loading...</div>

const WithLoading = (Component) => ({isLoading, ...rest}) =>
  isLoading ? <Loading /> : <Component {...rest} />

const ButtonWithLoading = WithLoading(Button)

export default Button;
export { ButtonWithLoading };
