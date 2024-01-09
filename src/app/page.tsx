import { Button } from "@ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Button asChild>
        <Link href="/forms">Dynamic Forms</Link>
      </Button>
    </div>
  );
}
