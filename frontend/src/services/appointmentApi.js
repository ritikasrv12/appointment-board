const API_URL = "http://127.0.0.1:8000/api/appointments";


export async function getAppointments(filters = {}) {

    const params = new URLSearchParams();

    if (filters.date) {
        params.append("date", filters.date);
    }

    if (
        filters.status &&
        filters.status !== "all"
    ) {
        params.append(
            "status",
            filters.status
        );
    }

    const queryString = params.toString();

    const url = queryString
        ? `${API_URL}/?${queryString}`
        : `${API_URL}/`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(
            "Failed to fetch appointments."
        );
    }

    return response.json();
}


export async function createAppointment(data) {

    const response = await fetch(
        `${API_URL}/`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(data),
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw result;
    }

    return result;
}


export async function updateAppointment(
    id,
    data
) {

    const response = await fetch(
        `${API_URL}/${id}/`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(data),
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw result;
    }

    return result;
}


export async function completeAppointment(id) {

    const response = await fetch(
        `${API_URL}/${id}/complete/`,
        {
            method: "POST",
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw result;
    }

    return result;
}


export async function cancelAppointment(id) {

    const response = await fetch(
        `${API_URL}/${id}/cancel/`,
        {
            method: "POST",
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw result;
    }

    return result;
}