import React from 'react';

const TextWithCursor = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`${className} cursor-hover`}
      data-cursor-size={props['data-cursor-size'] || 90}
      {...props}
    >
      {children}
    </div>
  );
};

export default TextWithCursor;
