import { useCallback, useEffect } from 'react';
import UIKit from 'uikit';

function useDragDropListener({ elementName, added, removed, moved }) {
  const addEventListener = useCallback(
    (element) => {
      UIKit.util.on(element, 'moved', moved);
      UIKit.util.on(element, 'removed', removed);
      UIKit.util.on(element, 'added', added);
    },
    [moved, removed, added]
  );

  useEffect(() => {
    addEventListener(elementName);
    return () => {};
  }, [addEventListener, elementName]);
}

export default useDragDropListener;
