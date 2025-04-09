"use client"; // This directive makes the component interactive

import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deletePitch } from "@/lib/actions";
import DeleteAlertDialog from "./DeleteAlertDialog";

const DeletePitchButton = ({ _id }: { _id: string }) => {
  const handleDelete = async () => {
    await deletePitch(_id); // Call the delete logic
  };

  return (
    <DeleteAlertDialog action={handleDelete}>
      <Button
        variant="destructive"
        size="icon"
        className="startup-card_options startup-card_dlt"
      >
        <Trash2 className="size-5 text-white" />
      </Button>
    </DeleteAlertDialog>
  );
};

export default DeletePitchButton;
