import Main from "../components/layout/Main";

export default async function Home({
  searchParams: { completed },
}: {
  searchParams: {
    completed: string;
  };
}) {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  return <Main completed={completed} />;
}
