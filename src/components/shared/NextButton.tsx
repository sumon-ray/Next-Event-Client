import React, { ReactNode } from 'react';

const NextButton = ({ name ,onClick}: { name: ReactNode , onClick?: () => void}) => {
  return (
    <button onClick={onClick} className="nextButton">
      <span>{name}</span>
    </button>
  );
};

export default NextButton;