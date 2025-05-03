import React, { ReactNode } from 'react';

const NextButton = ({ name }: { name: ReactNode }) => {
  return (
    <button className="nextButton">
      <span>{name}</span>
    </button>
  );
};

export default NextButton;