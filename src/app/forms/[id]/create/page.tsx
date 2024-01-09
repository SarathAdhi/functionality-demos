import DynamicForm from "@components/dynamic-form";
import { Button } from "@ui/button";
import { filterDocs } from "backend/lib";
import { where } from "firebase/firestore";
import Link from "next/link";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const CreateAddedFormPage = async ({ params }: Props) => {
  const formId = params.id;

  let formDetails = await filterDocs("forms", where("uuid", "==", formId));
  formDetails = formDetails[0];

  if (!formDetails) return <h1>Form Not Found</h1>;

  const formData = formDetails.json;

  return (
    <div className="space-y-4">
      <div className="space-x-2">
        <Button asChild>
          <Link href="/forms">All Forms</Link>
        </Button>

        <Button asChild>
          <Link href={`/forms/${formId}`}>This Form entries</Link>
        </Button>
      </div>

      <DynamicForm {...{ formData, formId }} />
    </div>
  );
};

export default CreateAddedFormPage;
