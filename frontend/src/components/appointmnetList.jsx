import React, { useMemo, useState } from "react";
import "./AppointmentList.css";

const AppointmentList = ({
  appointments = [],
  onEdit,
  onComplete,
  onCancel,
}) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");

  const filteredAppointments = useMemo(() => {
    return appointments
      .filter((appointment) => {
        const searchText = search.toLowerCase();

        const matchesSearch =
          appointment.title?.toLowerCase().includes(searchText) ||
          appointment.description?.toLowerCase().includes(searchText);

        const matchesStatus =
          statusFilter === "all" ||
          appointment.status?.toLowerCase() === statusFilter;

        const matchesDate =
          !dateFilter || appointment.date === dateFilter;

        return matchesSearch && matchesStatus && matchesDate;
      })
      .sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.start_time}`);
        const dateB = new Date(`${b.date}T${b.start_time}`);

        return dateA - dateB;
      });
  }, [appointments, search, statusFilter, dateFilter]);

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (time) => {
    if (!time) return "";

    const [hours, minutes] = time.split(":");

    const date = new Date();
    date.setHours(Number(hours), Number(minutes), 0);

    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "status-completed";

      case "cancelled":
        return "status-cancelled";

      case "scheduled":
      default:
        return "status-scheduled";
    }
  };

  const getStatusLabel = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "Completed";

      case "cancelled":
        return "Cancelled";

      case "scheduled":
      default:
        return "Scheduled";
    }
  };

  return (
    <div className="appointment-page">

      {/* Header */}
      <div className="appointment-header">
        <div>
          <h1>Appointments</h1>
          <p>Manage your upcoming appointments</p>
        </div>

        <button className="add-button">
          <span>+</span>
          Add Appointment
        </button>
      </div>

      {/* Filters */}
      <div className="appointment-toolbar">

        {/* Search */}
        <div className="search-box">
          <span className="search-icon">⌕</span>

          <input
            type="text"
            placeholder="Search appointments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Date */}
        <div className="filter-control">
          <label>Date</label>

          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>

        {/* Status */}
        <div className="filter-control">
          <label>Status</label>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

      </div>

      {/* Appointment count */}
      <div className="list-header">
        <span>
          {filteredAppointments.length} appointment
          {filteredAppointments.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Appointment List */}
      <div className="appointment-list">

        {filteredAppointments.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📅</div>
            <h3>No appointments found</h3>
            <p>
              Try changing your search or filter to find an appointment.
            </p>
          </div>
        ) : (
          filteredAppointments.map((appointment) => (
            <div
              className={`appointment-card ${
                appointment.status?.toLowerCase() === "cancelled"
                  ? "cancelled-card"
                  : ""
              }`}
              key={appointment.id}
            >

              {/* Time column */}
              <div className="appointment-time">
                <strong>
                  {formatTime(appointment.start_time)}
                </strong>

                <span>
                  {formatTime(appointment.end_time)}
                </span>
              </div>

              {/* Vertical line */}
              <div className="timeline">
                <div className="timeline-dot"></div>
                <div className="timeline-line"></div>
              </div>

              {/* Main content */}
              <div className="appointment-content">

                <div className="appointment-top">

                  <div>
                    <h2>{appointment.title}</h2>

                    {appointment.description && (
                      <p className="description">
                        {appointment.description}
                      </p>
                    )}
                  </div>

                  <span
                    className={`status-badge ${getStatusClass(
                      appointment.status
                    )}`}
                  >
                    <span className="status-dot"></span>
                    {getStatusLabel(appointment.status)}
                  </span>

                </div>

                {/* Details */}
                <div className="appointment-details">

                  <span>
                    📅 {formatDate(appointment.date)}
                  </span>

                  <span>
                    🕐 {formatTime(appointment.start_time)} –{" "}
                    {formatTime(appointment.end_time)}
                  </span>

                </div>

                {/* Actions */}
                {appointment.status?.toLowerCase() !== "cancelled" &&
                  appointment.status?.toLowerCase() !== "completed" && (
                    <div className="appointment-actions">

                      <button
                        className="action-edit"
                        onClick={() => onEdit?.(appointment)}
                      >
                        Edit
                      </button>

                      <button
                        className="action-complete"
                        onClick={() => onComplete?.(appointment)}
                      >
                        ✓ Complete
                      </button>

                      <button
                        className="action-cancel"
                        onClick={() => onCancel?.(appointment)}
                      >
                        Cancel
                      </button>

                    </div>
                  )}

              </div>

            </div>
          ))
        )}

      </div>
    </div>
  );
};

export default AppointmentList;