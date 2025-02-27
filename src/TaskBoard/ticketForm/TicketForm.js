import React, { useState } from "react";
import "./TicketForm.css";


export function TicketForm({ addTicket }) {
  const [type, setType] = useState("ticket");
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    // e.preventDefault();
    if (!title.trim()) return;
    addTicket({ id: Date.now(), type, title, tasks: [], status: "" });
    setTitle("");
  };

  return (
    <div className="ticket-form-container">
    <form className="ticket-form" onSubmit={handleSubmit}>

      {/* drop down starts */}
      <select className="ticket-dropdown" value={type} onChange={(e) => setType(e.target.value)}>
        <option value="ticket">Ticket</option>
        <option value="bug">Bug</option>
      </select>

      {/* dropdown ends */}

      {/* input starts */}
      <input
        className="ticket-input"
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {/* input ends */}
      <button className="ticket-button" type="submit">Add Ticket</button>
    </form>
    </div>
  );
}
