import React from 'react';
import { X, Mail, AlertTriangle, Loader2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  emailData: { subject: string; body: string } | null;
  recipient: string;
}

const EmailPreviewModal: React.FC<Props> = ({ isOpen, onClose, isLoading, emailData, recipient }) => {
  if (!isOpen) return null;

  const handleSend = () => {
    if (emailData && recipient) {
      const subject = encodeURIComponent(emailData.subject);
      const body = encodeURIComponent(emailData.body);
      // Open default mail client
      window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden border border-rose-200">
        <div className="bg-rose-600 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-white">
            <AlertTriangle className="w-6 h-6" />
            <span className="font-bold text-lg">警报已触发</span>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-sm text-gray-500 mb-4">
            检测到您未能在规定时间内打卡。以下是 Gemini AI 为您生成的提醒邮件内容。
          </p>

          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-10 text-rose-500">
                <Loader2 className="w-8 h-8 animate-spin mb-3" />
                <span className="text-sm font-medium">Gemini AI 正在撰写邮件...</span>
              </div>
            ) : emailData ? (
              <div className="space-y-4">
                <div className="border-b border-slate-200 pb-3">
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Subject</span>
                  <h3 className="font-bold text-gray-800 text-lg leading-tight">{emailData.subject}</h3>
                </div>
                <div className="whitespace-pre-wrap text-gray-700 text-sm leading-relaxed">
                  {emailData.body}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">无法生成预览</div>
            )}
          </div>

          <div className="mt-6 flex justify-end gap-3">
             <button 
              onClick={onClose}
              className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors"
            >
              稍后处理
            </button>
            <button 
              className={`px-6 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg shadow-rose-500/30 transition-all ${
                (isLoading || !emailData) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={handleSend}
              disabled={isLoading || !emailData}
            >
              <Mail className="w-4 h-4" />
              发送邮件 (本地客户端)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailPreviewModal;