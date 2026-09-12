'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Music, VolumeX, Image as ImageIcon, ArrowRight } from 'lucide-react';

export default function PedidoNamoro() {
  const [etapa, setEtapa] = useState<'inicio' | 'surpresa' | 'pergunta' | 'sim'>('inicio');
  const [naoPos, setNaoPos] = useState({ x: 0, y: 0 });
  const [naoCount, setNaoCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  // Data do primeiro encontro (você pode ajustar se quiser)
  const dataPrimeiroEncontro = new Date('2025-10-12T20:00:00');
  const [tempoJuntos, setTempoJuntos] = useState({ dias: 0, horas: 0, minutos: 0, segundos: 0 });

  useEffect(() => {
    const bgAudio = new Audio('https://actions.google.com/sounds/v1/ambiences/gentle_wind_chimes.ogg');
    bgAudio.loop = true;
    setAudio(bgAudio);

    const timer = setInterval(() => {
      const agora = new Date();
      const diferenca = agora.getTime() - dataPrimeiroEncontro.getTime();
      if (diferenca > 0) {
        const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferenca / (1000 * 60 * 60)) % 24);
        const minutos = Math.floor((diferenca / 1000 / 60) % 60);
        const segundos = Math.floor((diferenca / 1000) % 60);
        setTempoJuntos({ dias, horas, minutos, segundos });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const toggleAudio = () => {
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const moverBotaoNao = () => {
    const x = (Math.random() - 0.5) * 250;
    const y = (Math.random() - 0.5) * 250;
    setNaoPos({ x, y });
    setNaoCount(prev => prev + 1);
  };

  const dispararSim = () => {
    setEtapa('sim');
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#ff4d6d', '#ff758f', '#ffb3c1', '#ffffff']
    });
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-rose-950 via-rose-900 to-pink-950 p-4 text-white select-none">
      
      {/* Corações flutuantes no fundo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-400"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 0),
              y: typeof window !== 'undefined' ? window.innerHeight + 50 : 50,
              scale: Math.random() * 0.8 + 0.4
            }}
            animate={{
              y: -50,
              x: `+=${(Math.random() - 0.5) * 150}`
            }}
            transition={{
              duration: Math.random() * 10 + 8,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 5
            }}
          >
            <Heart size={Math.floor(Math.random() * 30) + 15} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      {/* Botão de música */}
      <button
        onClick={toggleAudio}
        className="absolute top-6 right-6 z-50 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-md transition hover:bg-white/20 border border-white/10 shadow-lg"
      >
        {isPlaying ? <Music className="animate-bounce text-pink-400" size={20} /> : <VolumeX size={20} />}
        <span className="text-xs font-medium tracking-wide">{isPlaying ? 'Música Ativa' : 'Ativar Música'}</span>
      </button>

      {/* ETAPA 1: TELA INICIAL */}
      <AnimatePresence mode="wait">
        {etapa === 'inicio' && (
          <motion.div
            key="inicio"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="z-10 flex max-w-md flex-col items-center text-center p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl"
          >
            <div className="mb-6 rounded-full bg-rose-500/20 p-5 text-rose-400 border border-rose-500/30 animate-pulse">
              <Sparkles size={48} />
            </div>
            <h1 className="mb-2 text-2xl font-light tracking-wide font-serif text-rose-100">
              Tatiana George Amade...
            </h1>
            <p className="mb-6 text-xl font-light tracking-wide font-serif text-rose-200">
              Tenho uma pergunta muito importante para te fazer... ❤️
            </p>
            <button
              onClick={() => setEtapa('surpresa')}
              className="group flex items-center gap-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 px-8 py-4 font-medium tracking-wide text-white shadow-lg shadow-rose-600/30 transition-all duration-300 hover:scale-105 hover:shadow-rose-600/50"
            >
              Abrir surpresa
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
            <span className="mt-6 text-xs text-rose-300/50">Com todo meu amor, Jaime</span>
          </motion.div>
        )}

        {/* ETAPA 2: MENSAGEM EMOCIONAL */}
        {etapa === 'surpresa' && (
          <motion.div
            key="surpresa"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="z-10 flex max-w-lg flex-col items-center text-center p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl"
          >
            <div className="mb-6 text-rose-400">
              <Heart size={56} fill="currentColor" className="animate-pulse" />
            </div>
            <h2 className="mb-6 text-xl font-light leading-relaxed font-serif text-rose-100">
              Tatiana, desde que você entrou na minha vida, cada dia ganhou mais cor, mais sentido e um brilho único que eu nunca tinha sentido antes.
            </h2>
            <button
              onClick={() => setEtapa('pergunta')}
              className="rounded-full bg-rose-500 px-8 py-3 text-sm font-medium tracking-wider text-white shadow-md transition hover:bg-rose-600"
            >
              Continuar ❤️
            </button>
          </motion.div>
        )}

        {/* ETAPA 3: A GRANDE PERGUNTA */}
        {etapa === 'pergunta' && (
          <motion.div
            key="pergunta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="z-10 flex max-w-lg flex-col items-center text-center p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl"
          >
            <div className="mb-6 rounded-full bg-rose-500/20 p-4 text-rose-400">
              <Sparkles size={40} />
            </div>
            <h2 className="mb-8 text-3xl md:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-300 to-white">
              Tatiana, quer namorar comigo? 🥹❤️
            </h2>

            {naoCount > 0 && (
              <p className="mb-4 text-xs text-rose-300/80 italic">
                {naoCount === 1 ? 'O botão "Não" fugiu porque sabe que a resposta certa é sim! 😂' : 'Tenta clicar no sim, é bem mais fácil! 💖'}
              </p>
            )}

            <div className="flex items-center justify-center gap-6 w-full relative h-20">
              <button
                onClick={dispararSim}
                className="z-20 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 px-10 py-4 font-bold text-white shadow-lg shadow-emerald-900/30 transition-transform hover:scale-110 active:scale-95"
              >
                SIM ❤️
              </button>

              <motion.button
                style={{ x: naoPos.x, y: naoPos.y }}
                animate={{ x: naoPos.x, y: naoPos.y }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                onMouseEnter={moverBotaoNao}
                onClick={moverBotaoNao}
                className="rounded-full bg-white/10 px-8 py-4 font-medium text-rose-200/70 border border-white/10 hover:bg-white/20 transition-colors"
              >
                NÃO 😢
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* ETAPA 4: TELA DO SIM COM A FOTO DE VOCÊS */}
        {etapa === 'sim' && (
          <motion.div
            key="sim"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="z-10 flex max-w-xl flex-col items-center text-center p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl overflow-y-auto max-h-[95vh]"
          >
            <div className="mb-3 text-rose-400 animate-bounce">
              <Heart size={56} fill="currentColor" />
            </div>
            <h1 className="mb-2 text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-pink-400 to-white">
              EU SABIA, TATIANA! ❤️🥹
            </h1>
            <p className="mb-4 text-rose-200/80 text-sm font-light">
              Agora começa oficialmente a nossa história mais linda. Com todo o meu amor, Jaime.
            </p>

            {/* Foto Real de Vocês */}
            <div className="w-full max-w-sm mb-5 rounded-2xl overflow-hidden border-2 border-rose-400/40 shadow-xl">
              <img 
                src="/foto.jpg" 
                alt="Tatiana e Jaime" 
                className="w-full h-auto object-cover max-h-72"
              />
            </div>

            {/* Contador de Tempo */}
            <div className="mb-4 grid grid-cols-4 gap-2 w-full max-w-md bg-black/20 p-3 rounded-2xl border border-white/10">
              <div className="flex flex-col items-center">
                <span className="text-xl font-bold text-rose-300">{tempoJuntos.dias}</span>
                <span className="text-[9px] uppercase tracking-wider text-rose-200/60">Dias</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xl font-bold text-rose-300">{tempoJuntos.horas}</span>
                <span className="text-[9px] uppercase tracking-wider text-rose-200/60">Horas</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xl font-bold text-rose-300">{tempoJuntos.minutos}</span>
                <span className="text-[9px] uppercase tracking-wider text-rose-200/60">Min</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xl font-bold text-rose-300">{tempoJuntos.segundos}</span>
                <span className="text-[9px] uppercase tracking-wider text-rose-200/60">Seg</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}