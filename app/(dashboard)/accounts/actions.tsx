"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";
import { useDeleteAccount } from "@/features/accounts/api/use-delete-account";
import useConfirm from "@/hooks/use-confirm";

type Props = {
  id: string;
};

export const Actions = ({ id }: Props) => {
  const [ConfirmDialog, confirm] = useConfirm( 
  "Are you sure you want to delete this account?",
  "You are about to delete this account."
  );

  const deleteMutation = useDeleteAccount(id);
  const { onOpen } = useOpenAccount();

  const handleDelete = async () => {
    const ok = await confirm();

    if(ok) {
      deleteMutation.mutate()
    }
  };

  return (
    <>
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem disabled={deleteMutation.isPending} onClick={() => onOpen(id)}>
            <Edit className="size-5 mr-2"/>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem disabled={deleteMutation.isPending} onClick={handleDelete}>
            <Trash className="size-5 mr-2"/>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
