import React from "react";
import { render, screen } from "@testing-library/react";
// import {Column} from "../Column";
import TaskCard from "../../taskCard/TaskCard";
import { STATUS } from "../../config";
import { Column } from "../Column";

jest.mock("../../taskCard/TaskCard", () => jest.fn(() => <div data-testid="task-card"></div>));

describe("Column Component", () => {
  const mockAddSubtask = jest.fn();
  const mockUpdateTaskTitle = jest.fn();

  test("renders a heading if provided", () => {
    render(<Column heading="Test Heading" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
  });

//   test("renders a TaskCard when ticketStatus matches status and no tasks exist", () => {
//     render(
//       <Column 
//         status="todo" 
//         tasks={[]} 
//         ticketTitle="Test Ticket" 
//         ticketId="1" 
//         ticketStatus="todo"
//         addSubtask={mockAddSubtask}
//         updateTaskTitle={mockUpdateTaskTitle}
//       />
//     );
    
//     expect(screen.getByTestId("task-card")).toBeInTheDocument();
//   });

//   test("renders TaskCard for all tasks in the list", () => {
//     const tasks = [
//       { id: "1", title: "Task 1", status: "todo" },
//       { id: "2", title: "Task 2", status: "in-progress" }
//     ];

//     render(
//       <Column 
//         status="todo" 
//         tasks={tasks} 
//         addSubtask={mockAddSubtask} 
//         updateTaskTitle={mockUpdateTaskTitle} 
//       />
//     );

//     const taskCards = screen.getAllByTestId("task-card");
//     expect(taskCards).toHaveLength(2);
//   });

//   test("renders TaskCard when status is STATUS.MAIN_STORY", () => {
//     render(
//       <Column 
//         status={STATUS.MAIN_STORY} 
//         tasks={[]} 
//         ticketTitle="Main Story" 
//         ticketId="1" 
//         ticketStatus="todo"
//         addSubtask={mockAddSubtask}
//         updateTaskTitle={mockUpdateTaskTitle}
//       />
//     );

//     expect(screen.getByTestId("task-card")).toBeInTheDocument();
//   });

  test("does not render tasks when list is empty and conditions aren't met", () => {
    const { container } = render(
      <Column 
        status="in-progress" 
        tasks={[]} 
        ticketStatus="todo" 
        addSubtask={mockAddSubtask} 
        updateTaskTitle={mockUpdateTaskTitle}
      />
    );

    expect(container.querySelector(".column").children.length).toBe(0);
  });
});
