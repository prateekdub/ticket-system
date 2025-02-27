import React, { useState } from "react";
import "./TicketForm.css";
import { TICKET_TITLE_PLACEHOLDER, TICKET_DROPDOWN, TICKET_ADD_BUTTON } from "../config";
import { validateAndSanitizeInput } from "../helper";


export function TicketForm({ addTicket }) {
  const [type, setType] = useState("ticket");
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    if (!title.trim()) return;
    addTicket({ id: Date.now(), type, title, tasks: [], status: "" });
    setTitle("");
  };

  const titleChange = (e) => {
    const inputSanitized =  validateAndSanitizeInput(e)
    if (inputSanitized?.isValid)
    setTitle(inputSanitized?.sanitized)
  }

  return (
    <div className="ticket-form-container">
    <form className="ticket-form" onSubmit={handleSubmit}>

      {/* drop down starts */}
      <select className="ticket-dropdown" value={type} onChange={(e) => setType(e.target.value)}>
      {TICKET_DROPDOWN.map(x => {
        return (
          <option value={x.toLowerCase()}>{x}</option>
        )
      })}
      </select>

      {/* dropdown ends */}

      {/* input starts */}
      <input
        className="ticket-input"
        type="text"
        placeholder={TICKET_TITLE_PLACEHOLDER}
        value={title}
        onChange={(e) => titleChange(e.target.value)}
      />
      {/* input ends */}
      <button className="ticket-button" type="submit">{TICKET_ADD_BUTTON}</button>
    </form>
    </div>
  );
}
