'use client';
import { useI18n } from '@tools/i18n/provider';
import {
	AudioLines,
	Download,
	Pause,
	Play,
	RotateCcw,
	ShieldCheck,
} from 'lucide-react';
import { useAudioEditor } from '../model/use-audio-editor';
import { AudioDropzone } from './audio-dropzone';
import { Waveform } from './waveform';
import { formatTime } from '@/entities/audio/lib/time';
function TimeField({
	label,
	value,
	max,
	onChange,
}: {
	label: string;
	value: number;
	max: number;
	onChange: (n: number) => void;
}) {
	return (
		<label className="time-field">
			<span>{label}</span>
			<input
				type="number"
				min="0"
				max={max}
				step="0.01"
				value={Number(value.toFixed(2))}
				onChange={(e) => {
					const n = Number(e.target.value);
					if (Number.isFinite(n)) onChange(n);
				}}
			/>
		</label>
	);
}
export function AudioCutter() {
	const { t } = useI18n();
	const editor = useAudioEditor();
	const {
		file,
		buffer,
		start,
		end,
		status,
		error,
		playing,
		result,
		load,
		reset,
		change,
		preview,
		exportAudio,
	} = editor;
	return (
		<section className="editor-card wrap" aria-label={t('editor')}>
			<div className="editor-header">
				<div>
					<span className="tiny-label">WAVECUT STUDIO</span>
					<h2>{t('editor')}</h2>
				</div>
				<div className="local-badge">
					<ShieldCheck size={15} />
					{t('privacy')}
				</div>
			</div>
			{!buffer ? (
				<AudioDropzone onFile={(file) => void load(file)} />
			) : (
				<div className="editor-body">
					<div className="source-row">
						<div className="source-icon">
							<AudioLines size={20} />
						</div>
						<div className="source-info">
							<strong title={file?.name}>{file?.name}</strong>
							<span>
								{formatTime(buffer.duration)} ·{' '}
								{file
									? `${(file.size / 1024 / 1024).toFixed(2)} MB`
									: ''}
							</span>
						</div>
						<button
							type="button"
							className="subtle-button"
							onClick={reset}
						>
							<RotateCcw size={16} />
							{t('reset')}
						</button>
					</div>
					<div className="wave-panel">
						<div className="panel-heading">
							<span>{t('select')}</span>
							<span>{formatTime(buffer.duration)}</span>
						</div>
						<Waveform
							buffer={buffer}
							start={start}
							end={end}
							onChange={change}
						/>
						<div className="wave-axis">
							<span>0:00</span>
							<span>{formatTime(buffer.duration)}</span>
						</div>
					</div>
					<div className="time-grid">
						<TimeField
							label={t('start')}
							value={start}
							max={buffer.duration}
							onChange={(n) => change(Math.min(n, end), end)}
						/>
						<TimeField
							label={t('end')}
							value={end}
							max={buffer.duration}
							onChange={(n) => change(start, Math.max(n, start))}
						/>
						<div className="time-field duration">
							<span>{t('duration')}</span>
							<strong>{formatTime(end - start)}</strong>
						</div>
					</div>
					<div className="editor-actions">
						<button
							className="secondary"
							type="button"
							onClick={() => void preview()}
							disabled={end - start < 0.01}
						>
							{playing ? <Pause size={18} /> : <Play size={18} />}{' '}
							{t(playing ? 'pause' : 'play')}
						</button>
						<button
							className="primary"
							type="button"
							onClick={exportAudio}
							disabled={
								status === 'exporting' || end - start < 0.01
							}
						>
							<Download size={18} />
							{t(status === 'exporting' ? 'exporting' : 'export')}
						</button>
					</div>
					{result && (
						<div className="result">
							<span>{t('output')}</span>
							<a
								className="download-link"
								href={result}
								download={`${file?.name.replace(/\.[^.]+$/, '') || 'wavecut'}-trimmed.wav`}
							>
								<Download size={17} />
								{t('download')}
							</a>
						</div>
					)}
				</div>
			)}
			{status === 'loading' && (
				<p className="editor-note" role="status">
					{t('loading')}
				</p>
			)}
			{error && (
				<p className="error-message" role="alert">
					{t(error)}
				</p>
			)}
			<p className="editor-note">{t('limit')}</p>
		</section>
	);
}
