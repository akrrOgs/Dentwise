"use client";

import {
  bookAppointment,
  getAppointments,
  getBookedTimeSlots,
  getUserAppointments,
  updateAppointmentsStatus,
} from "@/lib/actions/appointments.actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetAppointments() {
  const result = useQuery({
    queryKey: ["getAppointments"],
    queryFn: getAppointments,
  });

  return result;
}

export function useBookedTimeSlots(doctorId: string, date: string) {
  return useQuery({
    queryKey: ["getBookedTimeSlots"],
    queryFn: () => getBookedTimeSlots(doctorId!, date),
    enabled: !!doctorId && !!date,
  });
}

export function useBookAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bookAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getUserAppointments"],
      });
    },
    onError: (error) => console.error("Failed to book appointment", error),
  });
}

export function useUserAppointments() {
  const result = useQuery({
    queryKey: ["getUserAppointments"],
    queryFn: getUserAppointments,
  });

  return result;
}

export function useUpdateAppointments() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAppointmentsStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAppointments"] });
    },
    onError: (error) => console.error("Failed to update appointment", error),
  });
}
