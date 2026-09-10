from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Appointment
from .serializers import AppointmentSerializer


class AppointmentViewSet(viewsets.ModelViewSet):

    queryset = Appointment.objects.all()

    serializer_class = AppointmentSerializer

    def get_queryset(self):

        queryset = Appointment.objects.all()

        date = self.request.query_params.get("date")

        appointment_status = self.request.query_params.get("status")

        if date:
            queryset = queryset.filter(
                date=date
            )

        if appointment_status and appointment_status != "all":
            queryset = queryset.filter(
                status=appointment_status
            )

        return queryset

    @action(
        detail=True,
        methods=["post"]
    )
    def complete(self, request, pk=None):

        appointment = self.get_object()

        if appointment.status == Appointment.Status.CANCELLED:

            return Response(
                {
                    "detail": "Cancelled appointment cannot be completed."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        appointment.status = Appointment.Status.COMPLETED

        appointment.save(
            update_fields=[
                "status",
                "updated_at"
            ]
        )

        return Response(
            AppointmentSerializer(appointment).data
        )

    @action(
        detail=True,
        methods=["post"]
    )
    def cancel(self, request, pk=None):

        appointment = self.get_object()

        if appointment.status == Appointment.Status.COMPLETED:

            return Response(
                {
                    "detail": "Completed appointment cannot be cancelled."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        appointment.status = Appointment.Status.CANCELLED

        appointment.save(
            update_fields=[
                "status",
                "updated_at"
            ]
        )

        return Response(
            AppointmentSerializer(appointment).data
        )