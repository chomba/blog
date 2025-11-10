import { draftMode } from "next/headers";
import api from "@/lib/management";


export default async function PreviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>
}