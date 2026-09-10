from rest_framework import serializers
from .models import Appointment


class AppointmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Appointment

        fields = [
            "id",
            "title",
            "description",
            "date",
            "start_time",
            "end_time",
            "status",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "status",
            "created_at",
            "updated_at",
        ]

    def validate(self, data):

        start_time = data.get(
            "start_time",
            getattr(self.instance, "start_time", None)
        )

        end_time = data.get(
            "end_time",
            getattr(self.instance, "end_time", None)
        )

        date = data.get(
            "date",
            getattr(self.instance, "date", None)
        )

        if start_time and end_time:

            if end_time <= start_time:
                raise serializers.ValidationError({
                    "end_time": "End time must be after start time."
                })

        if date and start_time and end_time:

            overlapping = Appointment.objects.filter(
                date=date,
                status=Appointment.Status.SCHEDULED
            ).filter(
                start_time__lt=end_time,
                end_time__gt=start_time
            )

            # During edit, don't compare the appointment with itself
            if self.instance:
                overlapping = overlapping.exclude(
                    id=self.instance.id
                )

            if overlapping.exists():

                conflicting = overlapping.first()

                raise serializers.ValidationError({
                    "time": (
                        f"This time slot overlaps with "
                        f"'{conflicting.title}' "
                        f"({conflicting.start_time.strftime('%H:%M')} - "
                        f"{conflicting.end_time.strftime('%H:%M')})."
                    )
                })

        return data