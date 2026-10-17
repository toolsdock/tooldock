'use client';

import type {
	ConversionSettings,
	OutputFormat,
} from '@/entities/audio/model/types';
import { useI18n } from '@tools/i18n/provider';

export function ConversionSettingsPanel({
	settings,
	disabled,
	setFormat,
	updateSettings,
}: {
	settings: ConversionSettings;
	disabled: boolean;
	setFormat: (format: OutputFormat) => void;
	updateSettings: (patch: Partial<ConversionSettings>) => void;
}) {
	const { t } = useI18n();

	return (
		<section
			className="settings-panel"
			aria-labelledby="conversion-settings-title"
		>
			<div className="section-heading compact">
				<div>
					<span className="section-kicker">
						{t('settingsKicker')}
					</span>
					<h2 id="conversion-settings-title">{t('settingsTitle')}</h2>
				</div>
			</div>

			<div className="settings-grid">
				<label>
					<span>{t('outputFormat')}</span>
					<select
						value={settings.format}
						disabled={disabled}
						onChange={(event) =>
							setFormat(event.target.value as OutputFormat)
						}
					>
						<option value="mp3">MP3</option>
						<option value="wav">WAV</option>
						<option value="flac">FLAC</option>
						<option value="ogg">OGG</option>
					</select>
				</label>

				{settings.format === 'mp3' && (
					<label>
						<span>{t('bitrate')}</span>
						<select
							value={settings.mp3Bitrate}
							disabled={disabled}
							onChange={(event) =>
								updateSettings({
									mp3Bitrate: Number(
										event.target.value,
									) as ConversionSettings['mp3Bitrate'],
								})
							}
						>
							{[128, 192, 256, 320].map((value) => (
								<option key={value} value={value}>
									{value} kbps
								</option>
							))}
						</select>
					</label>
				)}

				{settings.format === 'ogg' && (
					<label>
						<span>{t('quality')}</span>
						<select
							value={settings.oggQuality}
							disabled={disabled}
							onChange={(event) =>
								updateSettings({
									oggQuality: Number(
										event.target.value,
									) as ConversionSettings['oggQuality'],
								})
							}
						>
							<option value={4}>{t('qualityGood')}</option>
							<option value={6}>{t('qualityHigh')}</option>
							<option value={8}>{t('qualityVeryHigh')}</option>
						</select>
					</label>
				)}

				{settings.format === 'flac' && (
					<label>
						<span>{t('compression')}</span>
						<select
							value={settings.flacCompression}
							disabled={disabled}
							onChange={(event) =>
								updateSettings({
									flacCompression: Number(
										event.target.value,
									) as ConversionSettings['flacCompression'],
								})
							}
						>
							<option value={5}>
								{t('compressionBalanced')}
							</option>
							<option value={8}>{t('compressionSmaller')}</option>
							<option value={12}>{t('compressionMax')}</option>
						</select>
					</label>
				)}

				{settings.format === 'wav' && (
					<div className="setting-note">
						<strong>PCM 16-bit</strong>
						<span>{t('wavNote')}</span>
					</div>
				)}
			</div>
		</section>
	);
}
