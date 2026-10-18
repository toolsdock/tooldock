import { AudioLines, FileImage, FileMusic, Image, Maximize2, ScanSearch, Scissors, ShieldCheck } from 'lucide-react';
import type { ToolId } from '@tools/network/registry';

export function ToolPreview({ id }: { id: ToolId }) {
  switch (id) {
    case 'clearframe':
      return <div className="preview preview--clearframe" aria-hidden="true"><div className="preview-photo"><div className="preview-mountain"/><div className="preview-sun"/><div className="preview-private"><ShieldCheck size={21}/></div></div><span className="preview-float preview-float--left">EXIF</span><span className="preview-float preview-float--right"><ScanSearch size={19}/></span></div>;
    case 'skyconvert':
      return <div className="preview preview--skyconvert" aria-hidden="true"><div className="preview-file preview-file--behind"><FileImage size={24}/><span>HEIC</span></div><div className="preview-file preview-file--front"><Image size={30}/><span>JPG</span></div><span className="preview-constellation one"/><span className="preview-constellation two"/></div>;
    case 'leafsize':
      return <div className="preview preview--leafsize" aria-hidden="true"><div className="preview-resize preview-resize--large"><span className="preview-resize__art"/></div><div className="preview-resize preview-resize--small"><Maximize2 size={24}/></div><span className="preview-resize__arrows">↘</span></div>;
    case 'wavecut':
      return <div className="preview preview--wavecut" aria-hidden="true"><div className="wave-bars">{[14,26,39,21,49,35,18,30,54,44,26,38,17,48,33,22,42,31,17,39,27,12].map((h,i) => <span key={i} style={{ height: `${h}px` }}/>)}</div><div className="wave-selection"/><span className="wave-scissor"><Scissors size={21}/></span></div>;
    case 'soundshift':
      return <div className="preview preview--soundshift" aria-hidden="true"><div className="sound-form sound-form--before"><FileMusic size={28}/><span>WAV</span></div><div className="sound-arrow">⇄</div><div className="sound-form sound-form--after"><AudioLines size={28}/><span>MP3</span></div></div>;
  }
}
