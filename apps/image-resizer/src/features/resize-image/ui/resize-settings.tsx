'use client';
import type {
	ResizeOptions,
	ResizeMode,
	OutputFormat,
} from '@/entities/image/model/types';
import { useI18n } from '@tools/i18n/provider';
export function ResizeSettings({
	options,
	update,
	disabled,
}: {
	options: ResizeOptions;
	update: (o: Partial<ResizeOptions>) => void;
	disabled: boolean;
}) {
	const { t } = useI18n();
	const modes: ResizeMode[] = ['width', 'height', 'both', 'percent'];
	return (
		<fieldset className="resize-settings" disabled={disabled}>
			<legend>{t('settings.title')}</legend>
			<div className="resize-field">
				<label htmlFor="resize-mode">{t('settings.mode')}</label>
				<select
					id="resize-mode"
					value={options.mode}
					onChange={(e) =>
						update({ mode: e.target.value as ResizeMode })
					}
				>
					{modes.map((m) => (
						<option key={m} value={m}>
							{t(`mode.${m}`)}
						</option>
					))}
				</select>
			</div>
			<div className="resize-fields">
				{(options.mode === 'width' || options.mode === 'both') && (
					<div className="resize-field">
						<label htmlFor="width">{t('settings.width')}</label>
						<input
							id="width"
							type="number"
							min="1"
							max="16384"
							value={options.width}
							onChange={(e) =>
								update({ width: Number(e.target.value) })
							}
						/>
					</div>
				)}
				{(options.mode === 'height' || options.mode === 'both') && (
					<div className="resize-field">
						<label htmlFor="height">{t('settings.height')}</label>
						<input
							id="height"
							type="number"
							min="1"
							max="16384"
							value={options.height}
							onChange={(e) =>
								update({ height: Number(e.target.value) })
							}
						/>
					</div>
				)}
				{options.mode === 'percent' && (
					<div className="resize-field">
						<label htmlFor="percent">{t('settings.percent')}</label>
						<input
							id="percent"
							type="number"
							min="1"
							max="400"
							value={options.percent}
							onChange={(e) =>
								update({ percent: Number(e.target.value) })
							}
						/>
					</div>
				)}
			</div>
			<div className="resize-field">
				<label htmlFor="output-format">{t('settings.format')}</label>
				<select
					id="output-format"
					value={options.format}
					onChange={(e) =>
						update({ format: e.target.value as OutputFormat })
					}
				>
					<option value="image/jpeg">JPG</option>
					<option value="image/png">PNG</option>
					<option value="image/webp">WebP</option>
				</select>
			</div>
			{options.format !== 'image/png' && (
				<label className="quality-label" htmlFor="quality">
					<span>
						{t('settings.quality')}{' '}
						<strong>{options.quality}%</strong>
					</span>
					<input
						id="quality"
						type="range"
						min="50"
						max="100"
						step="5"
						value={options.quality}
						onChange={(e) =>
							update({ quality: Number(e.target.value) })
						}
					/>
				</label>
			)}
			<label className="resize-check">
				<input
					type="checkbox"
					checked={options.allowUpscale}
					onChange={(e) => update({ allowUpscale: e.target.checked })}
				/>
				{t('settings.upscale')}
			</label>
			<p className="resize-tip">{t('settings.tip')}</p>
		</fieldset>
	);
}
