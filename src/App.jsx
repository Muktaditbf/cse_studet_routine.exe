import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Trophy, Activity, Target, Moon, Zap, ChevronRight } from 'lucide-react';

// --- Mock Data ---
const ROUTINE_DATA = [
  { id: 1, start: "06:30", end: "07:30", title: "Morning Ritual", desc: "Hydration, Meditation, Light Exercise", category: "Wellness", color: "from-cyan-400 to-blue-500", icon: <Activity size={18} /> },
  { id: 2, start: "08:00", end: "11:00", title: "Deep Work Block 1", desc: "DSA - Hard Problems (LeetCode/Codeforces)", category: "Coding", color: "from-purple-500 to-pink-500", icon: <Zap size={18} /> },
  { id: 3, start: "11:00", end: "13:00", title: "University Core", desc: "OS, DBMS, Networking Theory", category: "Education", color: "from-orange-400 to-red-500", icon: <Target size={18} /> },
  { id: 4, start: "13:00", end: "14:00", title: "Lunch & Social", desc: "Rest, Nutrition, Networking", category: "Break", color: "from-green-400 to-emerald-500", icon: <CheckCircle size={18} /> },
  { id: 5, start: "14:00", end: "17:00", title: "Project Dev", desc: "Full Stack / AI / Web3 Development", category: "Project", color: "from-blue-600 to-indigo-600", icon: <ChevronRight size={18} /> },
  { id: 6, start: "17:00", end: "18:30", title: "Physical Activity", desc: "Gym / Sports / Outdoor", category: "Wellness", color: "from-red-400 to-rose-500", icon: <Activity size={18} /> },
  { id: 7, start: "19:00", end: "21:00", title: "Revision & Job Prep", desc: "Resume building, LinkedIn, Mock Interviews", category: "Career", color: "from-yellow-400 to-orange-500", icon: <Trophy size={18} /> },
  { id: 8, start: "21:00", end: "23:00", title: "Wind Down", desc: "Reading, Planning, No Screens", category: "Rest", color: "from-slate-600 to-slate-800", icon: <Moon size={18} /> },
];

const RoutineDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDeepWorkMode, setIsDeepWorkMode] = useState(false);
  const [completedTasks, setCompletedTasks] = useState([]);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  const totalMinutes = currentHour * 60 + currentMinute;

  const toggleComplete = (id) => {
    setCompletedTasks(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-100 p-4 md:p-8 font-sans selection:bg-purple-500/30">
      {/* Background Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-cyan-900/20 rounded-full blur-[120px]" />
      </div>

      <header className="max-w-6xl mx-auto mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-500"
          >
            CS_STUDENT.exe
          </motion.h1>
          <p className="text-slate-400 mt-2 font-mono">System Status: {isDeepWorkMode ? "Deep Work Active" : "Productivity Mode"}</p>
        </div>

        <div className="flex gap-4 items-center bg-white/5 backdrop-blur-xl p-4 rounded-2xl border border-white/10 shadow-2xl">
          <div className="text-right mr-4">
            <p className="text-xs text-slate-400 uppercase tracking-widest">Current Time</p>
            <p className="text-2xl font-mono font-bold">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
          <button 
            onClick={() => setIsDeepWorkMode(!isDeepWorkMode)}
            className={`px-6 py-3 rounded-full font-bold transition-all duration-500 ${
              isDeepWorkMode 
              ? "bg-purple-600 shadow-[0_0_20px_rgba(168,85,247,0.5)]" 
              : "bg-white/10 hover:bg-white/20"
            }`}
          >
            {isDeepWorkMode ? "EXIT DEEP WORK" : "FOCUS MODE"}
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Metrics Widget */}
        <div className="lg:col-span-3 space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl"
          >
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Trophy className="text-yellow-400" size={20} /> Daily Stats
            </h3>
            <div className="space-y-6">
              <MetricItem label="LeetCode Solved" value="14" color="text-cyan-400" />
              <MetricItem label="Git Commits" value="8" color="text-purple-400" />
              <MetricItem label="Hydration" value="2.4L" color="text-blue-400" />
              <MetricItem label="Deep Work Hrs" value="4.2" color="text-green-400" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-purple-600/20 to-transparent backdrop-blur-md border border-purple-500/30 p-6 rounded-3xl"
          >
            <h3 className="text-lg font-bold mb-2">Next Milestone</h3>
            <p className="text-3xl font-mono font-bold text-purple-300">
              {ROUTINE_DATA.find(item => !completedTasks.includes(item.id) && (parseInt(item.start.split(':')[0]) > (currentTime.getHours() || 0)))?.title || "Complete all tasks!"}
            </p>
          </motion.div>
        </div>

        {/* Middle Column: Dynamic Timeline */}
        <div className="lg:col-span-9 relative">
          {/* Vertical Line */}
          <div className="absolute left-[21px] top-0 bottom-0 w-[2px] bg-white/10 hidden md:block" />

          <div className="space-y-8 relative">
            {ROUTINE_DATA.map((item, index) => {
              const isCompleted = completedTasks.includes(item.id);
              const isActive = currentHour === parseInt(item.start.split(':')[0]) && currentMinute < 60; 
              // Simpler active check for demo
              const isCurrent = (currentTime.getHours() >= parseInt(item.start.split(':')[0])) && 
                                (currentTime.getHours() < parseInt(item.end.split(':')[0]));

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`relative flex items-start gap-8 group ${isDeepWorkMode && !isCurrent ? 'opacity-20 blur-[2px]' : ''}`}
                >
                  {/* Timeline Dot */}
                  <div className={`w-4 h-4 rounded-full z-10 mt-2 border-4 border-[#0a0a0c] ${isCompleted ? 'bg-green-500' : isCurrent ? 'bg-purple-500 shadow-[0_0_10px_#a855f7]' : 'bg-white/20'}`} />

                  <div className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl hover:bg-white/10 transition-all duration-300 group-hover:border-white/30">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-xs font-mono text-slate-500">{item.start} — {item.end}</span>
                        <h3 className={`text-xl font-bold ${isCurrent ? 'text-purple-400' : 'text-white'}`}>{item.title}</h3>
                        <p className="text-sm text-slate-400 mt-1">{item.desc}</p>
                      </div>
                      <button 
                        onClick={() => toggleComplete(item.id)}
                        className={`p-2 rounded-full transition-colors ${isCompleted ? 'bg-green-500/20 text-green-500' : 'bg-white/5 text-slate-500 hover:text-white'}`}
                      >
                        <CheckCircle size={20} />
                      </button>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex gap-2">
                        <span className={`text-[10px] px-2 py-1 rounded-full border border-white/10 ${item.color} bg-white/5 text-white`}>
                          {item.category}
                        </span>
                        {isCurrent && (
                          <span className="flex items-center gap-1 text-[10px] font-bold text-purple-400 animate-pulse">
                            <Zap size={10} /> FOCUS ACTIVE
                          </span>
                        )}
                      </div>
                      <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: isCompleted ? '100%' : '40%' }}
                          className={`h-full bg-gradient-to-r ${item.color}`}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>

      <footer className="fixed bottom-4 left-1/2 -translate-x-1/2 text-slate-600 text-xs font-mono">
        SYSTEM_STATUS: OPTIMIZED_FOR_PRODUCTIVITY_v3.0.4
      </footer>
    </div>
  );
};

const MetricItem = ({ label, value, color }) => (
  <div className="flex justify-between items-center border-b border-white/5 pb-2">
    <span className="text-slate-400 text-sm">{label}</span>
    <span className={`font-mono font-bold ${color}`}>{value}</span>
  </div>
);

export default RoutineDashboard;