"use client";

import { fetchFunc } from "@lib/fetch";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import Select from "@ui/select";
import { fileUpload } from "backend/lib";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import formData from "../../form.example.json";
import { uuid } from "@utils/uuid";

type Props = {
  formData: typeof formData;
  formId: string;
  docId?: string;
  isUpdate?: boolean;
  defaultValues?: FieldValues;
};

const DynamicForm = ({
  formData,
  formId,
  docId,
  isUpdate = !!docId,
  defaultValues = {},
}: Props) => {
  const { data, actions } = formData;
  const { handleSubmit, register, setValue, reset } = useForm({
    defaultValues,
  });

  const handleFormSubmission = async (
    values: FieldValues,
    method: string,
    url: string
  ) => {
    try {
      if (isUpdate) {
        let response = await fetchFunc(url, {
          method: "PUT",
          body: JSON.stringify({
            docId,
            data: { ...values },
          }),
        });

        console.log(response);

        if (response.message) toast.success(response.message);
        else toast.error(JSON.stringify(response));

        return;
      }

      switch (method) {
        case "PUT":
          let response_put = await fetchFunc(url, {
            method,
            body: JSON.stringify({
              uuid: uuid(),
              formId,
              data: { ...values },
            }),
          });

          if (response_put.message) toast.success(response_put.message);
          else toast.error(response_put.error);
          break;
        case "POST":
          let response_post = await fetchFunc(url, {
            method,
            body: JSON.stringify({
              uuid: uuid(),
              formId,
              data: { ...values },
            }),
          });

          if (response_post.message) toast.success(response_post.message);
          else toast.error(response_post.error);
          break;
        default:
          alert("METHOD NOT FOUND");
          break;
      }

      reset({});
    } catch (error) {
      toast.error(error as string);
      console.error({ error });
    }
  };

  return (
    <form className="grid grid-cols-2 gap-4">
      {data.map((field, index) => {
        const { name, label, type, options, defaultValue, required } = field;

        switch (type) {
          case "string":
            return (
              <Input
                key={name}
                {...register(name, {
                  required: required && "This field is required",
                })}
                label={label}
                name={name}
                defaultValue={defaultValue}
                required={required}
              />
            );
          case "dropdown":
            return (
              <Select
                key={name}
                {...register(name, {
                  required: required && "Please select an option",
                })}
                label={label}
                name={name}
                options={options!}
                defaultValue={defaultValue}
                required={required}
              />
            );
          case "file":
            return (
              <Input
                key={name}
                type="file"
                label={label}
                name={name}
                onChange={async (e) => {
                  const files = e.target.files!;
                  const file = files[0];

                  if (file) {
                    const filePath = `${field.filePath}/${file.name}`;

                    setValue(name, filePath);

                    await fileUpload(filePath, file);

                    console.log("Image uploaded successfully!");
                  }
                }}
                required={required}
              />
            );
          default:
            return <div>Element not found</div>;
        }
      })}

      <div className="col-span-2">
        {actions.map((e) => (
          <Button
            key={e?.name}
            onClick={handleSubmit((values) =>
              handleFormSubmission(values, e?.method, e?.url)
            )}
            variant={
              e?.variant as
                | "success"
                | "link"
                | "default"
                | "destructive"
                | "outline"
                | "secondary"
                | "ghost"
                | null
                | undefined
            }
            type="submit"
          >
            {e?.name}
          </Button>
        ))}
      </div>
    </form>
  );
};

export default DynamicForm;
