import React, { useEffect, useState } from "react";
import "./TaskBoard.css";
import { TicketForm } from "../ticketForm/TicketForm";
import { Column } from "../column/Column";
import { DragDropProvider, Droppable } from "../../lib/DragDropProvider";
import { checkIfAllTasksDone, updateTicketData } from "./ticketUtils";
import { add, getData, update } from "../apis";

export default function TaskBoard() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    getData().then((res) => setTickets(res.data));
  }, []);

  const addTicket = (ticket) => {
   add(ticket).then((res) => {
      setTickets([...tickets, res.data]);
    });
  };

  const updateTicket = (id, updatedFields) => {
   update(id, updatedFields).then((res) => {
      setTickets(tickets.map((t) => (t.id === id ? res.data : t)));
    });
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const [ticketId, newStatus] = over.id.split("-"); // Extract ticket ID and new status


    if (active.data?.current?.parent) {
      setTickets((prevTickets) => {
        return prevTickets.map((ticket) => {
          if (ticket.id * 1 == parseInt(ticketId) && !ticket.tasks.length) {
            // Find and update the dragged task
            return { ...ticket, "status": newStatus };
          }
          return ticket;
        });
      });
    }
    else
    setTickets((prevTickets) => {
      return prevTickets.map((ticket) => {
        if (ticket.id * 1 == parseInt(ticketId)) {
          // Find and update the dragged task
          const updatedTasks = ticket.tasks.map((task) => {
           return  task.id === active.id ? { ...task, status: newStatus } : task
          }
          );
          const allDone = checkIfAllTasksDone(newStatus, ticket.tasks);
          let updatedTicket = {...ticket};
          if (allDone) {
            updatedTicket = {...ticket, status: 'done'};
          }
          return { ...updatedTicket, tasks: updatedTasks };
        }
        return ticket;
      });
    });
  };

  const handleTaskTitleChange = (ticketId, taskObj, newTitle) => {
    setTickets(
      updateTicketData(tickets, "UPDATE_TASK_TITLE", {ticketId: ticketId, taskId: taskObj.id, title: newTitle} )
    );
};

  const updateTaskTitle = (ticketId) => {
    return function(taskObj, title) {
      handleTaskTitleChange(ticketId, taskObj, title)
    }
  }


  const addSubtask = (task) => {
    setTickets(
      updateTicketData(tickets, "ADD_SUBTASK", {ticketId: task.id} )
    );
  };


  return (
    <div className="task-board">
      <h1 className="board-title">Task Management Board</h1>
      <TicketForm addTicket={addTicket} />
      <DragDropProvider onDragEnd={handleDragEnd}>
        <div className="board-container">
          <div className="ticket-row">
            <div className="ticket-header"></div>
            <div className="board-grid headers">
              <Column heading="Main Story" />
              <Column heading="To Do" />
              <Column heading="In Progress" />
              <Column heading="Done" />
            </div>
          </div>
          {tickets.map((ticket) => (
            <div key={ticket.id} className="ticket-row">
              <div className="ticket-header">{ticket.title}</div>
              <div className="board-grid">
                {["mainStory", "todo", "inProgress", "done"].map((status) => {
                  const updateTaskTitleCallback = updateTaskTitle(ticket.id)
                  return (
                  <Droppable key={`${ticket.id}-${status}`} id={`${ticket.id}-${status}`}>
                    <Column
                      ticketId={ticket.id}
                      ticketStatus={ticket.status}
                      status={status}
                      ticketTitle={ticket.title}
                      tasks={ticket.tasks.filter((task) => task.status === status)}
                      addSubtask={addSubtask}
                      updateTaskTitle={updateTaskTitleCallback}
                    />
                  </Droppable>)
})}
              </div>
            </div>
          ))}
        </div>
      </DragDropProvider>
    </div>
  );
}
