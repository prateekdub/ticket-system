import React from "react";
import TaskCard from "../taskCard/TaskCard";
import { STATUS } from "../config";

export function Column({ status, tasks, heading = '', ticketTitle, ticketId, addSubtask,
  updateTaskTitle, ticketStatus }) {

  if (heading) {
    return <div className="column">{heading}</div>
  }else if ((!tasks || tasks.length == 0) && ticketStatus == status) {
    const obj = {
      id: ticketId,
      title: ticketTitle
    }
    return (
      <div className="column">
        <TaskCard status={ticketStatus} key={obj.id} task={obj} showAdd={true} addSubtask={addSubtask} updateTaskTitle={updateTaskTitle} data={{ parent: true }} />
      </div>
    )
  }else if (status == STATUS.MAIN_STORY) {
    const obj = {
      id: ticketId,
      title: ticketTitle
    }
    return (
      <div className="column">
        <TaskCard status={ticketStatus} key={obj.id} task={obj} showAdd={true} addSubtask={addSubtask} updateTaskTitle={updateTaskTitle} data={{ parent: true }} />
      </div>
    )
  }
  
  return (
    <div className="column">

      {tasks?.length > 0 && tasks.map((task) => (
        <TaskCard key={task.id} task={task} status={task.status} addSubtask={addSubtask} updateTaskTitle={updateTaskTitle} />
      ))}
    </div>
  );
}



