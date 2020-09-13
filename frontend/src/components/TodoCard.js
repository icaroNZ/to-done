import React, { useContext } from 'react';
import TodoContext from '../contexts/TodoContext';

function TodoCard({ todo }) {
  const { dispatch } = useContext(TodoContext);
  return (
    <div className='uk-margin' id={todo._id.$oid}>
      <div className='uk-card uk-card-default uk-card-body uk-card-small'>
        {todo.title}
        <div className='uk-align-right'>
          <ul className='uk-iconnav'>
            <li>
              <span
                onClick={() =>
                  dispatch({ type: 'editTodo', payload: { id: todo._id.$oid } })
                }
                uk-icon='icon: file-edit'
              ></span>
            </li>
            <li>
              <span
                onClick={() =>
                  dispatch({
                    type: 'duplicateTodo',
                    payload: { todo },
                  })
                }
                uk-icon='icon: copy'
              ></span>
            </li>
            <li>
              <span
                onClick={() =>
                  dispatch({
                    type: 'deleteTodo',
                    payload: { id: todo._id.$oid },
                  })
                }
                uk-icon='icon: trash'
              ></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TodoCard;
