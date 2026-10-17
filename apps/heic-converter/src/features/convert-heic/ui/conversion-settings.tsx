'use client';
import { useI18n } from '@tools/i18n/provider';

import type { OutputFormat } from '@/entities/conversion/model/types';
type Props = {
	format: OutputFormat;
	onFormat: (value: OutputFormat) => void;
	quality: number;
	onQuality: (value: number) => void;
	disabled: boolean;
};
export function ConversionSettings({
	format,
	onFormat,
	quality,
	onQuality,
	disabled,
}: Props) {
	const { t } = useI18n();
	return (
		<div className="settings">
			<div className="settings-top">
				<strong>{t('settings.title')}</strong>
				<span>{t('settings.copy')}</span>
			</div>
			<fieldset disabled={disabled} className="format-group">
				<legend>{t('settings.format')}</legend>
				<div className="format-options">
					<label
						className={
							format === 'jpeg'
								? 'format-option selected'
								: 'format-option'
						}
					>
						<input
							type="radio"
							name="format"
							checked={format === 'jpeg'}
							onChange={() => onFormat('jpeg')}
						/>
						<span>JPG</span>
						<small>{t('settings.jpg')}</small>
					</label>
					<label
						className={
							format === 'png'
								? 'format-option selected'
								: 'format-option'
						}
					>
						<input
							type="radio"
							name="format"
							checked={format === 'png'}
							onChange={() => onFormat('png')}
						/>
						<span>PNG</span>
						<small>{t('settings.png')}</small>
					</label>
				</div>
			</fieldset>
			{format === 'jpeg' && (
				<label className="quality-label" htmlFor="quality">
					<span>
						{t('settings.quality')} <strong>{quality}%</strong>
					</span>
					<input
						id="quality"
						type="range"
						min="50"
						max="100"
						step="5"
						value={quality}
						disabled={disabled}
						onChange={(event) =>
							onQuality(Number(event.target.value))
						}
					/>
				</label>
			)}
		</div>
	);
}
