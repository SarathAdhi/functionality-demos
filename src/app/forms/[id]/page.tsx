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

const ViewFormPage = async ({ params }: Props) => {
  const formId = params.id;

  const allForms = (await filterDocs(
    "form-data",
    where("formId", "==", formId)
  )) as {
    data: {
      [key: string]: string;
    };
    uuid: string;
  }[];

  if (!allForms || allForms.length === 0) return <h1>NOT FOUND</h1>;

  return (
    <div className="space-y-4">
      <h2>Form Entries</h2>

      <Button asChild>
        <Link href={`/forms/${formId}/create`}>Create Entry for this form</Link>
      </Button>

      <div className="grid gap-2 place-items-start">
        {allForms.map(({ data, uuid }) => (
          <div key={uuid}>
            <Link
              href={`/forms/${formId}/update?entryId=${uuid}`}
              className="text-lg font-medium underline text-blue-800"
            >
              UPDATE: {uuid}
            </Link>

            <div>{JSON.stringify(data, null, 4)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewFormPage;
