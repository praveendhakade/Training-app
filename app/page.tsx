import AuthForm from "@/components/auth-form";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const mode = searchParams.mode || "login";
  return <AuthForm mode={mode} />;
}
