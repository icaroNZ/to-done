import React from 'react';

function FloatingAction() {
  return (
    <div
      style={{
        position: 'fixed',
        right: 23,
        bottom: 23,
        zIndex: 997,
      }}
    >
      <span
        data-uk-toggle='target: #modal-todo'
        className='uk-icon-button'
        uk-icon='plus'
        style={{
          width: 56,
          height: 56,
          padding: 0,
          color: 'white',
          backgroundColor: 'red',
          boxShadow: '3px 3px 10px 5px rgba(0, 0, 0, 0.2)',
        }}
      ></span>
    </div>
  );
}

export default FloatingAction;
