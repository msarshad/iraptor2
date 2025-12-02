/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { HeroScene, ToolheadScene } from './components/QuantumScene';
import { PrintingSimulation, TechExplainer, MarketCharts } from './components/Diagrams';
import { ArrowDown, Menu, X, Printer, Magnet, Zap, Layers, BarChart3, Globe, Activity } from 'lucide-react';

const TeamCard = ({ name, role, org, delay }: { name: string, role: string, org: string, delay: string }) => {
  return (
    <div className="flex flex-col group animate-fade-in-up items-center p-8 bg-white rounded-xl border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 w-full max-w-sm hover:border-sci-purple/50" style={{ animationDelay: delay }}>
      <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-6 text-sci-purple font-serif font-bold text-2xl group-hover:bg-sci-purple group-hover:text-white transition-colors">
        {name.charAt(0)}
      </div>
      <h3 className="font-serif text-2xl text-stone-900 text-center mb-1">{name}</h3>
      <p className="text-xs text-sci-teal font-bold uppercase tracking-widest text-center mb-4">{role}</p>
      <p className="text-stone-500 text-center text-sm">{org}</p>
    </div>
  );
};

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F8F4] text-stone-800 selection:bg-sci-purple selection:text-white">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#F9F8F4]/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-gradient-to-br from-sci-purple to-indigo-600 rounded-lg flex items-center justify-center text-white font-serif font-bold text-xl shadow-md">
                <Printer size={20} />
            </div>
            <span className={`font-serif font-bold text-xl tracking-wide transition-opacity ${scrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
              iRAPTOR
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-stone-600">
            <a href="#problem" onClick={scrollToSection('problem')} className="hover:text-sci-purple transition-colors cursor-pointer uppercase">The Gap</a>
            <a href="#solution" onClick={scrollToSection('solution')} className="hover:text-sci-purple transition-colors cursor-pointer uppercase">Solution</a>
            <a href="#demo" onClick={scrollToSection('demo')} className="hover:text-sci-purple transition-colors cursor-pointer uppercase">Field Control</a>
            <a href="#market" onClick={scrollToSection('market')} className="hover:text-sci-purple transition-colors cursor-pointer uppercase">Market</a>
            <a 
              href="#contact"
              onClick={scrollToSection('contact')} 
              className="px-5 py-2 bg-sci-purple text-white rounded-full hover:bg-indigo-800 transition-colors shadow-sm cursor-pointer flex items-center gap-2"
            >
              Contact Team
            </a>
          </div>

          <button className="md:hidden text-stone-900 p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#F9F8F4] flex flex-col items-center justify-center gap-8 text-xl font-serif animate-fade-in">
            <a href="#problem" onClick={scrollToSection('problem')}>The Problem</a>
            <a href="#solution" onClick={scrollToSection('solution')}>Technology</a>
            <a href="#demo" onClick={scrollToSection('demo')}>Interactive Demo</a>
            <a href="#market" onClick={scrollToSection('market')}>Business Model</a>
            <a href="#contact" onClick={scrollToSection('contact')} className="text-sci-purple font-bold">Contact Us</a>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroScene />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(249,248,244,0.7)_0%,rgba(249,248,244,0.4)_50%,rgba(249,248,244,0.1)_100%)]" />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="inline-block mb-6 px-4 py-1 border border-sci-purple/30 bg-white/50 backdrop-blur-md text-sci-purple text-xs tracking-[0.2em] uppercase font-bold rounded-full">
            Patent Pending Technology
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium leading-tight mb-8 text-stone-900 drop-shadow-sm max-w-5xl mx-auto">
            Print Magnets <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-sci-purple to-sci-teal">With Precision</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-stone-700 font-light leading-relaxed mb-12">
            The world's first 3D printer for magnetic materials featuring omnidirectional field control with in-situ sensing.
          </p>
          
          <div className="flex justify-center gap-4">
             <a href="#problem" onClick={scrollToSection('problem')} className="px-8 py-3 bg-sci-purple text-white rounded-full font-medium shadow-lg hover:shadow-xl hover:bg-indigo-800 transition-all">
                Discover iRAPTOR
             </a>
          </div>

          <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
            <ArrowDown className="text-stone-400" />
          </div>
        </div>
      </header>

      <main>
        {/* The Problem / Gap */}
        <section id="problem" className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                 <h2 className="font-serif text-4xl mb-4 text-stone-900">The Problem</h2>
                 <p className="text-stone-500 max-w-xl mx-auto">Manufacturing technology exists for polymers and ceramics, but magnetic materials have been left behind.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Polymer */}
                <div className="p-8 bg-stone-50 rounded-2xl border border-stone-200 opacity-60 hover:opacity-100 transition-opacity">
                    <div className="mb-6 flex justify-center"><Layers size={48} className="text-stone-400"/></div>
                    <h3 className="font-serif text-xl text-center mb-2">Polymer Printing</h3>
                    <p className="text-center text-sm text-stone-500">Commoditized, established, but limited functional properties.</p>
                </div>

                 {/* The Gap */}
                 <div className="p-8 bg-white rounded-2xl border-2 border-sci-purple shadow-xl relative transform md:-translate-y-4">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-sci-purple text-white px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase">The Gap</div>
                    <div className="mb-6 flex justify-center">
                        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                             <span className="font-serif text-4xl font-bold">?</span>
                        </div>
                    </div>
                    <h3 className="font-serif text-2xl text-center mb-2 font-bold text-stone-900">Magnet Printing</h3>
                    <p className="text-center text-sm text-stone-600">
                        No solution exists for precise, anisotropic magnetic field control during printing.
                    </p>
                </div>

                {/* Ceramic */}
                <div className="p-8 bg-stone-50 rounded-2xl border border-stone-200 opacity-60 hover:opacity-100 transition-opacity">
                    <div className="mb-6 flex justify-center"><div className="w-12 h-12 bg-stone-200 rounded-lg"></div></div>
                    <h3 className="font-serif text-xl text-center mb-2">Ceramic Printing</h3>
                    <p className="text-center text-sm text-stone-500">High cost industrial machines for specific structural parts.</p>
                </div>
            </div>
          </div>
        </section>

        {/* The Solution */}
        <section id="solution" className="py-24 bg-[#F5F4F0] border-t border-stone-200">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto mb-16 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white text-sci-teal text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-sci-teal/20">
                        <Zap size={14}/> OUR SOLUTION
                    </div>
                    <h2 className="font-serif text-4xl md:text-5xl mb-6 text-stone-900">Meet iRAPTOR</h2>
                    <p className="text-lg text-stone-600 leading-relaxed">
                       Synchronized toolpath + field vectoring + sensing = voxel-level alignment.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="order-2 lg:order-1">
                        <TechExplainer />
                    </div>
                    <div className="order-1 lg:order-2 relative h-[500px] bg-white rounded-2xl overflow-hidden shadow-lg border border-stone-200">
                        <ToolheadScene />
                        <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur p-4 rounded-xl border border-stone-200 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="font-mono text-xs text-stone-500 uppercase">System Status: Active</span>
                            </div>
                            <div className="mt-2 font-serif text-lg">Smart Toolhead (Patent Pending)</div>
                            <div className="text-xs text-stone-500">Compatible with Prusa Nextruder & BambuLab systems.</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Interactive Simulation */}
        <section id="demo" className="py-24 bg-stone-900 text-stone-100 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                <div className="w-96 h-96 rounded-full bg-sci-purple blur-[150px] absolute top-[-100px] left-[-100px]"></div>
                <div className="w-96 h-96 rounded-full bg-blue-500 blur-[150px] absolute bottom-[-100px] right-[-100px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                 <div className="text-center mb-12">
                    <h2 className="font-serif text-3xl md:text-5xl mb-4 text-white">Omnidirectional Field Control</h2>
                    <p className="text-stone-400 max-w-2xl mx-auto">
                        Traditional manufacturing limits magnet geometry. iRAPTOR allows you to program the magnetic vector <strong>per voxel</strong>. Try it below.
                    </p>
                </div>
                
                <PrintingSimulation />
                
                <div className="mt-8 text-center text-xs text-stone-500 font-mono">
                    Simulation visualizes in-situ alignment of magnetic particles within the thermoplastic matrix.
                </div>
            </div>
        </section>

        {/* Business & Market */}
        <section id="market" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-5 space-y-8">
                        <div>
                             <h2 className="font-serif text-4xl mb-4 text-stone-900">Business Model</h2>
                             <p className="text-stone-600">A hybrid revenue model combining hardware sales, recurring feedstock revenue, and service contracts.</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-6 bg-stone-50 rounded-xl border border-stone-200">
                                <div className="text-3xl font-serif text-stone-900 mb-1">EUR 35K</div>
                                <div className="text-xs uppercase font-bold text-stone-500 tracking-wider">Education Price</div>
                            </div>
                            <div className="p-6 bg-stone-50 rounded-xl border border-stone-200">
                                <div className="text-3xl font-serif text-stone-900 mb-1">EUR 200K</div>
                                <div className="text-xs uppercase font-bold text-stone-500 tracking-wider">Initial Investment</div>
                            </div>
                            <div className="p-6 bg-sci-purple/10 rounded-xl border border-sci-purple/20">
                                <div className="text-3xl font-serif text-sci-purple mb-1">50%</div>
                                <div className="text-xs uppercase font-bold text-sci-purple tracking-wider">Consumables Margin</div>
                            </div>
                            <div className="p-6 bg-sci-teal/10 rounded-xl border border-sci-teal/20">
                                <div className="text-3xl font-serif text-sci-teal mb-1">&gt;40%</div>
                                <div className="text-xs uppercase font-bold text-sci-teal tracking-wider">Service Margin</div>
                            </div>
                        </div>

                        <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-xl">
                            <h4 className="font-serif text-lg text-indigo-900 mb-2">Target Customers</h4>
                            <ul className="space-y-2 text-sm text-indigo-800">
                                <li className="flex items-center gap-2"><Globe size={14}/> Universities & National Labs</li>
                                <li className="flex items-center gap-2"><Zap size={14}/> R&D in e-mobility & Power Electronics</li>
                                <li className="flex items-center gap-2"><Activity size={14}/> Medtech Rapid Prototyping</li>
                            </ul>
                        </div>
                    </div>

                    <div className="lg:col-span-7">
                        <MarketCharts />
                    </div>
                </div>
            </div>
        </section>

        {/* Team */}
        <section id="contact" className="py-24 bg-[#F9F8F4] border-t border-stone-200">
           <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-3xl md:text-5xl mb-4 text-stone-900">The Team</h2>
                    <p className="text-stone-500 max-w-2xl mx-auto italic">
                        "Because you build it, doesn't mean customers will come."
                    </p>
                    <p className="text-stone-500 text-sm mt-2">
                        Combining materials expertise, manufacturing knowledge, and market research.
                    </p>
                </div>
                
                <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
                    <TeamCard 
                        name="Muhammad Shahid Arshad" 
                        role="CEO" 
                        org="Jozef Stefan Institute, Slovenia"
                        delay="0s" 
                    />
                    <TeamCard 
                        name="Louison Poudelet" 
                        role="CTO" 
                        org="CIM-UPC, Barcelona, Spain"
                        delay="0.2s" 
                    />
                </div>

                <div className="mt-16 text-center">
                    <div className="inline-block p-6 bg-white rounded-xl border border-stone-200 shadow-sm max-w-2xl w-full">
                        <div className="font-bold text-xs text-stone-400 uppercase tracking-widest mb-4">Stamp of Approval</div>
                        <div className="flex justify-center items-center gap-8 mb-4">
                            <div className="font-serif text-2xl text-stone-800 font-bold">KOLEKTOR</div>
                            <div className="h-8 w-px bg-stone-300"></div>
                            <div className="font-serif text-2xl text-stone-800 font-bold">REEMAG</div>
                        </div>
                        <p className="text-stone-600 text-sm">
                            "We have recently learned about your innovative research... and find your work highly interesting and relevant."
                        </p>
                    </div>
                </div>
           </div>
        </section>

      </main>

      <footer className="bg-stone-900 text-stone-400 py-16">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
                <div className="text-white font-serif font-bold text-2xl mb-2 flex items-center justify-center md:justify-start gap-2">
                    <Printer size={24}/> iRAPTOR
                </div>
                <p className="text-sm">Omnidirectional field control printing.</p>
            </div>
            <div className="flex gap-6 text-sm">
                <a href="#" onClick={(e) => {e.preventDefault(); window.scrollTo({top:0, behavior:'smooth'})}} className="hover:text-white transition-colors">Top</a>
                <a href="mailto:shahid.arshad@ijs.si" className="hover:text-white transition-colors">Contact CEO</a>
            </div>
        </div>
        <div className="text-center mt-12 text-xs text-stone-600">
            (c) 2025 Jozef Stefan Institute & CIM-UPC. All rights reserved. Confidential.
        </div>
      </footer>
    </div>
  );
};

export default App;
