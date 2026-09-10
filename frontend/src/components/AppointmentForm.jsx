import { useEffect, useState } from "react";


function AppointmentForm({
    appointment,
    onClose,
    onSubmit
}) {

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        start_time: "",
        end_time: "",
    });


    const [error, setError] = useState("");


    useEffect(() => {

        if (appointment) {

            setFormData({
                title: appointment.title,
                description:
                    appointment.description || "",
                date: appointment.date,
                start_time:
                    appointment.start_time.slice(0, 5),
                end_time:
                    appointment.end_time.slice(0, 5),
            });

        }

    }, [appointment]);


    function handleChange(e) {

        const {
            name,
            value
        } = e.target;

        setFormData(
            (previous) => ({
                ...previous,
                [name]: value
            })
        );
    }


    function handleSubmit(e) {

        e.preventDefault();

        setError("");


        if (!formData.title.trim()) {
            setError("Title is required.");
            return;
        }

        if (!formData.date) {
            setError("Date is required.");
            return;
        }

        if (!formData.start_time) {
            setError("Start time is required.");
            return;
        }

        if (!formData.end_time) {
            setError("End time is required.");
            return;
        }


        if (
            formData.end_time <=
            formData.start_time
        ) {

            setError(
                "End time must be after start time."
            );

            return;
        }


        onSubmit(formData);

    }


    return (

        <div className="modal-overlay">

            <div className="modal">

                <div className="modal-header">

                    <h2>
                        {appointment
                            ? "Edit Appointment"
                            : "Add Appointment"}
                    </h2>

                    <button
                        className="close-button"
                        onClick={onClose}
                    >
                        ×
                    </button>

                </div>


                {error && (

                    <div className="error-message">
                        {error}
                    </div>

                )}


                <form
                    onSubmit={handleSubmit}
                >

                    <div className="form-group">

                        <label>
                            Title *
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Appointment title"
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Description
                        </label>

                        <textarea
                            name="description"
                            value={
                                formData.description
                            }
                            onChange={handleChange}
                            placeholder="Appointment description"
                            rows="3"
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Date *
                        </label>

                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                        />

                    </div>


                    <div className="time-row">

                        <div className="form-group">

                            <label>
                                Start Time *
                            </label>

                            <input
                                type="time"
                                name="start_time"
                                value={
                                    formData.start_time
                                }
                                onChange={handleChange}
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                End Time *
                            </label>

                            <input
                                type="time"
                                name="end_time"
                                value={
                                    formData.end_time
                                }
                                onChange={handleChange}
                            />

                        </div>

                    </div>


                    <div className="form-actions">

                        <button
                            type="button"
                            className="secondary-button"
                            onClick={onClose}
                        >
                            Close
                        </button>

                        <button
                            type="submit"
                            className="primary-button"
                        >
                            {appointment
                                ? "Update"
                                : "Create"}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );
}


export default AppointmentForm;