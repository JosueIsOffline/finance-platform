import { toast } from "sonner"
import { InferRequestType, InferResponseType } from "hono"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { client } from "@/lib/hono"

type ResponseType = InferResponseType<typeof client.api.accounts[":id"]["$delete"]>

export const useDeleteAccount = (id?: string) => {
    const queryClient = useQueryClient()

    const mutation = useMutation<
        ResponseType,
        Error
    >({
        mutationFn: async (json) => {
            const response = await client.api.accounts[":id"]["$delete"]({ 
                param: { id },
            })
            return await response.json()
        },
        onSuccess: () => {
            toast.success("Account deleted")
            queryClient.invalidateQueries({ queryKey:  ["accounts", { id }] })
            queryClient.invalidateQueries({ queryKey:  ["accounts"] })
            //TODO: Invalidate sumary and transactions
        },
        onError: () => {
            toast.error("Failed to delete account")
        },
    })

    return mutation
}
