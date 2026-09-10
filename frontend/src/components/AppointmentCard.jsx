function AppointmentCard({
    appointment,
    onEdit,
    onComplete,
    onCancel
}) {

    const formatTime = (time) => {

        const [hours, minutes] =
            time.split(":");

        const date = new Date();

        date.setHours(
            Number(hours),
            Number(minutes)
        );

        return date.toLocaleTimeString(
            [],
            {
                hour: "numeric",
                minute: "2-digit"
            }
        );
    };


    return (

        <div
            className={`appointment-card ${appointment.status}`}
        >

            <div className="appointment-header">

                <div>

                    <h3>
                        {appointment.title}
                    </h3>

                    <span className="time">
                        {formatTime(appointment.start_time)}
                        {" - "}
                        {formatTime(appointment.end_time)}
                    </span>

                </div>


                <span
                    className={`status ${appointment.status}`}
                >
                    {appointment.status}
                </span>

            </div>


            {appointment.description && (

                <p className="description">
                    {appointment.description}
                </p>

            )}


            <div className="appointment-actions">

                {appointment.status === "scheduled" && (

                    <>
                        <button
                            onClick={() =>
                                onEdit(appointment)
                            }
                            className="secondary-button"
                        >
                            Edit
                        </button>

                        <button
                            onClick={() =>
                                onComplete(
                                    appointment.id
                                )
                            }
                            className="success-button"
                        >
                            Complete
                        </button>

                        <button
                            onClick={() =>
                                onCancel(
                                    appointment.id
                                )
                            }
                            className="danger-button"
                        >
                            Cancel
                        </button>
                    </>

                )}

            </div>

        </div>

    );
}


export default AppointmentCard;