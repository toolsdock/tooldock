import { Image as ImageIcon } from 'lucide-react';
export function Brand() {
	return (
		<span className="brand">
			<span className="brand-mark">
				<ImageIcon size={19} strokeWidth={2.6} />
			</span>
			<span>
				skyconvert<span className="brand-dot">.</span>
			</span>
		</span>
	);
}
