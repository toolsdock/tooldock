import type { ToolId, ToolLocale } from './registry';
import { getToolHref, tools } from './registry';

const copy = {
	en: {
		label: 'Free tools',
		open: 'Open tool',
	},
	ru: {
		label: 'Бесплатные инструменты',
		open: 'Открыть',
	},
} as const;

export function ToolNetworkBar({
	current,
	locale,
}: {
	current: ToolId;
	locale: ToolLocale;
}) {
	const text = copy[locale];

	return (
		<div className="tools-network">
			<div className="tools-network__inner">
				<span className="tools-network__label">{text.label}</span>
				<nav className="tools-network__nav" aria-label={text.label}>
					{tools.map((tool) => {
						const href = getToolHref(tool, locale);
						const isCurrent = tool.id === current;
						const content = (
							<>
								<span
									className={`tools-network__dot tools-network__dot--${tool.id}`}
									aria-hidden="true"
								/>
								<span>{tool.name}</span>
								<span
									className="tools-network__tooltip"
									role="tooltip"
								>
									<strong>{tool.name}</strong>
									<span>{tool.description[locale]}</span>
									{!isCurrent && href ? (
										<em>{text.open} →</em>
									) : null}
								</span>
							</>
						);

						if (!href || isCurrent) {
							return (
								<span
									key={tool.id}
									className="tools-network__item is-current"
									aria-current={
										isCurrent ? 'page' : undefined
									}
									tabIndex={isCurrent ? 0 : undefined}
									title={tool.description[locale]}
								>
									{content}
								</span>
							);
						}

						return (
							<a
								key={tool.id}
								className="tools-network__item"
								href={href}
								title={tool.description[locale]}
							>
								{content}
							</a>
						);
					})}
				</nav>
			</div>
		</div>
	);
}
