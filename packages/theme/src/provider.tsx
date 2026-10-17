'use client';
import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from 'react';
type Theme = 'dark' | 'light';
type ThemeContextValue = { theme: Theme; toggle: () => void };
const ThemeContext = createContext<ThemeContextValue | null>(null);
function applyTheme(theme: Theme) {
	document.documentElement.dataset.theme = theme;
	document.documentElement.style.colorScheme = theme;
}
export function ThemeProvider({
	children,
	storageKey = 'tools-theme',
}: {
	children: ReactNode;
	storageKey?: string;
}) {
	const [theme, setTheme] = useState<Theme>('dark');
	useEffect(() => {
		let restored: Theme = 'dark';
		try {
			if (localStorage.getItem(storageKey) === 'light')
				restored = 'light';
		} catch {
			/* storage disabled */
		}
		applyTheme(restored);
		setTheme(restored);
	}, [storageKey]);
	function toggle() {
		const next: Theme = theme === 'dark' ? 'light' : 'dark';
		applyTheme(next);
		try {
			localStorage.setItem(storageKey, next);
		} catch {
			/* storage disabled */
		}
		setTheme(next);
	}
	return (
		<ThemeContext.Provider value={{ theme, toggle }}>
			{children}
		</ThemeContext.Provider>
	);
}
export function useTheme() {
	const context = useContext(ThemeContext);
	if (!context) throw new Error('ThemeProvider missing');
	return context;
}
