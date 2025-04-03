"use client"; // This directive makes the component interactive

import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deletePitch } from "@/lib/actions";

const DeletePitchButton = ({ _id }: { _id: string }) => {
  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form behavior
    await deletePitch(_id); // Call the delete logic
  };

  return (
    <Button
      variant="destructive"
      size="icon"
      className="startup-card_options startup-card_dlt"
      onClick={handleDelete}
    >
      <Trash2 className="size-5 text-white" />
    </Button>
  );
};

export default DeletePitchButton;
