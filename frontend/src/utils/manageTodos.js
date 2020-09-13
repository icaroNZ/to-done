import { useReducer } from 'react';
import UiKit from 'uikit';
import { produce } from 'immer';

function searchForNextId(state) {
  let newId = 0;
  for (let i = 0; i < state.todos.length; i++) {
    for (let j = 0; j < state.todos[i].length; j++) {
      if (state.todos[i][j]._id.$oid > newId) {
        newId = state.todos[i][j]._id.$oid;
      }
    }
  }
  return newId + 1;
}

function addTodo(draft, initialTodoState) {
  if (draft.todo.status === '') {
    return;
  }
  draft.todos[draft.todo.status].push({
    id: searchForNextId(draft),
    title: draft.todo.title,
  });
  Object.assign(draft.todo, initialTodoState.todo);
}

function findIdIndex({ id, state }) {
  console.log('i', id, state);
  for (let i = 0; i < state.todos.length; i++) {
    for (let j = 0; j < state.todos[i].length; j++) {
      if (state.todos[i][j]._id.$oid === id) {
        return [i, j];
      }
    }
  }
}

function persistTodo(draft, initialTodoState) {
  if (draft.todo.i === draft.todo.status) {
    const newTodo = draft.todos[draft.todo.status][draft.todo.j];
    newTodo.title = draft.todo.title;
  } else {
    draft.todos[draft.todo.i].splice(draft.todo.j, 1);
    draft.todos[draft.todo.status].push({
      id: draft.todo._id.$oid,
      title: draft.todo.title,
    });
  }
  Object.assign(draft.todo, initialTodoState.todo);
}

export default function useManageTodos() {
  const initialTodoState = {
    todos: [],
    todo: { id: null, title: '', description: '', status: '', j: '', i: '' },
  };

  function reducer(state, action) {
    let [i, j] = [null, null];
    let cardToDuplicate;

    switch (action.type) {
      case 'initializeTodos':
        return produce(state, (draft) => {
          draft.todos = action.payload.todos;
        });
      case 'deleteTodo':
        [i, j] = findIdIndex({ id: action.payload.id, state });
        return produce(state, (draft) => {
          draft.todos[i].splice(j, 1);
        });
      case 'duplicateTodo':
        console.log('new todo', action);

        [i, j] = findIdIndex({ id: action.payload.todo._id.$oid, state });
        return produce(state, (draft) => {
          draft.todos[i].splice(j + 1, 0, action.payload.newTodo);
        });
      case 'editTodo':
        [i, j] = findIdIndex({ id: action.payload.id, state });
        const oldTodo = state.todos[i][j];
        UiKit.modal('#modal-todo').show();
        return produce(state, (draft) => {
          draft.todo._id.$oid = oldTodo._id.$oid;
          draft.todo.title = oldTodo.title;
          draft.todo.status = i;
          draft.todo.j = j;
          draft.todo.i = i;
        });
      case 'saveOrEdit':
        UiKit.modal('#modal-todo').hide();

        if (state.todo._id.$oid) {
          return produce(state, (draft) => {
            persistTodo(draft, initialTodoState);
          });
        } else {
          return produce(state, (draft) => {
            addTodo(draft, initialTodoState);
          });
        }
      case 'onStatusChange':
        const { name, value } = action.payload.target;
        return produce(state, (draft) => {
          draft.todo[name] = value;
        });
      case 'removeTodoFromGroup':
        j = state.todos[action.payload.i].findIndex(
          (e) => e._id.$oid === action.payload.id
        );
        return produce(state, (draft) => {
          draft.todos[action.payload.i].splice(j, 1);
        });
      case 'addTodoOnGroup':
        [i, j] = findIdIndex({
          id: action.payload.id,
          state,
        });
        console.log('i,j', action.payload.i, action.payload.j);
        cardToDuplicate = { ...state.todos[i][j] };
        return produce(state, (draft) => {
          draft.todos[action.payload.i].splice(
            action.payload.j,
            0,
            cardToDuplicate
          );
        });
      case 'moveTodoInGroup':
        const oldGroup = action.payload.i;
        console.log('mode id', action.payload.id);
        j = state.todos[oldGroup].findIndex(
          (e) => e._id.$oid === action.payload.id
        );
        cardToDuplicate = { ...state.todos[oldGroup][j] };
        console.log('move', oldGroup, j, state.todos[oldGroup][j]);

        return produce(state, (draft) => {
          draft.todos[oldGroup].splice(j, 1);
          draft.todos[oldGroup].splice(action.payload.j, 0, cardToDuplicate);
        });
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, initialTodoState);

  return [state, dispatch];
}
