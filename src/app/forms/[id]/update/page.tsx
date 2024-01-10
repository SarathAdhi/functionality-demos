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
  searchParams: {
    id: string;
  };
};

const CreateAddedFormPage = async ({ params, searchParams }: Props) => {
  const formId = params.id;
  const entryId = searchParams.id;

  if (!formId || !entryId) return <h1>Form ID or Entry ID undefined</h1>;

  let formDetails = await filterDocs("forms", where("uuid", "==", formId));
  let formDefaultValue = await filterDocs(
    "form-data",
    where("uuid", "==", entryId)
  );

  formDetails = formDetails[0];
  if (!formDetails) return <h1>Form Not Found</h1>;

  formDefaultValue = formDefaultValue[0];
  if (!formDefaultValue) return <h1>Form Default values not found</h1>;

  const docId = formDefaultValue.id;

  const formData = formDetails.json;

  const defaultValues = formDefaultValue.data;

  if (!defaultValues || defaultValues.length === 0) return <h1>NOT FOUND</h1>;

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

      <DynamicForm
        {...{ formData, formId, docId, defaultValues, isUpdate: true }}
      />
    </div>
  );
};

export default CreateAddedFormPage;
