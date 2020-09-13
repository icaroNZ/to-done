import { useContext, useCallback } from 'react';
import TodoContext from '../contexts/TodoContext';
import useDragDropListener from '../hooks/useDragDropListener';

function useGroupHook(groups) {
  const groupNames = ['Waiting', 'Started', 'Finished'];

  const { dispatch } = useContext(TodoContext);

  const moved = useCallback((element) => {
    console.log(element);
    const id = element.detail[1].id;
    const i = groupNames.findIndex((group) => group === element.target.id);
    const nodes = element.target.childNodes;
    const j = Array.from(nodes).findIndex((e) => +e.id === id);
    dispatch({ type: 'moveTodoInGroup', payload: { i, j, id } });
  }, []);

  const removed = useCallback((element) => {
    const id = element.detail[1].id;
    const i = groupNames.findIndex((group) => group === element.srcElement.id);
    element.srcElement.appendChild(element.detail[1]);
    console.log('remove');
    dispatch({ type: 'removeTodoFromGroup', payload: { i, id } });
  }, []);

  const added = useCallback((element) => {
    const id = element.detail[1].id;
    const nodes = element.target.childNodes;
    const i = groupNames.findIndex((group) => group === element.srcElement.id);
    const j = Array.from(nodes).findIndex((e) => e.id === id);
    console.log('added');
    dispatch({ type: 'addTodoOnGroup', payload: { i, j, id } });
  }, []);

  addListeners({ groups, moved, removed, added });
}

function addListeners({ groups, moved, removed, added }) {
  groups.map((group) =>
    useDragDropListener({
      elementName: `#${group.replace(/\s/g, '_')}`,
      moved,
      removed,
      added,
    })
  );
}

export default useGroupHook;
