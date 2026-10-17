import Link from 'next/link';

export default function NotFound() {
	return (
		<main style={{ padding: '5rem', textAlign: 'center' }}>
			<h1>404</h1>
			<p>Page not found</p>
			<Link href="/en">Wavecut</Link>
		</main>
	);
}
