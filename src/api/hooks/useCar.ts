import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api2 } from ".."
import type { ICar } from "../../types"

export const car = "car"

export const useCar = () => {
    const client = useQueryClient()

    const getCars = () => useQuery({
        queryKey: [car],
        queryFn: () => api2.get("car").then(res => res.data)
    })

    const getCarById = (id: string) => useQuery({
        queryKey: [car],
        queryFn: () => api2.get(`car/${id}`).then(res => res.data)
    })

    const createCar = useMutation({
        mutationFn: (data: ICar) => api2.post("car", data),
        onSuccess: () => {
            client.invalidateQueries({ queryKey: [car] })
        }
    })

    const deleteCar = useMutation({
        mutationFn: (id: string) => api2.delete(`car/${id}`),
        onSuccess: () => {
            client.invalidateQueries({ queryKey: [car] })
        }
    })

    const updateCar = useMutation({
        mutationFn: ({ id, data }: { id: string, data: ICar }) => api2.patch(`car/${id}`, data),
        onSuccess: () => {
            client.invalidateQueries({ queryKey: [car] })
        }
    })

    return { getCars, getCarById, createCar, deleteCar, updateCar }
}