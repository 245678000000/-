import React, { useState } from 'react';
import { UserSettings } from '../types';
import { Heart, ArrowRight } from 'lucide-react';

interface Props {
  onComplete: (settings: UserSettings) => void;
}

const Onboarding: React.FC<Props> = ({ onComplete }) => {
  const [formData, setFormData] = useState<UserSettings>({
    userName: '',
    partnerName: '',
    emergencyEmail: '',
    isConfigured: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.userName && formData.partnerName && formData.emergencyEmail) {
      onComplete({ ...formData, isConfigured: true });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-rose-50">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-rose-100">
        <div className="flex flex-col items-center mb-8">
          <div className="p-4 bg-rose-100 rounded-full mb-4">
            <Heart className="w-10 h-10 text-rose-600 fill-rose-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">怀了吗</h1>
          <p className="text-gray-500 mt-2 text-center">
            每日打卡，守护激情。<br/>如果不打卡，我们会通知TA。
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">您的昵称</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all"
              placeholder="例如：小甜甜"
              value={formData.userName}
              onChange={e => setFormData({...formData, userName: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">紧急联系人 (伴侣) 昵称</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all"
              placeholder="例如：大坏蛋"
              value={formData.partnerName}
              onChange={e => setFormData({...formData, partnerName: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">紧急联系人邮箱</label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all"
              placeholder="partner@example.com"
              value={formData.emergencyEmail}
              onChange={e => setFormData({...formData, emergencyEmail: e.target.value})}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-rose-500/30 transition-all flex items-center justify-center gap-2 group"
          >
            开始守护
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;