import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found" id="main-content">
      <span>404</span>
      <h1>Jalur ini belum ada.</h1>
      <p>The path you are looking for could not be found.</p>
      <Link className="button button--dark" href="/id">
        Kembali ke Singapadu
      </Link>
    </main>
  );
}
