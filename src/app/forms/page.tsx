import { Button } from "@ui/button";
import { filterDocs } from "backend/lib";
import { where } from "firebase/firestore";
import Link from "next/link";
import React from "react";

const ViewAllFormsPage = async () => {
  const allForms = (await filterDocs("forms", where("uuid", "!=", ""))) as {
    uuid: string;
  }[];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 justify-between">
        <h2>All Forms</h2>

        <Button asChild>
          <Link href="/forms/create">Create Form</Link>
        </Button>
      </div>

      <div className="grid gap-2 place-items-start">
        {allForms.map(({ uuid }) => (
          <Link
            key={uuid}
            href={`/forms/${uuid}`}
            className="text-lg font-medium underline text-blue-800"
          >
            {uuid}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ViewAllFormsPage;
