import Main from "../components/layout/Main";

export default function Home({
  searchParams: { completed },
}: {
  searchParams: {
    completed: string;
  };
}) {
  return <Main completed={completed} />;
}
