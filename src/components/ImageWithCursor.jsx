import React from 'react';

const ImageWithCursor = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`${className} cursor-hover`}
      data-cursor-size={props['data-cursor-size'] || 110}
      {...props}
    >
      {children}
    </div>
  );
};

export default ImageWithCursor;
