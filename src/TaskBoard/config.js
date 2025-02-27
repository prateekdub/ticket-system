export const API_URL = "http://localhost:3001/tickets";

export const STATUS = {
MAIN_STORY: "mainStory",
TODO: "todo",
IN_PROGRESS: "inProgress",
DONE: "done"
}

export const STATUS_COLOR = {
    [STATUS.MAIN_STORY]: "#6C5CE7",
    [STATUS.TODO]: "#FF7675",
    [STATUS.IN_PROGRESS]: "#FDCB6E ",
    [STATUS.DONE]: "#00B894 "
};

export const TICKET_DROPDOWN = ["Ticket", "Bug"]

export const TICKET_TITLE_PLACEHOLDER = "Enter title"

export const TICKET_ADD_BUTTON = "Add Ticket"
