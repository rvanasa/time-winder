import React from 'react';

import './Item.scss';
import {Draggable} from 'react-beautiful-dnd';
import classNames from 'classnames/bind';
import {findItemIconSync} from '../services/icon-service';

export default function Item(props) {
    let {item, index} = props;

    let {locked} = item.ctx;

    if(item.hasOwnProperty('preventSelfDrag') && item.preventSelfDrag()) {
        locked = true;
    }

    let Icon = findItemIconSync(item);

    return (
        <Draggable draggableId={String(item.id)}
                   index={index}
                   isDragDisabled={locked}>
            {(provided, snapshot) =>
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                    <div className="py-1">
                        <div
                            className={classNames('inventory-item noselect px-2 py-3 rounded-right rounded-bottom', item.emote, locked && 'locked')}>
                            <h6 className="item-date text-white-50 float-right ml-3 mt-1">{typeof item.date == 'string' ? item.date : item.date && item.date.toLocaleDateString()}</h6>
                            <h4 className="text-uppercase mb-1">
                                {Icon && <Icon className="mr-2" style={{marginTop: '-.25em'}}/>}
                                {item.title}
                            </h4>
                            {item.hasConsumed && (
                                <p className="text-white text-uppercase mb-1 float-right">{item.consumeVerb || 'Ate'} {item.hasConsumed.map(item => item.title).join(', ')}</p>
                            )}
                            {item.message && (
                                <p className="item-message mb-1">{item.message}</p>
                            )}
                        </div>
                    </div>
                </div>
            }
        </Draggable>
    );
};
