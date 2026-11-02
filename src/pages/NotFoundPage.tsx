import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="nf">
      <p>Sheet not found</p>
      <h1>404</h1>
      <Link to="/">Back to the index</Link>
    </main>
  );
}
