import React from 'react';
import { Heart, Check } from 'lucide-react';

interface Props {
  onCheckIn: () => void;
  isCheckedInToday: boolean;
  timeLeft: string;
}

const CheckInButton: React.FC<Props> = ({ onCheckIn, isCheckedInToday, timeLeft }) => {
  if (isCheckedInToday) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="relative">
          <div className="w-48 h-48 rounded-full bg-green-100 flex items-center justify-center shadow-inner">
            <Check className="w-24 h-24 text-green-500" />
          </div>
          <div className="absolute inset-0 rounded-full border-4 border-green-200 animate-pulse"></div>
        </div>
        <h2 className="mt-6 text-2xl font-bold text-gray-800">今日已打卡</h2>
        <p className="text-gray-500 mt-2">甜蜜度 +1，继续保持！</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <button
        onClick={onCheckIn}
        className="group relative w-56 h-56 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 shadow-2xl shadow-rose-500/40 hover:scale-105 active:scale-95 transition-all duration-300 flex flex-col items-center justify-center text-white cursor-pointer"
      >
        <Heart className="w-20 h-20 fill-white animate-bounce-slow" />
        <span className="mt-2 text-xl font-bold">立即打卡</span>
        <span className="text-xs opacity-80 mt-1">Make Love</span>
        
        {/* Ripple effects */}
        <span className="absolute -inset-2 rounded-full border-2 border-rose-300 opacity-0 group-hover:opacity-100 group-hover:animate-ping"></span>
      </button>

      <div className="mt-8 text-center">
        <p className="text-gray-500 text-sm uppercase tracking-wide">距离警报发送还有</p>
        <p className="text-4xl font-mono font-bold text-rose-600 mt-2">{timeLeft}</p>
      </div>
    </div>
  );
};

export default CheckInButton;