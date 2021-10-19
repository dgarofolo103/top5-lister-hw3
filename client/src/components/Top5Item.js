import { React, useContext, useState } from "react";
import { GlobalStoreContext } from '../store'
/*
    This React component represents a single item in our
    Top 5 List, which can be edited or moved around.
    
    @author McKilla Gorilla
*/
function Top5Item(props) {
    const { store } = useContext(GlobalStoreContext);
    const [draggedTo, setDraggedTo] = useState(0);
    const [editActive, setEditActive] = useState(0);
    const [newText, setNewText] = useState(0);

    function handleDragStart(event) {
        event.dataTransfer.setData("item", event.target.id);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDragEnter(event) {
        event.preventDefault();
        setDraggedTo(true);
    }

    function handleDragLeave(event) {
        event.preventDefault();
        setDraggedTo(false);
    }

    function handleDrop(event) {
        event.preventDefault();
        let target = event.target;
        let targetId = target.id;
        targetId = targetId.substring(target.id.indexOf("-") + 1);
        let sourceId = event.dataTransfer.getData("item");
        sourceId = sourceId.substring(sourceId.indexOf("-") + 1);
        setDraggedTo(false);

        // UPDATE THE LIST
        store.addMoveItemTransaction(sourceId, targetId);
    }

    function handleClick(event) {
        setEditActive(true);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            setEditActive(false);
            let newValue = newText;
            let oldValue = props.text;

            store.addChangeItemTransaction(props.index, oldValue, newValue);
        }
    }

    function handleUpdate (event)  {
        setNewText(event.target.value);
    }

    let { index } = props;
    let itemClass = "top5-item";
    if (draggedTo) {
        itemClass = "top5-item-dragged-to";
    }
    if (editActive) {
        return (
            <input
            id={'item-' + (index + 1)}
            className={itemClass}
            onKeyPress={handleKeyPress}
            onChange = {handleUpdate}
            defaultValue={props.text}
            />
        )
    }
    else {
        return (
            <div
                id={'item-' + (index + 1)}
                className={itemClass}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                draggable="true"
            >
                <input
                    type="button"
                    id={"edit-item-" + index + 1}
                    className="list-card-button"
                    onClick={handleClick}
                    value={"\u270E"}
                />
                {props.text}
            </div>)
    }
}

export default Top5Item;