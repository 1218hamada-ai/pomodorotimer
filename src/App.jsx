import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Trophy, Zap, Heart } from 'lucide-react';

/**
 * ポモドーロタイマーアプリケーション
 * 感情と育成要素を取り入れた、ユーザーを楽しませながら集中力を高めるタイマー
 */
const App = () => {
  // タイマー状態
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25分（秒）
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  
  // キャラクターと進化システム
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [xpToNextLevel, setXpToNextLevel] = useState(100);
  const [characterMood, setCharacterMood] = useState('😤');
  const [showLevelUp, setShowLevelUp] = useState(false);
  
  // サボり防止ギミック
  const [pauseButtonPosition, setPauseButtonPosition] = useState({ x: 0, y: 0 });
  const [pauseButtonText, setPauseButtonText] = useState('一時停止');
  const [isHoveringPause, setIsHoveringPause] = useState(false);
  const [characterReaction, setCharacterReaction] = useState('');
  const pauseButtonRef = useRef(null);
  
  // 背景色の状態管理
  const [bgColor, setBgColor] = useState('bg-blue-100');

  // キャラクターの感情状態を管理
  const getCharacterMood = useCallback(() => {
    if (characterReaction) return characterReaction;
    if (isBreak) return '☕';
    if (isRunning) return '👨‍💻';
    return '😤';
  }, [isBreak, isRunning, characterReaction]);

  // ポーズボタンのテキストバリエーション
  const pauseButtonTexts = [
    '本当に諦めるの？',
    '意志薄弱...',
    'まだ頑張れる！',
    '最後まで！',
    '負けないで！',
    '逃げないで！'
  ];

  // 休憩中の褒め言葉
  const praiseMessages = [
    'よく頑張った！',
    '素晴らしい！',
    '最高だね！',
    'すごい進歩！',
    '君ならできる！',
    'レベルアップ！'
  ];

  // タイマー処理
  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // タイマー完了時の処理
      handleTimerComplete();
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  // タイマー完了処理
  const handleTimerComplete = () => {
    setIsRunning(false);
    
    if (!isBreak) {
      // 作業完了：XP獲得とレベルアップ判定
      const xpGained = 50 + (level * 10);
      setXp(prev => {
        const newTotal = prev + xpGained;
        if (newTotal >= xpToNextLevel) {
          // レベルアップ！
          handleLevelUp();
          return newTotal - xpToNextLevel;
        }
        return newTotal;
      });
      
      // 休憩モードへ
      setIsBreak(true);
      setTimeLeft(5 * 60); // 5分休憩
      setBgColor('bg-orange-100');
      setCharacterReaction('🎉');
      setTimeout(() => setCharacterReaction(''), 2000);
    } else {
      // 休憩完了：作業モードへ
      setIsBreak(false);
      setTimeLeft(25 * 60);
      setBgColor('bg-blue-100');
    }
  };

  // レベルアップ処理
  const handleLevelUp = () => {
    setLevel(prev => prev + 1);
    setXpToNextLevel(prev => Math.floor(prev * 1.5));
    setShowLevelUp(true);
    setCharacterReaction('🌟');
    setTimeout(() => {
      setShowLevelUp(false);
      setCharacterReaction('');
    }, 3000);
  };

  // 開始/一時停止ボタン処理
  const handleStartPause = () => {
    if (!isRunning) {
      setIsRunning(true);
      setPauseButtonText('一時停止');
      setBgColor(isBreak ? 'bg-orange-100' : 'bg-blue-100');
    } else {
      // 作業中に停止した場合のキャラクター反応
      if (!isBreak) {
        setCharacterReaction('😭');
        setTimeout(() => setCharacterReaction(''), 2000);
      }
      setIsRunning(false);
    }
  };

  // リセットボタン処理
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
    setIsBreak(false);
    setBgColor('bg-blue-100');
    setPauseButtonText('一時停止');
    setPauseButtonPosition({ x: 0, y: 0 });
  };

  // ポーズボタンホバー時のギミック
  const handlePauseButtonHover = () => {
    if (isRunning && !isBreak) {
      // 作業中のみギミックを有効化
      setIsHoveringPause(true);
      
      // ボタンテキストをランダムに変更
      const randomText = pauseButtonTexts[Math.floor(Math.random() * pauseButtonTexts.length)];
      setPauseButtonText(randomText);
      
      // ボタンをランダムな位置に移動
      const maxX = 200;
      const maxY = 100;
      setPauseButtonPosition({
        x: (Math.random() - 0.5) * maxX,
        y: (Math.random() - 0.5) * maxY
      });
      
      // 背景色を警告色に
      setBgColor('bg-red-100');
    }
  };

  const handlePauseButtonLeave = () => {
    setIsHoveringPause(false);
    setPauseButtonText('一時停止');
    setPauseButtonPosition({ x: 0, y: 0 });
    if (isRunning) {
      setBgColor(isBreak ? 'bg-orange-100' : 'bg-blue-100');
    }
  };

  // 時間フォーマット
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // XPプログレスバーの計算
  const xpProgress = (xp / xpToNextLevel) * 100;

  return (
    <div className={`min-h-screen ${bgColor} transition-colors duration-500 flex flex-col items-center justify-center p-8`}>
      {/* レベルアップ演出 */}
      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <div className="bg-yellow-400 text-black px-8 py-4 rounded-lg game-font text-2xl level-up-animation">
              LEVEL UP! Lv.{level}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ヘッダー：ステータス表示 */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8 text-center"
      >
        <h1 className="text-4xl font-bold mb-4 game-font text-gray-800">
          ポモドーロ相棒
        </h1>
        
        {/* レベルとXP表示 */}
        <div className="bg-white rounded-lg p-4 shadow-lg mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-bold flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              Lv.{level}
            </span>
            <span className="text-sm text-gray-600">
              XP: {xp}/{xpToNextLevel}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <motion.div 
              className="bg-gradient-to-r from-blue-400 to-purple-500 h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${xpProgress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* 現在のモード表示 */}
        <div className="text-xl font-semibold text-gray-700">
          {isBreak ? '休憩時間' : '作業時間'}
        </div>
      </motion.div>

      {/* メインキャラクター */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="text-9xl mb-8"
        animate={{
          scale: isRunning ? [1, 1.1, 1] : 1,
          rotate: characterReaction ? [0, -5, 5, 0] : 0,
        }}
        transition={{
          scale: { duration: 2, repeat: isRunning ? Infinity : 0 },
          rotate: { duration: 0.5 },
        }}
      >
        {getCharacterMood()}
      </motion.div>

      {/* タイマー表示 */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-6xl font-mono font-bold mb-8 text-gray-800 game-font"
      >
        {formatTime(timeLeft)}
      </motion.div>

      {/* コントロールボタン */}
      <motion.div 
        className="flex gap-4 relative"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        {/* 開始/一時停止ボタン（逃げるギミック付き） */}
        <motion.button
          ref={pauseButtonRef}
          onClick={handleStartPause}
          onMouseEnter={handlePauseButtonHover}
          onMouseLeave={handlePauseButtonLeave}
          animate={{
            x: pauseButtonPosition.x,
            y: pauseButtonPosition.y,
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`btn-escape px-6 py-3 rounded-lg font-semibold text-white transition-all ${
            isRunning 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-green-500 hover:bg-green-600'
          } ${isHoveringPause && !isBreak ? 'animate-bounce' : ''}`}
        >
          {isRunning ? (
            <span className="flex items-center gap-2">
              <Pause className="w-5 h-5" />
              {pauseButtonText}
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Play className="w-5 h-5" />
              開始
            </span>
          )}
        </motion.button>

        {/* リセットボタン */}
        <motion.button
          onClick={handleReset}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-all flex items-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          リセット
        </motion.button>
      </motion.div>

      {/* キャラクターのセリフ */}
      <AnimatePresence>
        {characterReaction && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-8 text-2xl font-bold text-gray-700"
          >
            {characterReaction === '😭' && 'なんでやめてくれるの...😢'}
            {characterReaction === '🎉' && 'よく頑張った！休憩しよう！'}
            {characterReaction === '🌟' && 'レベルアップ！すごい！'}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 休憩中のメッセージ */}
      {isBreak && !characterReaction && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 text-lg text-gray-600 text-center max-w-md"
        >
          {praiseMessages[Math.floor(Math.random() * praiseMessages.length)]}
          <br />
          <span className="text-sm">次のレベルまであと {xpToNextLevel - xp} XP</span>
        </motion.div>
      )}

      {/* フッター */}
      <div className="absolute bottom-4 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4" />
          君ならできる！一緒に頑張ろう！
        </div>
      </div>
    </div>
  );
};

export default App;
