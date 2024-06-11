import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Server Actions</h1>
      <Link href="/user-management">Go to CRUD operations for user</Link>
    </div>
  );
}
