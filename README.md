# Appointment Board

A simple appointment management application built with a Django REST API backend and React frontend.

## Features

- View appointments
- Add new appointments
- Edit existing appointments
- Mark appointments as completed
- Cancel appointments
- Filter appointments by date and status
- Prevent overlapping scheduled appointments
- Validate appointment time and required fields
- Show success and error messages
- Includes sample appointments for easy review

## Tech Stack

### Frontend
- React
- Vite
- JavaScript
- CSS

### Backend
- Python
- Django
- Django REST Framework
- PostgreSQL

## Project Structure

```text
appointment-board/
├── backend/
├── frontend/
├── .gitignore
└── README.md


## How It Works

The application provides a board for managing appointments.

Users can filter appointments by date or status and create new appointments by entering a title, description, date, start time, and end time.

The application validates the required fields, checks that the end time is after the start time, and prevents overlapping scheduled appointments.

Existing appointments can be edited, completed, or cancelled. Cancelled appointments remain visible on the board with their cancelled status.


## Assumptions
PostgreSQL is used as the application database.
Overlapping scheduled appointments are not allowed for the same date.
Cancelled appointments remain visible for review.
Sample appointments are included so the board can be reviewed immediately.