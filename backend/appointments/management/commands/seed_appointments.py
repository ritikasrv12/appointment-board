from django.core.management.base import BaseCommand
from datetime import date, time

from appointments.models import Appointment


class Command(BaseCommand):

    help = "Create sample appointments"

    def handle(self, *args, **kwargs):

        Appointment.objects.all().delete()

        Appointment.objects.create(
            title="Team Meeting",
            description="Discuss project progress",
            date=date(2026, 9, 10),
            start_time=time(10, 0),
            end_time=time(11, 0),
            status=Appointment.Status.SCHEDULED,
        )

        Appointment.objects.create(
            title="Client Discussion",
            description="Discuss requirements with client",
            date=date(2026, 9, 10),
            start_time=time(11, 30),
            end_time=time(12, 30),
            status=Appointment.Status.SCHEDULED,
        )

        Appointment.objects.create(
            title="Project Review",
            description="Review completed tasks",
            date=date(2026, 9, 10),
            start_time=time(14, 0),
            end_time=time(15, 0),
            status=Appointment.Status.COMPLETED,
        )

        Appointment.objects.create(
            title="Design Discussion",
            description="Discuss UI changes",
            date=date(2026, 9, 11),
            start_time=time(10, 30),
            end_time=time(11, 30),
            status=Appointment.Status.CANCELLED,
        )

        self.stdout.write(
            self.style.SUCCESS(
                "Sample appointments created successfully."
            )
        )