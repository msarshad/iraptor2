/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, ArrowRight, Magnet, Wifi, Layers, Cpu, ArrowUp, ArrowRight as ArrowRightIcon, ArrowUpRight } from 'lucide-react';

// --- TECH EXPLAINER ---
export const TechExplainer: React.FC = () => {
    const [activeTech, setActiveTech] = useState<number>(0);
  
    const techs = [
      { 
        id: 0, 
        title: 'Electromagnets', 
        icon: <Magnet size={24} />,
        color: 'text-red-600',
        bg: 'bg-red-50',
        borderColor: 'border-red-200',
        detail: 'Omnidirectional field control near nozzle (~0.5-0.6 T localized). Allows precise manipulation of magnetic dipoles.' 
      },
      { 
        id: 1, 
        title: 'Hall Probe Array', 
        icon: <Wifi size={24} />,
        color: 'text-emerald-600',
        bg: 'bg-emerald-50',
        borderColor: 'border-emerald-200',
        detail: 'Real-time layer stray field measurement for closed-loop control. Ensures every voxel matches the magnetic specification.' 
      },
      { 
        id: 2, 
        title: 'Software Integration', 
        icon: <Cpu size={24} />,
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        borderColor: 'border-blue-200',
        detail: 'Node-RED + InfluxDB + Python. Synchronized toolpath + field vectoring + sensing = voxel-level alignment.' 
      },
      { 
        id: 3, 
        title: 'Recycled Feedstock', 
        icon: <Layers size={24} />,
        color: 'text-stone-600',
        bg: 'bg-stone-100',
        borderColor: 'border-stone-300',
        detail: 'Uses EU recycled magnetic powder with controlled particle size distribution and surface chemistry.' 
      },
    ];
  
    return (
      <div className="flex flex-col gap-6 w-full">
        {techs.map((tech, index) => (
            <div 
                key={tech.id}
                onClick={() => setActiveTech(index)}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 relative overflow-hidden ${activeTech === index ? `${tech.borderColor} ${tech.bg} shadow-md scale-105` : 'border-stone-100 bg-white hover:border-stone-200'}`}
            >
                <div className="flex items-center gap-4 mb-2">
                    <div className={`p-2 rounded-lg bg-white ${tech.color} shadow-sm`}>
                        {tech.icon}
                    </div>
                    <h3 className={`font-serif text-xl font-bold ${tech.color}`}>{tech.title}</h3>
                </div>
                
                <motion.div 
                    initial={false}
                    animate={{ height: activeTech === index ? 'auto' : 0, opacity: activeTech === index ? 1 : 0 }}
                    className="overflow-hidden"
                >
                    <p className="text-stone-600 text-sm mt-2 leading-relaxed pl-[3.5rem]">
                        {tech.detail}
                    </p>
                </motion.div>

                {activeTech === index && (
                    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/50 to-transparent pointer-events-none`} />
                )}
            </div>
        ))}
      </div>
    );
};

// --- INTERACTIVE PRINTING SIMULATION ---
export const PrintingSimulation: React.FC = () => {
    const [fieldDirection, setFieldDirection] = useState<'vertical' | 'horizontal' | 'halbach'>('vertical');
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const progressRef = useRef(0);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        
        const render = () => {
            const w = canvas.width;
            const h = canvas.height;
            
            // Advance print head
            progressRef.current = (progressRef.current + 1) % w;
            const px = progressRef.current;
            const py = h / 2;

            // Fade slightly for trails
            ctx.fillStyle = 'rgba(28, 25, 23, 0.05)'; // Stone-900 with alpha
            ctx.fillRect(0, 0, w, h);

            // Draw Print Bed
            ctx.strokeStyle = '#444';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0, py + 20);
            ctx.lineTo(w, py + 20);
            ctx.stroke();

            // Draw Deposited Material
            // We redraw the active segment to keep it bright
            ctx.fillStyle = '#3730a3'; // Sci-Purple
            ctx.fillRect(px - 10, py, 10, 20); // Current nozzle block
            
            // Draw previous blocks (simulation)
            // In a real app we'd store state, here we cheat visually with the fade
            
            // Draw Orientation Arrows
            const spacing = 30;
            const startX = Math.floor(px / spacing) * spacing;
            
            if (px % spacing === 0) {
                // Draw a permanent arrow at this location
                // We actually can't easily do persistent drawing with the fade method above without state array
                // So let's just draw an arrow at the nozzle representing current state
            }
            
            // Draw "Permanent" arrows for the whole line based on current logic (simplified visualization)
            // This represents the "Programmed" magnetization
            ctx.lineWidth = 2;
            for(let x = 0; x < w; x+=30) {
                if (x > px) break; // Haven't printed yet

                let angle = 0;
                if (fieldDirection === 'vertical') angle = -Math.PI / 2;
                if (fieldDirection === 'horizontal') angle = 0;
                if (fieldDirection === 'halbach') {
                    // Rotating vector
                    angle = (x / w) * Math.PI * 4;
                }

                const cx = x;
                const cy = py + 10;
                
                // Only draw brightly if it was just printed, else it fades naturally due to the clearRect/fillRect above?
                // Actually the fade above clears everything. 
                // Let's redraw all arrows to make them persist clearly.
                
                ctx.strokeStyle = x > px - 50 ? '#00d4ff' : '#006D77'; // Bright blue for fresh, teal for cooled
                ctx.beginPath();
                ctx.moveTo(cx - Math.cos(angle)*8, cy - Math.sin(angle)*8);
                ctx.lineTo(cx + Math.cos(angle)*8, cy + Math.sin(angle)*8);
                // Arrowhead
                ctx.stroke();
            }

            // Draw Nozzle
            ctx.fillStyle = '#fbbf24'; // Amber nozzle
            ctx.beginPath();
            ctx.moveTo(px - 5, py);
            ctx.lineTo(px + 5, py);
            ctx.lineTo(px, py + 15); // Pointing down? No, nozzle is above
            ctx.fill();
            
            // Nozzle Body
            ctx.fillStyle = '#ccc';
            ctx.fillRect(px - 10, py - 40, 20, 40);

            // Draw Field Lines emanating from nozzle based on mode
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            if (fieldDirection === 'vertical') {
                ctx.moveTo(px, py - 20);
                ctx.lineTo(px, py + 40);
            } else if (fieldDirection === 'horizontal') {
                ctx.moveTo(px - 30, py + 10);
                ctx.lineTo(px + 30, py + 10);
            } else {
                // Halbach (rotating)
                const angle = (px / w) * Math.PI * 4;
                ctx.moveTo(px - Math.cos(angle)*30, py + 10 - Math.sin(angle)*30);
                ctx.lineTo(px + Math.cos(angle)*30, py + 10 + Math.sin(angle)*30);
            }
            ctx.stroke();
            ctx.setLineDash([]);

            animationId = requestAnimationFrame(render);
        };

        render();
        return () => cancelAnimationFrame(animationId);
    }, [fieldDirection]);

    return (
        <div className="flex flex-col gap-6 items-center justify-center p-6 bg-stone-800 rounded-xl border border-stone-700 shadow-2xl w-full max-w-4xl mx-auto">
            <div className="relative w-full rounded-lg overflow-hidden border border-stone-600 bg-stone-950 shadow-inner h-[300px]">
                <canvas ref={canvasRef} width={800} height={300} className="w-full h-full" />
                <div className="absolute top-4 left-4 text-xs font-mono text-stone-500">
                    STATUS: PRINTING LAYER 14<br/>
                    TEMP: 240 C<br/>
                    FIELD: {fieldDirection.toUpperCase()}
                </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center w-full">
                <button 
                    onClick={() => setFieldDirection('vertical')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all ${fieldDirection === 'vertical' ? 'bg-sci-purple text-white shadow-lg ring-2 ring-sci-purple/50' : 'bg-stone-700 text-stone-400 hover:bg-stone-600'}`}
                >
                    <ArrowUp size={20} /> Vertical Anisotropy
                </button>
                <button 
                    onClick={() => setFieldDirection('horizontal')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all ${fieldDirection === 'horizontal' ? 'bg-sci-purple text-white shadow-lg ring-2 ring-sci-purple/50' : 'bg-stone-700 text-stone-400 hover:bg-stone-600'}`}
                >
                    <ArrowRightIcon size={20} /> Horizontal Anisotropy
                </button>
                <button 
                    onClick={() => setFieldDirection('halbach')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all ${fieldDirection === 'halbach' ? 'bg-sci-teal text-white shadow-lg ring-2 ring-sci-teal/50' : 'bg-stone-700 text-stone-400 hover:bg-stone-600'}`}
                >
                    <ArrowUpRight size={20} /> Halbach Array (Rotating)
                </button>
            </div>
            
            <p className="text-stone-400 text-sm text-center max-w-lg">
                Select a field pattern to see how the iRAPTOR toolhead reorients magnetic particles in real-time during the extrusion process.
            </p>
        </div>
    );
};

// --- MARKET CHARTS ---
export const MarketCharts: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
            {/* Market Growth */}
            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm flex flex-col justify-between">
                <div>
                    <h4 className="font-serif text-lg text-stone-900 mb-2">Bonded Magnet Market</h4>
                    <p className="text-xs text-stone-500 mb-6">Global Market Growth (CAGR 4.90%)</p>
                </div>
                
                <div className="relative h-48 w-full flex items-end justify-between px-2 space-x-4">
                    {/* Bars */}
                    {[2.59, 2.9, 3.2, 3.5, 3.8, 4.15].map((val, i) => (
                        <div key={i} className="flex flex-col items-center w-full group">
                            <div className="text-[10px] font-bold text-stone-400 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">${val}B</div>
                            <motion.div 
                                className="w-full bg-gradient-to-t from-sci-purple to-indigo-400 rounded-t-sm"
                                initial={{ height: 0 }}
                                whileInView={{ height: `${(val/4.5)*100}%` }}
                                transition={{ duration: 1, delay: i*0.1 }}
                            />
                            <div className="text-[10px] text-stone-500 mt-2">{2023 + i * (i===5? 2 : 1)}</div>
                        </div>
                    ))}
                </div>
                <div className="mt-4 flex justify-between items-center text-xs font-bold text-stone-900">
                    <span>2023: $2.59 Billion</span>
                    <span className="text-green-600 flex items-center gap-1"><ArrowUpRight size={12}/> 2030: $4.15 Billion</span>
                </div>
            </div>

            {/* Applications Donut (Abstract representation) */}
            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm flex flex-col">
                <h4 className="font-serif text-lg text-stone-900 mb-6">Key Applications</h4>
                
                <div className="flex-1 flex items-center justify-center relative">
                    <svg viewBox="0 0 100 100" className="w-48 h-48 transform -rotate-90">
                        {/* Segments */}
                        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#e0e7ff" strokeWidth="20" /> {/* Background */}
                        <motion.circle 
                            cx="50" cy="50" r="40" 
                            fill="transparent" 
                            stroke="#3730a3" 
                            strokeWidth="20"
                            strokeDasharray="251"
                            strokeDashoffset="100" // 60% approx
                            initial={{ strokeDashoffset: 251 }}
                            whileInView={{ strokeDashoffset: 100 }}
                            transition={{ duration: 1.5 }}
                        />
                         <motion.circle 
                            cx="50" cy="50" r="40" 
                            fill="transparent" 
                            stroke="#006D77" 
                            strokeWidth="20"
                            strokeDasharray="251"
                            strokeDashoffset="220" // Small segment
                            strokeDashoffset-initial="251"
                            className="opacity-80"
                            initial={{ strokeDashoffset: 251 }}
                            whileInView={{ strokeDashoffset: 200 }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-3xl font-serif font-bold text-stone-900">No.1</span>
                        <span className="text-[10px] text-stone-500 uppercase">Sensors</span>
                    </div>
                </div>

                <div className="mt-6 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-stone-600">
                        <div className="w-3 h-3 bg-sci-purple rounded-full"></div>
                        <span>Sensors & Motors (Primary)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-stone-600">
                        <div className="w-3 h-3 bg-sci-teal rounded-full"></div>
                        <span>HDD & Level Gauges</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-stone-600">
                        <div className="w-3 h-3 bg-indigo-100 rounded-full"></div>
                        <span>Others</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
