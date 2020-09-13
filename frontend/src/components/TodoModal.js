import React from 'react';

function TodoModal({ todo, dispatch }) {
  return (
    <div id='modal-todo' data-uk-modal>
      <div className='uk-modal-dialog'>
        <button
          className='uk-modal-close-default'
          type='button'
          data-uk-close
        ></button>
        <div className='uk-modal-header'>
          <h2 className='uk-modal-title'>{todo.id ? `Edit ` : `Add `}Task</h2>
        </div>
        <div className='uk-modal-body'>
          <form>
            <fieldset className='uk-fieldset'>
              <div className='uk-margin'>
                <label htmlFor='title-todo' className='uk-form-label'>
                  Title
                </label>
                <div className='uk-form-controls'>
                  <input
                    id='title-todo'
                    type='text'
                    className='uk-input'
                    placeholder='enter your task'
                    value={todo.title}
                    name='title'
                    onChange={(event) =>
                      dispatch({
                        type: 'onStatusChange',
                        payload: { target: event.target },
                      })
                    }
                  />
                </div>
              </div>
              <div className='uk-margin'>
                <label htmlFor='todo-description' className='uk-form-label'>
                  Description
                </label>
                <div className='uk-form-controls'>
                  <textarea
                    className='uk-textarea'
                    name='description'
                    id='description-todo'
                    rows='5'
                    placeholder='enter a description for your task...'
                    value={todo.description}
                    onChange={(event) =>
                      dispatch({
                        type: 'onStatusChange',
                        payload: { target: event.target },
                      })
                    }
                  ></textarea>
                </div>
              </div>
              <div className='uk-margin'>
                <label htmlFor='options-todo' className='uk-form-label'>
                  State
                </label>
                <div className='uk-form-controls'>
                  <select
                    className='uk-select'
                    name='status'
                    id='options-todo'
                    value={todo.status}
                    onChange={(event) =>
                      dispatch({
                        type: 'onStatusChange',
                        payload: { target: event.target },
                      })
                    }
                  >
                    <option disabled value=''>
                      Select the state for your task
                    </option>
                    <option value='0'>Waiting</option>
                    <option value='1'>Started</option>
                    <option value='2'>Finished</option>
                  </select>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
        <div className='uk-modal-footer uk-text-right'>
          <button
            type='button'
            className='uk-button uk-button-default uk-margin-small-right uk-modal-close'
          >
            Cancel
          </button>
          <button
            onClick={() =>
              dispatch({
                type: 'saveOrEdit',
              })
            }
            type='button'
            className='uk-button uk-button-primary'
          >
            {todo.id ? 'Edit' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoModal;
