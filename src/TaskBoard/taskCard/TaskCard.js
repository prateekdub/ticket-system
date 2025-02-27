import React, { useEffect, useRef, useState } from "react";
import { Draggable } from "../../lib/DragDropProvider.js";
import "./TaskCard.css";
import { STATUS_COLOR } from "../config.js";

export function TaskCard({ task, addSubtask, showAdd=false, status, updateTaskTitle, data }) {
  const [showInput, setShowInput] = useState(false);
  const [subtaskTitle, setSubtaskTitle] = useState("");
  const ref = useRef()

  useEffect(() => {
    if (STATUS_COLOR[status]) {
      ref.current.style.backgroundColor = STATUS_COLOR[status];
    }
  }, [status])

  const handleUpdateSubtask = () => {
    if (subtaskTitle.trim()) {
      updateTaskTitle(task, subtaskTitle)
      setSubtaskTitle("");
      setShowInput(false);
      
    }
  };

  const showInputField = (e) => {
    e.stopPropagation();
    setShowInput(!showInput)
  }

  const addTask = (task, e) => {
    e.stopPropagation();
    addSubtask(task)
  }

  return (
    <Draggable id={task?.id} data={data}>
      <div ref={ref} className={`task-card ${task?.type === "bug" ? "bug" : ""}`} onClick={(e) => showInputField(e)}>
      {!showInput && <span className="task-title">{task?.title}</span>}
        {showAdd && <button className="add-subtask-btn" onClick={(e) => addTask(task, e)} >+</button>}
        {showInput && !showAdd && (
          <div className="subtask-input">
            <input
              type="text"
              value={subtaskTitle}
              onChange={(e) => setSubtaskTitle(e.target.value)}
              placeholder="Enter subtask title"
              onClick={(e) => e.stopPropagation()}
            />
            <button onClick={handleUpdateSubtask}>Update</button>
          </div>
        )}
      </div>
    </Draggable>
  );
}

export default TaskCard;
