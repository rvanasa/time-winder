import React, {useState} from 'react';

import './App.scss';
import {Col, Row} from 'react-bootstrap';
import Inventory from './Inventory';
import classNames from 'classnames/bind';
import uid from 'uid';
import {DragDropContext} from 'react-beautiful-dnd';
import {findItemsByDate, MONTHS} from '../services/item-service';
import {AiFillLock, FaBone, FaDog} from 'react-icons/all';

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const updateQueue = [];
const updateDelta = .1;
setInterval(() => {
    for(let i = 0; i < updateQueue.length; i++) {
        updateQueue[i].update(updateDelta);
    }
    // updateQueue.length = 0;
}, updateDelta * 1000);

let keyTimeTravelTimeout = null;

export default function App() {
    let now = new Date();

    let [timeTravelClass, setTimeTravelClass] = useState(null);

    let [year, setYear] = useState(now.getFullYear());
    let [month, setMonth] = useState(now.getMonth());
    let [day, setDay] = useState(now.getDate());

    let [todayItems, setTodayItems] = useState(null);
    let [todayOverrides, setTodayOverrides] = useState({});

    let travelDate = new Date(year, month, day);
    let travelDateString = travelDate.toDateString();

    if(todayOverrides.hasOwnProperty(travelDateString)) {
        todayItems = todayOverrides[travelDateString];
    }
    else if(!todayItems) {
        findItemsByDate(travelDate)
            .then(items => setTodayItems(items));
    }

    let [inventories, setInventories] = useState({
        today: [],
        backpack: [
            {
                id: 'stevie-o',
                type: 'person',
                title: 'Stevie-o',
                date: now,
                icon: FaDog,
                skeletonIcon: FaBone,
                message: '"Bark! Woof!"',
                emote: 'friendly',
            },
        ]
    });
    if(todayItems) {
        inventories.today = todayItems;
    }

    let contexts = {};

    updateQueue.length = 0;
    Object.entries(inventories).forEach(([name, items]) => {
        let ctx = {
            date: travelDate,
            name,
            items,
            inventories,
            queryArray(key) {
                return this.items.map(item =>
                    item.hasOwnProperty(key)
                        ? (typeof item[key] === 'function' ? item[key](ctx) : item[key])
                        : undefined);
            },
            queryAny(key) {
                return this.queryArray(key).some(a => a);
            },
            applyInventory(name, items) {
                inventories[name] = items;

                // TODO dry
                if(name === 'today') {
                    setTodayOverrides({
                        ...todayOverrides,
                        [travelDateString]: items,
                    });
                }
                setInventories({...inventories});
            },
        };
        contexts[name] = ctx;
        items.forEach(item => {
            if(!item.id) {
                item.id = uid();
            }
            item.ctx = ctx;
            if(item.onView) {
                item.onView();
            }
            if(item.update) {
                updateQueue.push(item);
            }
        });

        let allItems = [...items];
        let consumableItems = [...items];
        allItems.forEach(item => {
            if(item.willConsume) {
                consumableItems.forEach((other, i) => {
                    if(!other) {
                        return;
                    }
                    if(item !== other && item.willConsume(other)) {
                        consumableItems[i] = null;
                        let index = items.indexOf(other);
                        if(index !== -1) {
                            items.splice(index, 1);
                        }
                        ctx.applyInventory(name, items);

                        (item.hasConsumed = item.hasConsumed || []).push(other);
                        if(item.hasOwnProperty('onConsume')) {
                            item.onConsume(other);
                        }
                    }
                });
            }
        });

        ctx.locked = ctx.queryAny('preventDrag');
    });

    function onDragEnd(result) {
        let {source, destination} = result;

        if(!destination) {
            return;
        }

        if(source.droppableId === destination.droppableId) {
            inventories[destination.droppableId] = reorder(
                inventories[destination.droppableId],
                source.index,
                destination.index,
            );
        }
        else {
            let dropItem = inventories[source.droppableId][source.index];
            dropItem.ctx = contexts[destination.droppableId];

            Object.assign(inventories, move(
                inventories[source.droppableId],
                inventories[destination.droppableId],
                source,
                destination,
            ));

            // let destItems = [...inventories[destination.droppableId]];
            // destItems.forEach(item => {
            //     // item.ctx = contexts[destination.droppableId];
            //     if(item.willConsume) {
            //         destItems.forEach(other => {
            //             if(item !== other && item.willConsume(other)) {
            //
            //                 let items = inventories[destination.droppableId];
            //                 let index = items.indexOf(other);
            //                 if(index !== -1) {
            //                     items.splice(index, 1);
            //                 }
            //
            //                 (item.hasConsumed = item.hasConsumed || []).push(other);
            //                 if(item.hasOwnProperty('onConsume')) {
            //                     item.onConsume(other);
            //                 }
            //             }
            //         });
            //     }
            // });
        }

        //TODO dry
        if(source.droppableId === 'today' || destination.droppableId === 'today') {
            setTodayOverrides({
                ...todayOverrides,
                [travelDateString]: inventories.today,
            });
        }

        setInventories({...inventories});
    }

    let [minYear, maxYear] = [2003, 2019];

    let maxDay = new Date(year, +month + 1, 0).getDate();
    day = Math.min(day, maxDay);

    let sliders = [
        [month, setMonth, 0, 11, MONTHS[month].toUpperCase().slice(0, 3), year > maxYear],
        [day, setDay, 1, maxDay, day.toString().padStart(2, '0'), year > maxYear],
        [year, setYear, minYear, maxYear, year],
    ];

    function onKeyDown(e) {
        function moveFocus(n) {
            e.preventDefault();
            let index = Math.max(0, Math.min(sliders.length - 1, parseInt(e.target.id.slice(-1)) + n));
            let element = document.getElementById(e.target.id.slice(0, -1) + index);
            if(element) {
                element.focus();
            }
        }

        if(e.keyCode === 38) {// Up
            moveFocus(-1);
        }
        else if(e.keyCode === 40) {// Down
            moveFocus(1);
        }

        else if(e.keyCode === 37 || e.keyCode === 39) {// Left || Right
            setTimeTravelClass('time-jump-' + (e.keyCode === 37 ? 'left' : 'right'));
            clearTimeout(keyTimeTravelTimeout);
            keyTimeTravelTimeout = setTimeout(() => {
                setTimeTravelClass(null);
            }, 200);
        }
    }

    return (
        <div>
            <div className="pt-3 pb-1" style={{background: '#0005'}}>
                <Row className="text-center">
                    <Col md={1}/>
                    <Col md={3} className="d-none d-md-block">
                        <h2 className="mb-0 text-primary text-left pt-1 mt-4 ml-5 cursor-default">
                            OUTSIDE
                            {contexts.today.locked && (
                                <AiFillLock className="text-light ml-3" style={{marginTop: '-.25em', opacity: .6}}/>
                            )}
                        </h2>
                    </Col>
                    <Col md={4}>
                        <div className={classNames(timeTravelClass)}>
                            <div className="form-group">
                                {sliders.map(([get, set, min, max, label, subtle], i) =>
                                    <div key={i} className="px-3 pr-sm-5 px-md-0">
                                        <Row className="text-right text-info">
                                            <Col xs={2} className="pl-0">
                                                <label className="h5 mt-1 pt-2">{label}</label>
                                            </Col>
                                            <Col xs={10} className="p-0">
                                                <input
                                                    type="range"
                                                    id={'slider-' + i}
                                                    className="form-control"
                                                    min={min}
                                                    max={max}
                                                    style={{opacity: subtle ? .2 : 1, pointerEvents: subtle && 'none'}}
                                                    value={Math.min(max, Math.max(min, get))}
                                                    onChange={e => {
                                                        setTodayItems(null);
                                                        setYear(Math.min(year, maxYear)); ///
                                                        set(e.target.value);
                                                    }}
                                                    onMouseDown={() => setTimeTravelClass('time-traveling')}
                                                    onMouseUp={() => setTimeTravelClass(null)}
                                                    onKeyDown={onKeyDown}
                                                    onBlur={e => e.relatedTarget || e.target.focus()}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Col>
                    <Col md={3} className="d-none d-md-block">
                        <h2 className="text-primary text-right pt-1 mt-4 mr-5 cursor-default">
                            {contexts.backpack.locked && (
                                <AiFillLock className="text-light mr-3" style={{marginTop: '-.25em', opacity: .6}}/>
                            )}
                            INSIDE
                        </h2>
                    </Col>
                    <Col md={1}/>
                </Row>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className={classNames(timeTravelClass)}>
                    <Row>
                        <Col md={1}/>
                        <Col md={5}>
                            {inventories.today && travelDate.getFullYear() <= maxYear && (
                                <Inventory name="today" inventories={inventories}/>
                            )}
                        </Col>
                        <Col md={5}>
                            <Inventory name="backpack" inventories={inventories}/>
                        </Col>
                        <Col md={1}/>
                    </Row>
                </div>
            </DragDropContext>
        </div>
    );
};
