import { updateTicketData, checkIfAllTasksDone } from "../ticketUtils";

describe("updateTicketData", () => {
    let tickets;

    beforeEach(() => {
        tickets = [
            {
                id: 1,
                status: "todo",
                tasks: [
                    { id: 101, title: "Task 1", status: "todo" },
                    { id: 102, title: "Task 2", status: "in-progress" },
                ],
            },
            {
                id: 2,
                status: "in-progress",
                tasks: [
                    { id: 201, title: "Task 3", status: "in-progress" },
                ],
            },
        ];
    });

    test("should update task status", () => {
        const updatedTickets = updateTicketData(tickets, "UPDATE_TASK_STATUS", {
            ticketId: 1,
            taskId: 101,
            newStatus: "done",
        });

        expect(updatedTickets[0].tasks[0].status).toBe("done");
    });

    test("should update ticket status", () => {
        const updatedTickets = updateTicketData(tickets, "UPDATE_TICKET_STATUS", {
            ticketId: 2,
            newStatus: "done",
        });

        expect(updatedTickets[1].status).toBe("done");
    });

    test("should update task title", () => {
        const updatedTickets = updateTicketData(tickets, "UPDATE_TASK_TITLE", {
            ticketId: 1,
            taskId: 102,
            title: "Updated Task 2",
        });

        expect(updatedTickets[0].tasks[1].title).toBe("Updated Task 2");
    });

    test("should add a subtask", () => {
        const updatedTickets = updateTicketData(tickets, "ADD_SUBTASK", {
            ticketId: 1,
        });

        expect(updatedTickets[0].tasks.length).toBe(3);
        expect(updatedTickets[0].tasks[2].title).toBe("New Task");
        expect(updatedTickets[0].tasks[2].status).toBe("todo");
    });

    test("should return original ticket if ticketId doesn't match", () => {
        const updatedTickets = updateTicketData(tickets, "UPDATE_TICKET_STATUS", {
            ticketId: 99, // Non-existing ticket ID
            newStatus: "done",
        });

        expect(updatedTickets).toEqual(tickets); // No changes
    });

    test("should return unchanged tickets for unknown action type", () => {
        const updatedTickets = updateTicketData(tickets, "UNKNOWN_ACTION", {
            ticketId: 1,
        });

        expect(updatedTickets).toEqual(tickets); // No changes
    });
});

describe("checkIfAllTasksDone", () => {

    test("should return true when the last task just got completed", () => {
        const tasks = [
            { id: 1, status: "done" },
            { id: 2, status: "todo" }
        ];
        expect(checkIfAllTasksDone("done", tasks)).toBe(true); // ✅ Should pass
    });


    test("should return false when newStatus is not 'done'", () => {
        const tasks = [
            { id: 1, status: "done" },
            { id: 2, status: "done" },
        ];
        expect(checkIfAllTasksDone("in-progress", tasks)).toBe(false);
    });

    test("should handle empty task list", () => {
        expect(checkIfAllTasksDone("done", [])).toBe(false);
    });
});
