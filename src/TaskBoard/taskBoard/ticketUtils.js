export const updateTicketData = (tickets, actionType, payload) => {
    return tickets.map((ticket) => {
      if (ticket.id * 1 !== parseInt(payload.ticketId)) return ticket;
  
      switch (actionType) {
        case "UPDATE_TASK_STATUS":
          return {
            ...ticket,
            tasks: ticket.tasks.map((task) =>
              task.id === payload.taskId
                ? { ...task, status: payload.newStatus }
                : task
            ),
          };
  
        case "UPDATE_TICKET_STATUS":
          return { ...ticket, status: payload.newStatus };
  
        case "UPDATE_TASK_TITLE":
          return {
            ...ticket,
            tasks: ticket.tasks.map((task) =>
              task.id === payload.taskId ? { ...task, title: payload.title } : task
            ),
          };
  
        case "ADD_SUBTASK":
          return {
            ...ticket,
            tasks: [
              ...ticket.tasks,
              {
                id: Math.random(),
                title: "New Task",
                status: "todo",
              },
            ],
          };
  
        default:
          return ticket;
      }
    });
  };


  export const checkIfAllTasksDone = (newStatus, tasks) => {
    if (newStatus == 'done') {
      const flag = tasks?.every(x => x.status == 'done');
      const count = tasks.reduce((counter, {status}) => status == 'done' ? counter + 1 : counter, 0);
      return count + 1 === tasks.length ? true : false
    }
    return false;
  }
  