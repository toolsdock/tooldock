import type { ButtonHTMLAttributes, ReactNode } from 'react';
type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
	children: ReactNode;
	tone?: 'primary' | 'subtle';
};
export function Button({
	children,
	tone = 'primary',
	className = '',
	...props
}: Props) {
	return (
		<button
			className={`ui-button ui-button--${tone} ${className}`}
			{...props}
		>
			{children}
		</button>
	);
}
