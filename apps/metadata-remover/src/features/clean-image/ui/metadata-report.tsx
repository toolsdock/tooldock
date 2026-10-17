'use client';
import { useI18n } from '@tools/i18n/provider';

import {
	AlertTriangle,
	CheckCircle2,
	FileSearch,
	ShieldCheck,
} from 'lucide-react';
import type {
	MetadataEntry,
	MetadataReport,
} from '@/entities/image/model/types';
type Props = {
	title: string;
	report: MetadataReport;
	variant: 'before' | 'after';
};
function FieldList({ entries }: { entries: MetadataEntry[] }) {
	return (
		<div className="metadata-fields">
			{entries.map((item, index) => (
				<div
					className="metadata-field"
					key={`${item.group}-${item.key}-${index}`}
				>
					<div className="metadata-field-label">
						<span>{item.group}</span>
						<strong>{item.key}</strong>
					</div>
					<div className="metadata-field-value" title={item.value}>
						{item.value}
					</div>
				</div>
			))}
		</div>
	);
}
export function MetadataReportPanel({ title, report, variant }: Props) {
	const { t } = useI18n();
	const clean = !report.warning && report.entries.length === 0;
	return (
		<section
			className={`metadata-card metadata-card--${variant}`}
			aria-label={title}
		>
			<div className="metadata-card-heading">
				<span className="metadata-card-icon">
					{variant === 'before' ? (
						<FileSearch size={18} />
					) : (
						<ShieldCheck size={18} />
					)}
				</span>
				<div>
					<h4>{title}</h4>
					<p>
						{report.entries.length} {t('report.fields')}
					</p>
				</div>
				<span className="metadata-count">{report.entries.length}</span>
			</div>
			{report.warning && (
				<p className="metadata-warning">
					<AlertTriangle size={15} />
					{report.warning}
				</p>
			)}
			{clean && (
				<div className="metadata-empty">
					<CheckCircle2 size={18} />
					<span>{t('report.none')}</span>
				</div>
			)}
			{report.entries.length > 0 && (
				<FieldList entries={report.entries} />
			)}
			<details className="metadata-properties">
				<summary>
					{t('report.properties')}{' '}
					<span>{report.properties.length}</span>
				</summary>
				<p>{t('report.properties.copy')}</p>
				<FieldList entries={report.properties} />
			</details>
		</section>
	);
}
