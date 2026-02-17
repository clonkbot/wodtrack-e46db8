import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Types
interface Workout {
  id: string;
  name: string;
  type: 'AMRAP' | 'For Time' | 'EMOM' | 'Strength';
  result: string;
  rx: boolean;
  date: string;
  athlete: string;
  avatar: string;
  likes: number;
  comments: number;
  movements: string[];
}

interface PR {
  movement: string;
  value: string;
  date: string;
  improvement: string;
}

// Mock Data
const mockWorkouts: Workout[] = [
  {
    id: '1',
    name: 'Fran',
    type: 'For Time',
    result: '3:42',
    rx: true,
    date: '2 hours ago',
    athlete: 'Sarah Chen',
    avatar: 'SC',
    likes: 24,
    comments: 8,
    movements: ['Thrusters 95/65', 'Pull-ups', '21-15-9']
  },
  {
    id: '2',
    name: 'Morning Grind',
    type: 'AMRAP',
    result: '8 rounds + 12 reps',
    rx: false,
    date: '5 hours ago',
    athlete: 'Mike Torres',
    avatar: 'MT',
    likes: 18,
    comments: 3,
    movements: ['12 Wall Balls', '10 Box Jumps', '8 Burpees']
  },
  {
    id: '3',
    name: 'Deadlift Day',
    type: 'Strength',
    result: '405 lbs',
    rx: true,
    date: 'Yesterday',
    athlete: 'Jake Wilson',
    avatar: 'JW',
    likes: 45,
    comments: 12,
    movements: ['5x3 Deadlift', 'Build to heavy single']
  },
  {
    id: '4',
    name: 'Death by Thrusters',
    type: 'EMOM',
    result: '14 minutes',
    rx: true,
    date: 'Yesterday',
    athlete: 'Emma Davis',
    avatar: 'ED',
    likes: 31,
    comments: 6,
    movements: ['Min 1: 1 Thruster', 'Min 2: 2 Thrusters', '...until failure']
  }
];

const mockPRs: PR[] = [
  { movement: 'Back Squat', value: '315 lbs', date: 'This week', improvement: '+15 lbs' },
  { movement: 'Snatch', value: '185 lbs', date: '2 weeks ago', improvement: '+10 lbs' },
  { movement: 'Fran', value: '3:42', date: 'Today', improvement: '-18 sec' },
  { movement: 'Clean & Jerk', value: '225 lbs', date: 'This month', improvement: '+20 lbs' },
];

const leaderboard = [
  { rank: 1, name: 'Sarah Chen', points: 2450, workouts: 24 },
  { rank: 2, name: 'Jake Wilson', points: 2380, workouts: 22 },
  { rank: 3, name: 'You', points: 2290, workouts: 21, isUser: true },
  { rank: 4, name: 'Emma Davis', points: 2180, workouts: 20 },
  { rank: 5, name: 'Mike Torres', points: 2050, workouts: 18 },
];

// Components
function WorkoutCard({ workout, index }: { workout: Workout; index: number }) {
  const [liked, setLiked] = useState(false);

  const typeColors: Record<string, string> = {
    'AMRAP': 'bg-lime-400 text-black',
    'For Time': 'bg-orange-500 text-black',
    'EMOM': 'bg-cyan-400 text-black',
    'Strength': 'bg-rose-500 text-white'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="relative bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 overflow-hidden group"
      style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)' }}
    >
      {/* Diagonal accent */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-lime-400/10 transform rotate-45 translate-x-12 -translate-y-12" />

      <div className="p-4 md:p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-11 md:h-11 bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-lime-400 text-sm">
              {workout.avatar}
            </div>
            <div>
              <p className="font-semibold text-white text-sm md:text-base">{workout.athlete}</p>
              <p className="text-xs text-zinc-500 font-mono">{workout.date}</p>
            </div>
          </div>
          <span className={`${typeColors[workout.type]} px-2 py-1 text-xs font-bold uppercase tracking-wider`}>
            {workout.type}
          </span>
        </div>

        {/* Workout Name & Result */}
        <div className="mb-4">
          <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
            {workout.name}
            {workout.rx && (
              <span className="text-xs bg-lime-400 text-black px-1.5 py-0.5 font-bold">RX</span>
            )}
          </h3>
          <p className="text-3xl md:text-4xl font-black text-lime-400 font-mono mt-1">{workout.result}</p>
        </div>

        {/* Movements */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {workout.movements.map((move, i) => (
            <span key={i} className="text-xs bg-zinc-800 text-zinc-400 px-2 py-1 font-mono">
              {move}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 pt-3 border-t border-zinc-800">
          <button
            onClick={() => setLiked(!liked)}
            className="flex items-center gap-1.5 text-sm font-medium transition-colors min-h-[44px] px-2"
          >
            <motion.span
              animate={{ scale: liked ? [1, 1.3, 1] : 1 }}
              className={liked ? 'text-lime-400' : 'text-zinc-500'}
            >
              {liked ? '★' : '☆'}
            </motion.span>
            <span className={liked ? 'text-lime-400' : 'text-zinc-500'}>
              {liked ? workout.likes + 1 : workout.likes}
            </span>
          </button>
          <button className="flex items-center gap-1.5 text-sm font-medium text-zinc-500 hover:text-white transition-colors min-h-[44px] px-2">
            <span>💬</span>
            <span>{workout.comments}</span>
          </button>
          <button className="ml-auto text-zinc-600 hover:text-lime-400 transition-colors min-h-[44px] px-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function PRCard({ pr, index }: { pr: PR; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 + index * 0.1 }}
      className="flex items-center justify-between p-3 md:p-4 bg-zinc-900/60 border-l-4 border-lime-400 hover:bg-zinc-900 transition-colors"
    >
      <div>
        <p className="font-bold text-white text-sm md:text-base uppercase tracking-wide">{pr.movement}</p>
        <p className="text-xs text-zinc-500 font-mono">{pr.date}</p>
      </div>
      <div className="text-right">
        <p className="text-lg md:text-xl font-black text-white font-mono">{pr.value}</p>
        <p className="text-xs text-lime-400 font-bold">{pr.improvement}</p>
      </div>
    </motion.div>
  );
}

function LogWorkoutModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [workoutType, setWorkoutType] = useState<string>('For Time');

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg bg-zinc-900 border border-zinc-700 z-50 overflow-y-auto max-h-[90vh]"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)' }}
          >
            <div className="p-5 md:p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">Log Workout</h2>
                <button
                  onClick={onClose}
                  className="w-10 h-10 flex items-center justify-center text-zinc-500 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
                    Workout Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Fran, Morning WOD..."
                    className="w-full bg-zinc-800 border border-zinc-700 px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-lime-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
                    Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['For Time', 'AMRAP', 'EMOM', 'Strength'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setWorkoutType(type)}
                        className={`py-3 px-4 text-sm font-bold uppercase tracking-wide transition-all ${
                          workoutType === type
                            ? 'bg-lime-400 text-black'
                            : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
                    Result
                  </label>
                  <input
                    type="text"
                    placeholder={workoutType === 'AMRAP' ? 'e.g., 8 rounds + 5 reps' : 'e.g., 5:30'}
                    className="w-full bg-zinc-800 border border-zinc-700 px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-lime-400 transition-colors font-mono text-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
                    Movements
                  </label>
                  <textarea
                    placeholder="21-15-9&#10;Thrusters 95/65&#10;Pull-ups"
                    rows={3}
                    className="w-full bg-zinc-800 border border-zinc-700 px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-lime-400 transition-colors font-mono text-sm resize-none"
                  />
                </div>

                <label className="flex items-center gap-3 cursor-pointer py-2">
                  <div className="w-6 h-6 border-2 border-lime-400 flex items-center justify-center">
                    <div className="w-3 h-3 bg-lime-400" />
                  </div>
                  <span className="text-white font-bold uppercase tracking-wide text-sm">RX</span>
                </label>

                <button className="w-full bg-lime-400 text-black py-4 font-black uppercase tracking-wider text-lg hover:bg-lime-300 transition-colors mt-4">
                  Post Workout
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState<'feed' | 'prs' | 'leaderboard'>('feed');
  const [showLogModal, setShowLogModal] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-white relative overflow-x-hidden">
      {/* Noise texture overlay */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none z-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Diagonal background accents */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/4 w-full h-full bg-lime-400/5 transform rotate-12" />
        <div className="absolute -bottom-1/2 -left-1/4 w-3/4 h-full bg-lime-400/3 transform -rotate-12" />
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-30 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800"
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-9 h-9 md:w-10 md:h-10 bg-lime-400 flex items-center justify-center transform -skew-x-6">
              <span className="text-black font-black text-lg md:text-xl transform skew-x-6">W</span>
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-black uppercase tracking-tight leading-none">WODTRACK</h1>
              <p className="text-[10px] md:text-xs text-zinc-500 font-mono uppercase tracking-widest">Crush. Log. Repeat.</p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={() => setShowLogModal(true)}
              className="bg-lime-400 text-black px-3 md:px-5 py-2.5 md:py-2 font-bold uppercase text-xs md:text-sm tracking-wider hover:bg-lime-300 transition-colors flex items-center gap-1.5 min-h-[44px]"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)' }}
            >
              <span className="text-lg leading-none">+</span>
              <span className="hidden sm:inline">Log WOD</span>
            </button>
            <div className="w-9 h-9 md:w-10 md:h-10 bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-lime-400 text-sm cursor-pointer hover:border-lime-400 transition-colors">
              YO
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8 relative z-10 pb-32 md:pb-8">
        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-2 md:gap-4 mb-6 md:mb-8"
        >
          {[
            { label: 'This Week', value: '5', unit: 'WODs' },
            { label: 'Streak', value: '12', unit: 'Days' },
            { label: 'New PRs', value: '3', unit: 'This Month' },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-zinc-900/60 border border-zinc-800 p-3 md:p-4 text-center"
              style={{ clipPath: i === 1 ? 'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)' : undefined }}
            >
              <p className="text-2xl md:text-3xl font-black text-lime-400 font-mono">{stat.value}</p>
              <p className="text-[10px] md:text-xs text-zinc-500 uppercase tracking-wider font-bold">{stat.label}</p>
              <p className="text-[10px] text-zinc-600 font-mono">{stat.unit}</p>
            </div>
          ))}
        </motion.div>

        {/* Desktop Tab Navigation */}
        <div className="hidden md:flex items-center gap-1 mb-6 bg-zinc-900/60 p-1 w-fit">
          {[
            { id: 'feed', label: 'Feed' },
            { id: 'prs', label: 'My PRs' },
            { id: 'leaderboard', label: 'Leaderboard' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all ${
                activeTab === tab.id
                  ? 'bg-lime-400 text-black'
                  : 'text-zinc-500 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {activeTab === 'feed' && (
                <motion.div
                  key="feed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4 md:space-y-5"
                >
                  {mockWorkouts.map((workout, i) => (
                    <WorkoutCard key={workout.id} workout={workout} index={i} />
                  ))}
                </motion.div>
              )}

              {activeTab === 'prs' && (
                <motion.div
                  key="prs"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3"
                >
                  <h2 className="text-lg md:text-xl font-black uppercase tracking-tight mb-4 flex items-center gap-2">
                    <span className="text-lime-400">★</span> Personal Records
                  </h2>
                  {mockPRs.map((pr, i) => (
                    <PRCard key={pr.movement} pr={pr} index={i} />
                  ))}
                  <div className="mt-6 p-4 border border-dashed border-zinc-700 text-center">
                    <p className="text-zinc-500 text-sm">Track more movements to see your progress</p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'leaderboard' && (
                <motion.div
                  key="leaderboard"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h2 className="text-lg md:text-xl font-black uppercase tracking-tight mb-4 flex items-center gap-2">
                    <span className="text-lime-400">⚡</span> Box Leaderboard
                  </h2>
                  <div className="space-y-2">
                    {leaderboard.map((entry, i) => (
                      <motion.div
                        key={entry.rank}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`flex items-center gap-4 p-4 ${
                          entry.isUser
                            ? 'bg-lime-400/10 border border-lime-400/30'
                            : 'bg-zinc-900/60 border border-zinc-800'
                        }`}
                      >
                        <div className={`w-10 h-10 flex items-center justify-center font-black text-lg ${
                          entry.rank === 1 ? 'bg-yellow-500 text-black' :
                          entry.rank === 2 ? 'bg-zinc-400 text-black' :
                          entry.rank === 3 ? 'bg-amber-700 text-white' :
                          'bg-zinc-800 text-zinc-500'
                        }`}>
                          {entry.rank}
                        </div>
                        <div className="flex-1">
                          <p className={`font-bold ${entry.isUser ? 'text-lime-400' : 'text-white'}`}>
                            {entry.name}
                          </p>
                          <p className="text-xs text-zinc-500 font-mono">{entry.workouts} workouts</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-black font-mono text-white">{entry.points}</p>
                          <p className="text-xs text-zinc-500 uppercase">pts</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar - Hidden on mobile, shown on desktop */}
          <div className="hidden lg:block space-y-6">
            {/* Quick PRs */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-zinc-900/60 border border-zinc-800 p-5"
            >
              <h3 className="text-sm font-black uppercase tracking-wider text-zinc-400 mb-4 flex items-center gap-2">
                <span className="text-lime-400">★</span> Recent PRs
              </h3>
              <div className="space-y-3">
                {mockPRs.slice(0, 3).map((pr) => (
                  <div key={pr.movement} className="flex items-center justify-between">
                    <span className="text-sm text-white font-medium">{pr.movement}</span>
                    <span className="text-sm font-mono text-lime-400 font-bold">{pr.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Upcoming WOD */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-zinc-900/60 border border-zinc-800 overflow-hidden"
            >
              <div className="bg-lime-400 px-5 py-3">
                <p className="text-black font-black uppercase text-sm tracking-wider">Tomorrow's WOD</p>
              </div>
              <div className="p-5">
                <h4 className="text-2xl font-black text-white uppercase mb-2">MURPH</h4>
                <div className="space-y-1 text-sm text-zinc-400 font-mono">
                  <p>1 Mile Run</p>
                  <p>100 Pull-ups</p>
                  <p>200 Push-ups</p>
                  <p>300 Squats</p>
                  <p>1 Mile Run</p>
                </div>
                <p className="mt-3 text-xs text-zinc-500">Partition as needed • Wear vest for RX+</p>
              </div>
            </motion.div>

            {/* Weekly Challenge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-zinc-900/60 border border-zinc-800 p-5"
            >
              <h3 className="text-sm font-black uppercase tracking-wider text-zinc-400 mb-3">Weekly Challenge</h3>
              <p className="text-white font-bold mb-2">Complete 5 WODs</p>
              <div className="h-2 bg-zinc-800 overflow-hidden">
                <div className="h-full bg-lime-400 w-3/5 transition-all" />
              </div>
              <p className="text-xs text-zinc-500 mt-2 font-mono">3/5 completed</p>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-zinc-950/95 backdrop-blur-md border-t border-zinc-800 z-30">
        <div className="grid grid-cols-3">
          {[
            { id: 'feed', label: 'Feed', icon: '📋' },
            { id: 'prs', label: 'PRs', icon: '★' },
            { id: 'leaderboard', label: 'Board', icon: '⚡' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex flex-col items-center justify-center py-3 min-h-[60px] transition-colors ${
                activeTab === tab.id
                  ? 'text-lime-400 bg-zinc-900'
                  : 'text-zinc-500'
              }`}
            >
              <span className="text-xl mb-0.5">{tab.icon}</span>
              <span className="text-xs font-bold uppercase tracking-wider">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <footer className="hidden md:block max-w-6xl mx-auto px-6 py-6 border-t border-zinc-900 relative z-10">
        <p className="text-center text-xs text-zinc-600 font-mono">
          Requested by @pierreascone · Built by @clonkbot
        </p>
      </footer>

      {/* Mobile Footer - Above bottom nav */}
      <div className="md:hidden px-4 pb-20 relative z-10">
        <p className="text-center text-xs text-zinc-600 font-mono">
          Requested by @pierreascone · Built by @clonkbot
        </p>
      </div>

      {/* Log Workout Modal */}
      <LogWorkoutModal isOpen={showLogModal} onClose={() => setShowLogModal(false)} />
    </div>
  );
}

export default App;
