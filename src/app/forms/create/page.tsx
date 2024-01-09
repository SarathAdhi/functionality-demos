"use client";

import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { Textarea } from "@ui/textarea";
import React from "react";
import { useForm } from "react-hook-form";
import formData from "../../../../form.example.json";
import { uuid } from "@utils/uuid";
import { addDoc } from "backend/lib";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const defaultValues = {
  uuid: uuid(),
  json: JSON.stringify(formData, null, 4),
};

const ViewAllFormsPage = () => {
  const { replace } = useRouter();

  const { handleSubmit, register } = useForm({
    defaultValues,
  });

  const onSubmit = async (data: typeof defaultValues) => {
    try {
      await addDoc("forms", {
        ...data,
        json: JSON.parse(data.json),
      });

      toast.success("Form created");

      replace(`/forms/${data.uuid}`);
    } catch (error) {
      toast.error("Something went wrong while creating form");
    }
  };

  return (
    <div>
      <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("uuid", {
            required: "This field is required",
          })}
          label="Form ID"
          name="uuid"
          required={true}
          readOnly
        />

        <Textarea
          {...register("json", {
            required: "This field is required",
          })}
          label="Form JSON"
          name="json"
          rows={40}
          required={true}
        />

        <div className="w-full">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default ViewAllFormsPage;
