import React, { useMemo, useState } from "react";

function LineChart({ width, height, path1, path2, secondary }) {
	const gridY = 4;
	return (
		<svg viewBox={`0 0 ${width} ${height}`} className="svg">
			{/* grid */}
			{Array.from({ length: gridY }).map((_, i) => (
				<line key={i} x1="0" x2={width} y1={(i+1)*(height/(gridY+1))} y2={(i+1)*(height/(gridY+1))} className="grid" />
			))}
			{/* lines */}
			{path2 && <path d={path2} className="line line--secondary" />}
			<path d={path1} className="line" />
			{/* legend */}
			<g className="legend" transform="translate(8,8)">
				<rect className="legend__swatch" x="0" y="0" width="12" height="3" rx="2" />
				<text x="18" y="3" alignmentBaseline="middle">Revenue</text>
				{secondary && (
					<>
						<rect className="legend__swatch secondary" x="90" y="0" width="12" height="3" rx="2" />
						<text x="108" y="3" alignmentBaseline="middle">Cost</text>
					</>
				)}
			</g>
		</svg>
	);
}


function BarsChart({ data }) {
const width = 640;
const height = 220;
const padding = 20;
const barGap = 10;
const barWidth = (width - padding*2 - barGap* (data.length-1)) / data.length;
const max = Math.max(...data.map(d => d.web + d.inStore));
return (
<svg viewBox={`0 0 ${width} ${height}`} className="svg">
{data.map((d, i) => {
const x = padding + i * (barWidth + barGap);
const hWeb = (d.web / max) * (height - padding*2);
const hStore = (d.inStore / max) * (height - padding*2);
const yWeb = height - padding - hWeb;
const yStore = yWeb - hStore;
return (
<g key={i}>
<rect x={x} y={yStore} width={barWidth} height={hStore} className="bar bar--b" />
<rect x={x} y={yWeb} width={barWidth} height={hWeb} className="bar" />
<text x={x + barWidth/2} y={height - 4} textAnchor="middle" className="muted small">{d.day}</text>
</g>
);
})}
<g className="legend" transform="translate(8,8)">
<rect className="legend__swatch" x="0" y="0" width="12" height="3" rx="2" />
<text x="18" y="3" alignmentBaseline="middle">Web</text>
<rect className="legend__swatch secondary" x="60" y="0" width="12" height="3" rx="2" />
<text x="78" y="3" alignmentBaseline="middle">In‑Store</text>
</g>
</svg>
);
}


function DonutChart({ data }) {
const size = 220;
const radius = 80;
const stroke = 26;
const center = size / 2;
const total = data.reduce((a,b) => a + b.value, 0) || 1;


let acc = 0;
const circles = data.map((d, i) => {
const frac = d.value / total;
const dash = 2 * Math.PI * radius * frac;
const gap = 2 * Math.PI * radius - dash;
const offset = 2 * Math.PI * radius * (1 - acc);
acc += frac;
return (
<circle
key={i}
cx={center}
cy={center}
r={radius}
fill="none"
strokeWidth={stroke}
className={`donut seg-${i}`}
strokeDasharray={`${dash} ${gap}`}
strokeDashoffset={offset}
/>
);
});


return (
<svg viewBox={`0 0 ${size} ${size}`} className="svg">
<circle cx={center} cy={center} r={radius} className="donut base" strokeWidth={stroke} fill="none" />
{circles}
<text x={center} y={center} textAnchor="middle" className="donut__label">{total.toLocaleString()}</text>
<g className="legend" transform={`translate(${size - 120}, ${size - 90})`}>
{data.map((d, i) => (
<g key={i} transform={`translate(0, ${i*18})`}>
<rect className={`legend__swatch seg-${i}`} x="0" y="0" width="12" height="3" rx="2" />
<text x="18" y="3" alignmentBaseline="middle">{d.name}</text>
</g>
))}
</g>
</svg>
);
}
