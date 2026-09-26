import TodoApp from "./components/TodoApp";

export default function Home() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  return (
  <>
    <TodoApp />
    <h2>supabaseのurl: {supabaseUrl}</h2>
  </>
);
}
