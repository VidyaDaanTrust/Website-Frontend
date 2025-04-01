import React from "react";
import "./EventsList.css";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const EventsList = ({ events = [] }) => {
  if (!events || events.length === 0) {
    return (
      <div className="events-empty">
        <p>No upcoming events at this time. Check back later!</p>
      </div>
    );
  }

  return (
    <div className="events-list">
      <h2>Upcoming Events</h2>
      <div className="events-grid">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <div className="event-date">{formatDate(event.date)}</div>
            <h3 className="event-title">{event.title}</h3>
            <p className="event-location">
              <i className="location-icon"></i> {event.location}
            </p>
            <p className="event-description">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsList; 