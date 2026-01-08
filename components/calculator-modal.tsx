'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { X, Mic, Square, Send, ExternalLink } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const CONFIG = {
  company: "Beauty Lazer",
  niche: "Лазерная Эпиляция",
  city: "Щелково Московская Область",
  webhook: "/.netlify/functions/estimate",
  telegramBotUrl: "https://t.me/BeautyLazer_bot?start=calc",
  hints: ["Лазер бикини","Лазер подмышки","Электро бикини","Электро подмышки","Массаж RSL","Чистка лица + миндальный пилинг"]
}

export default function CalculatorModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [blob, setBlob] = useState<Blob | null>(null)
  const [status, setStatus] = useState('Готово к записи')
  const [timer, setTimer] = useState('00:00')
  const [meterWidth, setMeterWidth] = useState(0)
  const [result, setResult] = useState<{ price: string; summary: string; disclaimer?: string } | null>(null)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const analyserRef = useRef<AnalyserNode | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const rafRef = useRef<number>(0)
  const startTimeRef = useRef<number>(0)
  const streamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    const handler = () => setIsOpen(true)
    window.addEventListener('openCalculator', handler)
    return () => window.removeEventListener('openCalculator', handler)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const formatTime = (t: number) => {
    const s = Math.floor(t / 1000)
    const m = Math.floor(s / 60)
    const r = s % 60
    return `${String(m).padStart(2, '0')}:${String(r).padStart(2, '0')}`
  }

  const updateVU = useCallback(() => {
    if (!analyserRef.current) return
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount)
    analyserRef.current.getByteFrequencyData(dataArray)
    const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length
    const pct = Math.min(100, Math.max(2, (avg / 255) * 100))
    setMeterWidth(pct)
    setTimer(formatTime(performance.now() - startTimeRef.current))
    rafRef.current = requestAnimationFrame(updateVU)
  }, [])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      audioCtxRef.current = new AudioContextClass()
      const src = audioCtxRef.current.createMediaStreamSource(stream)
      analyserRef.current = audioCtxRef.current.createAnalyser()
      analyserRef.current.fftSize = 256
      src.connect(analyserRef.current)

      chunksRef.current = []
      setBlob(null)
      setStatus('Записываем...')

      const mime = MediaRecorder.isTypeSupported?.('audio/webm;codecs=opus') 
        ? 'audio/webm;codecs=opus' 
        : MediaRecorder.isTypeSupported?.('audio/webm') ? 'audio/webm' : ''
      
      const mr = new MediaRecorder(stream, mime ? { mimeType: mime } : {})
      mediaRecorderRef.current = mr

      mr.ondataavailable = (e) => e.data.size && chunksRef.current.push(e.data)
      mr.onstop = () => {
        const newBlob = new Blob(chunksRef.current, { type: mime || 'audio/webm' })
        setBlob(newBlob)
        streamRef.current?.getTracks().forEach(t => t.stop())
        audioCtxRef.current?.close()
        cancelAnimationFrame(rafRef.current)
        setStatus('Готово к отправке')
        setIsRecording(false)
        setMeterWidth(0)
        setTimer('00:00')
      }

      mr.start()
      startTimeRef.current = performance.now()
      setIsRecording(true)
      updateVU()
    } catch {
      setStatus('Нужен доступ к микрофону')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop()
    }
  }

  const sendAudio = async () => {
    if (!blob) return
    setStatus('Отправляем...')

    try {
      const fd = new FormData()
      fd.append('audio', blob, `voice_${Date.now()}.webm`)
      fd.append('niche', CONFIG.niche)
      fd.append('company', CONFIG.company)
      fd.append('city', CONFIG.city)

      const r = await fetch(CONFIG.webhook, { method: 'POST', body: fd })
      const data = await r.json().catch(() => ({}))

      if (!r.ok) throw new Error(data?.message || `HTTP ${r.status}`)

      if (data.estimateLow || data.estimateHigh) {
        const low = data.estimateLow ? Number(data.estimateLow).toLocaleString('ru-RU') : null
        const high = data.estimateHigh ? Number(data.estimateHigh).toLocaleString('ru-RU') : null
        const cur = data.currency || '₽'
        let priceStr = '—'
        if (low && high && low === high) priceStr = `${low} ${cur}`
        else if (low && high) priceStr = `${low}–${high} ${cur}`
        else if (low) priceStr = `${low} ${cur}`
        else if (high) priceStr = `${high} ${cur}`

        setResult({
          price: priceStr,
          summary: data.summary || 'Предварительная оценка готова.',
          disclaimer: data.disclaimer
        })
        setStatus('Готово')
      } else {
        setResult({ price: 'Заявка принята', summary: 'Как только расчёт будет готов — он появится здесь.' })
        setStatus('Принято')
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Ошибка'
      setStatus(`Ошибка: ${msg}`)
    }
  }

  const closeModal = () => {
    setIsOpen(false)
    setResult(null)
    setBlob(null)
    setStatus('Готово к записи')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl glass-card p-6 relative"
          >
            <button onClick={closeModal} className="absolute top-4 right-4 text-white/60 hover:text-white transition">
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-2">Калькулятор услуг</h2>
            <p className="text-white/70 mb-6">Расскажите голосом какие услуги вас интересуют</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {CONFIG.hints.map(h => (
                <span key={h} className="px-3 py-1.5 text-sm rounded-lg bg-white/10 border border-white/20">{h}</span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 items-center mb-4">
              {!isRecording ? (
                <button onClick={startRecording} className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-400 px-4 py-3 rounded-xl font-semibold">
                  <Mic size={18} /> Записать
                </button>
              ) : (
                <button onClick={stopRecording} className="flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-3 rounded-xl font-semibold">
                  <Square size={18} /> Стоп
                </button>
              )}
              <button 
                onClick={sendAudio} 
                disabled={!blob || isRecording}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-400 px-4 py-3 rounded-xl font-semibold disabled:opacity-50"
              >
                <Send size={18} /> Получить оценку
              </button>
              <span className="px-3 py-1.5 text-sm rounded-full bg-white/10 border border-white/20">{timer}</span>
            </div>

            <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-4">
              <div className="h-full bg-gradient-to-r from-purple-600 to-purple-400 transition-all" style={{ width: `${meterWidth}%` }} />
            </div>

            <p className="text-white/70 text-sm mb-6">{status}</p>

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-4 bg-white/5"
              >
                <p className="text-white/70 text-sm mb-1">Предварительная оценка</p>
                <p className="text-2xl font-bold mb-2">{result.price}</p>
                {result.disclaimer && <p className="text-xs text-white/60 mb-2">{result.disclaimer}</p>}
                <p className="text-white/80 text-sm whitespace-pre-line">{result.summary}</p>
                <a 
                  href={CONFIG.telegramBotUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-400 px-4 py-2 rounded-xl font-semibold text-sm"
                >
                  <ExternalLink size={16} /> Перейти в Telegram
                </a>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
