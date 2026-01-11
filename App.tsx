import React, { useState, useEffect, useCallback } from 'react';
import { UserSettings, AppState, CheckInLog } from './types';
import Onboarding from './components/Onboarding';
import CheckInButton from './components/CheckInButton';
import StatsChart from './components/StatsChart';
import EmailPreviewModal from './components/EmailPreviewModal';
import { generateEmergencyEmail } from './services/geminiService';
import { Settings, RefreshCw, Zap } from 'lucide-react';

const STORAGE_KEY = 'huala-ma-app-data';

// Helper to get formatted date string YYYY-MM-DD
const getTodayString = () => new Date().toISOString().split('T')[0];

const App: React.FC = () => {
  // State initialization from LocalStorage
  const [settings, setSettings] = useState<UserSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_settings');
    return saved ? JSON.parse(saved) : { isConfigured: false, userName: '', partnerName: '', emergencyEmail: '' };
  });

  const [appState, setAppState] = useState<AppState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_state');
    return saved ? JSON.parse(saved) : { lastCheckIn: null, streak: 0, logs: [] };
  });

  const [timeLeft, setTimeLeft] = useState<string>("24:00:00");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState<{ subject: string, body: string } | null>(null);
  
  // Persist settings
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_settings', JSON.stringify(settings));
  }, [settings]);

  // Persist app state
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_state', JSON.stringify(appState));
  }, [appState]);

  // Timer & Alert Logic
  const checkStatus = useCallback(() => {
    if (!settings.isConfigured) return;

    const now = Date.now();
    const lastTime = appState.lastCheckIn || now; // Default to now if never checked in to start the clock
    const diff = now - lastTime;
    const limit = 24 * 60 * 60 * 1000; // 24 hours
    
    const remaining = Math.max(0, limit - diff);

    // Format HH:MM:SS
    const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((remaining / (1000 * 60)) % 60);
    const seconds = Math.floor((remaining / 1000) % 60);
    
    setTimeLeft(
      `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    );

    // Trigger Warning if time expired AND we haven't shown modal recently (state check omitted for simplicity in demo)
    // In a real app, we'd have a 'status' state.
  }, [appState.lastCheckIn, settings.isConfigured]);

  useEffect(() => {
    const timer = setInterval(checkStatus, 1000);
    return () => clearInterval(timer);
  }, [checkStatus]);

  const handleCheckIn = () => {
    const now = Date.now();
    const today = getTodayString();
    
    // Check streak
    const lastLog = appState.logs.length > 0 ? appState.logs[appState.logs.length - 1] : null;
    let newStreak = appState.streak;
    
    if (lastLog) {
      const lastDate = new Date(lastLog.date);
      const currentDate = new Date(today);
      const diffDays = (currentDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24);
      
      if (diffDays === 1) {
        newStreak += 1;
      } else if (diffDays > 1) {
        newStreak = 1;
      }
      // If same day, don't increment streak
    } else {
      newStreak = 1;
    }

    const newLog: CheckInLog = { date: today, timestamp: now };
    
    // Filter out if log for today already exists (update timestamp)
    const otherLogs = appState.logs.filter(l => l.date !== today);

    setAppState(prev => ({
      lastCheckIn: now,
      streak: newStreak,
      logs: [...otherLogs, newLog]
    }));
  };

  const handleSimulateAlert = async () => {
    setIsModalOpen(true);
    setEmailLoading(true);
    const result = await generateEmergencyEmail(settings, 1);
    setGeneratedEmail(result);
    setEmailLoading(false);
  };

  const resetData = () => {
    if(confirm("确定要重置所有数据吗？")) {
        setSettings({ isConfigured: false, userName: '', partnerName: '', emergencyEmail: '' });
        setAppState({ lastCheckIn: null, streak: 0, logs: [] });
    }
  };

  const isCheckedInToday = appState.logs.some(l => l.date === getTodayString());

  if (!settings.isConfigured) {
    return <Onboarding onComplete={setSettings} />;
  }

  return (
    <div className="min-h-screen bg-rose-50 flex flex-col items-center relative overflow-hidden">
        {/* Header */}
        <header className="w-full bg-white shadow-sm px-6 py-4 flex justify-between items-center z-10">
            <h1 className="text-xl font-bold text-rose-600">怀了吗</h1>
            <button onClick={resetData} className="p-2 text-gray-400 hover:text-rose-500 transition-colors">
                <Settings className="w-5 h-5" />
            </button>
        </header>

        {/* Main Content */}
        <main className="flex-1 w-full max-w-md px-4 py-6 flex flex-col gap-6">
            
            {/* Status Card */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-rose-100 flex justify-between items-center">
                <div>
                    <p className="text-sm text-gray-500 font-medium">当前连胜</p>
                    <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-rose-600">{appState.streak}</span>
                        <span className="text-sm text-gray-400">天</span>
                    </div>
                </div>
                <div>
                     <p className="text-sm text-gray-500 font-medium text-right">紧急联系人</p>
                     <p className="text-lg font-semibold text-gray-700 text-right">{settings.partnerName}</p>
                </div>
            </div>

            {/* Check In Action */}
            <CheckInButton 
                onCheckIn={handleCheckIn}
                isCheckedInToday={isCheckedInToday}
                timeLeft={timeLeft}
            />

            {/* History */}
            <div className="bg-white rounded-2xl p-4 shadow-md border border-rose-100">
                <StatsChart logs={appState.logs} />
            </div>

            {/* Simulation Control (For Demo) */}
            <div className="mt-4 p-4 rounded-xl border border-dashed border-rose-300 bg-rose-50/50">
                <p className="text-xs text-rose-400 mb-2 font-bold text-center">--- 开发者测试区 ---</p>
                <button 
                    onClick={handleSimulateAlert}
                    className="w-full flex items-center justify-center gap-2 bg-white text-rose-600 border border-rose-200 py-3 rounded-lg text-sm font-semibold hover:bg-rose-50 transition-colors shadow-sm"
                >
                    <Zap className="w-4 h-4" />
                    模拟 "忘记打卡" (触发警报)
                </button>
            </div>
        </main>

        <EmailPreviewModal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            isLoading={emailLoading}
            emailData={generatedEmail}
            recipient={settings.emergencyEmail}
        />
    </div>
  );
};

export default App;