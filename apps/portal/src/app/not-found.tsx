import Link from 'next/link';
export default function NotFound() {
  return <main className="not-found container"><div className="not-found__code">404</div><h1>Not quite the right tool.</h1><p>This page doesn’t exist yet.</p><Link href="/" className="primary-link">Return to ToolDock →</Link></main>;
}
