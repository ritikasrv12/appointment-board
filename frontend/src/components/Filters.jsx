function Filters({
    date,
    status,
    onDateChange,
    onStatusChange,
    onAdd
}) {

    return (

        <div className="filters">

            <div className="filter-group">

                <label>
                    Date
                </label>

                <input
                    type="date"
                    value={date}
                    onChange={(e) =>
                        onDateChange(e.target.value)
                    }
                />

            </div>


            <div className="filter-group">

                <label>
                    Status
                </label>

                <select
                    value={status}
                    onChange={(e) =>
                        onStatusChange(e.target.value)
                    }
                >

                    <option value="all">
                        All
                    </option>

                    <option value="scheduled">
                        Scheduled
                    </option>

                    <option value="completed">
                        Completed
                    </option>

                    <option value="cancelled">
                        Cancelled
                    </option>

                </select>

            </div>


            <button
                className="add-button"
                onClick={onAdd}
            >
                + Add Appointment
            </button>

        </div>

    );
}


export default Filters;