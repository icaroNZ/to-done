import React, { useCallback, useEffect } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Group from './components/Group';
import FloatingAction from './components/FloatingAction';
import TodoModal from './components/TodoModal';
import TodoContext from './contexts/TodoContext';
import useManageTodos from './utils/manageTodos';
import useInputWithRef from './hooks/useInputWithRef';
import useLocalStorage from './hooks/useLocalStorage';
import axios from 'axios';
import httpDispatchMiddleware from './middleware/httpDispatchMiddleware';

function App() {
  const [state, dispatch] = useManageTodos();
  const [searchInfo, setSearchInfo, searchBarRef] = useInputWithRef(1000);
  const dispatchTo = useCallback(
    (result) =>
      dispatch({ type: 'initializeTodos', payload: { todos: result } }),
    [dispatch]
  );
  useLocalStorage(state.todos, 'todos', dispatchTo);

  const requestOrderTodo = useCallback(async () => {
    const { data } = await axios.get('http://localhost:8080/api/v1/order-todo');
    let values = [];
    const dataArray = data.data.data;
    for (let groupIndex = 1; groupIndex < data.numberOfGroups; groupIndex++) {
      const {
        _id: { $oid },
      } = data.data.firstValues[groupIndex];
      const index = dataArray.findIndex((todo) => todo._id.$oid === $oid);
      values.push(dataArray.splice(0, index));
    }
    values.push(dataArray);
    dispatch({ type: 'initializeTodos', payload: { todos: values } });
  }, [dispatch]);

  useEffect(() => {
    requestOrderTodo();
  }, [requestOrderTodo]);

  return (
    <TodoContext.Provider
      value={{ state, dispatch: httpDispatchMiddleware(dispatch) }}
    >
      <NavBar
        searchInfo={searchInfo}
        setSearchInfo={setSearchInfo}
        searchBarRef={searchBarRef}
      />
      <Group groups={state.todos} />
      <FloatingAction />
      <TodoModal
        todo={state.todo}
        dispatch={httpDispatchMiddleware(dispatch)}
      />
    </TodoContext.Provider>
  );
}

export default App;
