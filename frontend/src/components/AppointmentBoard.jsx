import { useEffect, useState } from "react";

import Filters from "./Filters";
import AppointmentCard from "./AppointmentCard";
import AppointmentForm from "./AppointmentForm";

import {
    getAppointments,
    createAppointment,
    updateAppointment,
    completeAppointment,
    cancelAppointment,
} from "../services/appointmentApi";


function AppointmentBoard() {

    const [appointments, setAppointments] =
        useState([]);

    const [date, setDate] =
        useState("");

    const [status, setStatus] =
        useState("all");

    const [showForm, setShowForm] =
        useState(false);

    const [editingAppointment, setEditingAppointment] =
        useState(null);

    const [message, setMessage] =
        useState("");

    const [error, setError] =
        useState("");

    const [loading, setLoading] =
        useState(false);


    async function loadAppointments() {

        try {

            setLoading(true);

            const data =
                await getAppointments({
                    date,
                    status
                });

            setAppointments(data);

        } catch (err) {

            setError(
                "Unable to load appointments."
            );

        } finally {

            setLoading(false);

        }

    }


    useEffect(() => {

        loadAppointments();

    }, [date, status]);


    function showSuccessMessage(text) {

        setMessage(text);

        setTimeout(() => {
            setMessage("");
        }, 3000);

    }


    function showErrorMessage(text) {

        setError(text);

        setTimeout(() => {
            setError("");
        }, 4000);

    }


    async function handleSubmit(formData) {

        try {

            if (editingAppointment) {

                await updateAppointment(
                    editingAppointment.id,
                    formData
                );

                showSuccessMessage(
                    "Appointment updated successfully."
                );

            } else {

                await createAppointment(
                    formData
                );

                showSuccessMessage(
                    "Appointment created successfully."
                );

            }


            setShowForm(false);

            setEditingAppointment(null);

            loadAppointments();

        } catch (err) {

            let message =
                "Unable to save appointment.";

            if (err?.time) {
                message = err.time;
            }

            if (err?.end_time) {
                message = err.end_time;
            }

            showErrorMessage(message);

        }

    }


    async function handleComplete(id) {

        try {

            await completeAppointment(id);

            showSuccessMessage(
                "Appointment marked as completed."
            );

            loadAppointments();

        } catch (err) {

            showErrorMessage(
                err?.detail ||
                "Unable to complete appointment."
            );

        }

    }


    async function handleCancel(id) {

        const confirmed =
            window.confirm(
                "Are you sure you want to cancel this appointment?"
            );

        if (!confirmed) {
            return;
        }


        try {

            await cancelAppointment(id);

            showSuccessMessage(
                "Appointment cancelled successfully."
            );

            loadAppointments();

        } catch (err) {

            showErrorMessage(
                err?.detail ||
                "Unable to cancel appointment."
            );

        }

    }


    function handleEdit(appointment) {

        setEditingAppointment(
            appointment
        );

        setShowForm(true);

    }


    function handleAdd() {

        setEditingAppointment(null);

        setShowForm(true);

    }


    return (

        <div className="page">

            <header className="page-header">

                <div>

                    <h1>
                        Appointment Board
                    </h1>

                    <p>
                        Manage your team's appointments
                    </p>

                </div>

            </header>


            <Filters
                date={date}
                status={status}
                onDateChange={setDate}
                onStatusChange={setStatus}
                onAdd={handleAdd}
            />


            {message && (

                <div className="success-message">
                    {message}
                </div>

            )}


            {error && (

                <div className="error-message">
                    {error}
                </div>

            )}


            {loading ? (

                <div className="empty-state">
                    Loading appointments...
                </div>

            ) : appointments.length === 0 ? (

                <div className="empty-state">

                    <h3>
                        No appointments found
                    </h3>

                    <p>
                        Try changing your filters
                        or create a new appointment.
                    </p>

                </div>

            ) : (

                <div className="appointment-list">

                    {appointments.map(
                        (appointment) => (

                            <AppointmentCard
                                key={appointment.id}
                                appointment={appointment}
                                onEdit={handleEdit}
                                onComplete={
                                    handleComplete
                                }
                                onCancel={
                                    handleCancel
                                }
                            />

                        )
                    )}

                </div>

            )}


            {showForm && (

                <AppointmentForm
                    appointment={
                        editingAppointment
                    }
                    onClose={() => {
                        setShowForm(false);
                        setEditingAppointment(null);
                    }}
                    onSubmit={handleSubmit}
                />

            )}

        </div>

    );
}


export default AppointmentBoard;