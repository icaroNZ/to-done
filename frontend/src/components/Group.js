import React from 'react';
import GroupItem from './GroupItem';
import useGroupHook from '../hooks/useGroupHook';

function Group({ groups }) {
  const groupNames = ['Waiting', 'Started', 'Finished'];
  useGroupHook(groupNames);

  return (
    <div className='uk-child-width-1-3@s' data-uk-grid>
      {groupNames.map((group, index) => {
        return (
          <GroupItem
            groupItems={groups[index]}
            groupName={group}
            groupNumber={index}
            key={index}
          />
        );
      })}
    </div>
  );
}

export default Group;
