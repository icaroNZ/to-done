import axios from 'axios';

function httpDispatchMiddleware(aDispatch) {
  return (action) => {
    switch (action.type) {
      case 'duplicateTodo':
        const newTodo = { ...action.payload.todo };
        newTodo.name = 'Test user';
        newTodo.done = false;
        newTodo.created_at = '2020-01-01';
        newTodo.title += ' - duplicate';
        delete newTodo._id;
        axios
          .post('http://localhost:8080/api/v1/todo', newTodo)
          .then(({ data: { data } }) => {
            action.payload['newTodo'] = data;
            return aDispatch(action);
          });
    }
    console.log('httpDispatchMiddleware:', action);
  };
}

export default httpDispatchMiddleware;
