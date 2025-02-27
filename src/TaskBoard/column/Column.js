import React from "react";
import TaskCard from "../taskCard/TaskCard";

export function Column({ status, tasks, heading = '', ticketTitle, ticketId, addSubtask, updateTaskTitle, ticketStatus }) {

  if (status == "mainStory") {
    const obj = {
      id: ticketId,
      title: ticketTitle
    }
    return (
      <div className="column">
        <TaskCard status={ticketStatus} key={obj.id} task={obj} showAdd={true} addSubtask={addSubtask} updateTaskTitle={updateTaskTitle} data={{parent: true}}/>
      </div>
    )
  }
  if ((!tasks || tasks.length == 0)) {
    return <div className="column">{heading}</div>;
  }
  return (
    <div className="column">
      {/* {
        ['todo', 'inProgress', 'done'].includes(ticketStatus) && !tasks?.length && (
          <TaskCard key={ticketTitle} task={[]} status={ticketStatus} addSubtask={addSubtask} updateTaskTitle={updateTaskTitle}/>
        )
      } */}
      {tasks?.length > 0 && tasks.map((task) => (
        <TaskCard key={task.id} task={task} status={task.status} addSubtask={addSubtask} updateTaskTitle={updateTaskTitle}/>
      ))}
    </div>
  );
}



