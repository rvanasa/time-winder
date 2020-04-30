import React from 'react';

import Item from './Item';
import {Droppable} from 'react-beautiful-dnd';

export default function Inventory(props) {
    let {name, inventories} = props;

    let items = inventories[name];

    let alwaysScrollable = name === 'backpack';

    return (
        <div className="inventory pt-3">
            <Droppable droppableId={name}>
                {(provided, snapshot) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        <div style={{background: '#0002', height: '60vh', overflowY: 'scroll'}}>
                            <div className="p-3" style={{minHeight: alwaysScrollable && '70vh'}}>
                                {items.map((item, i) =>
                                    <Item key={name + item.id} item={item} index={i}/>
                                )}
                                {provided.placeholder}
                            </div>
                        </div>
                    </div>
                )}
            </Droppable>
        </div>
    );
};
