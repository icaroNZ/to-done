import React from 'react';
import TodoCard from './TodoCard';

function GroupItem({ groupName, groupItems }) {
  return (
    <div>
      <h4 className='uk-text-center'>{groupName}</h4>
      <div
        id={groupName.replace(/\s/g, '_')}
        data-uk-sortable='group: sortable-group'
      >
        {groupItems &&
          groupItems.map((item) => (
            <TodoCard todo={item} key={item._id.$oid} />
          ))}
      </div>
    </div>
  );
}

export default GroupItem;
