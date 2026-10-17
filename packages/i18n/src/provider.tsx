'use client';
import { createContext, useContext, type ReactNode } from 'react';
import type { Locale } from './locale';
type Dictionary = Record<string, string>;
const Context = createContext<{
	locale: Locale;
	t: (key: string) => string;
} | null>(null);
export function I18nProvider({
	locale,
	messages,
	children,
}: {
	locale: Locale;
	messages: Dictionary;
	children: ReactNode;
}) {
	return (
		<Context.Provider
			value={{ locale, t: (key: string) => messages[key] ?? key }}
		>
			{children}
		</Context.Provider>
	);
}
export function useI18n() {
	const value = useContext(Context);
	if (!value) throw new Error('I18nProvider missing');
	return value;
}
