import { useState, useEffect, useRef, useCallback } from 'react'

const WORK_TIME = 25 * 60
const BREAK_TIME = 5 * 60
const RADIUS = 120
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export default function Timer() {
  const [mode, setMode] = useState('work') // 'work' | 'break'
  const [timeLeft, setTimeLeft] = useState(WORK_TIME)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef(null)

  const totalTime = mode === 'work' ? WORK_TIME : BREAK_TIME
  const progress = timeLeft / totalTime
  const strokeDashoffset = CIRCUMFERENCE * (1 - progress)

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0')
  const seconds = String(timeLeft % 60).padStart(2, '0')

  const switchMode = useCallback(() => {
    const nextMode = mode === 'work' ? 'break' : 'work'
    setMode(nextMode)
    setTimeLeft(nextMode === 'work' ? WORK_TIME : BREAK_TIME)
    setIsRunning(false)
  }, [mode])

  useEffect(() => {
    if (!isRunning) {
      clearInterval(intervalRef.current)
      return
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(intervalRef.current)
  }, [isRunning])

  useEffect(() => {
    if (timeLeft === 0 && !isRunning) {
      switchMode()
    }
  }, [timeLeft, isRunning, switchMode])

  useEffect(() => {
    document.title = isRunning
      ? `${minutes}:${seconds} - ${mode === 'work' ? '作業中' : '休憩中'}`
      : 'Pomodoro Timer'
  }, [minutes, seconds, isRunning, mode])

  const handleStartPause = () => {
    setIsRunning((prev) => !prev)
  }

  const handleReset = () => {
    setIsRunning(false)
    setTimeLeft(totalTime)
  }

  return (
    <div className="timer">
      <div className="mode-tabs">
        <button
          className={`mode-tab ${mode === 'work' ? 'active' : ''}`}
          onClick={() => {
            if (mode !== 'work') {
              setIsRunning(false)
              setMode('work')
              setTimeLeft(WORK_TIME)
            }
          }}
        >
          作業
        </button>
        <button
          className={`mode-tab ${mode === 'break' ? 'active' : ''}`}
          onClick={() => {
            if (mode !== 'break') {
              setIsRunning(false)
              setMode('break')
              setTimeLeft(BREAK_TIME)
            }
          }}
        >
          休憩
        </button>
      </div>

      <div className="timer-circle">
        <svg width="280" height="280" viewBox="0 0 280 280">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
          <circle
            className="timer-bg"
            cx="140"
            cy="140"
            r={RADIUS}
            fill="none"
            strokeWidth="6"
          />
          <circle
            className="timer-progress"
            cx="140"
            cy="140"
            r={RADIUS}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 140 140)"
          />
        </svg>
        <div className="timer-display">
          <span className="time">{minutes}:{seconds}</span>
          <span className="label">{mode === 'work' ? '作業時間' : '休憩時間'}</span>
        </div>
      </div>

      <div className="controls">
        <button className="btn btn-primary" onClick={handleStartPause}>
          {isRunning ? '一時停止' : '開始'}
        </button>
        <button className="btn btn-secondary" onClick={handleReset}>
          リセット
        </button>
      </div>
    </div>
  )
}
