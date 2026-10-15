import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, User, Lock, Mail, CheckCircle } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { showToast } = useStore();
  const [email, setEmail] = useState('nam.230133@tbd.edu.vn');
  const [password, setPassword] = useState('••••••••');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    showToast(`Đăng nhập thành công với tài khoản ${email}`);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
      <div 
        className="w-full max-w-md bg-white rounded-xs shadow-2xl border border-neutral-300 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 bg-neutral-900 text-white flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
              GAZU VIP MEMBERSHIP
            </span>
            <h3 className="font-display font-bold text-lg text-white">
              Đăng Nhập Thành Viên
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded text-neutral-400 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {isLoggedIn ? (
            <div className="text-center py-6">
              <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
              <p className="font-bold text-sm text-neutral-900">Xin chào, {email}</p>
              <p className="text-xs text-neutral-500 mt-1">Đã áp dụng các đặc quyền khách hàng thân thiết GAZU.</p>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-neutral-800 block mb-1 uppercase tracking-wider">
                  Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-neutral-300 rounded-xs focus:border-black outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-neutral-800 block mb-1 uppercase tracking-wider">
                  Mật khẩu
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-neutral-300 rounded-xs focus:border-black outline-none font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-1">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-neutral-300" />
                  <span>Ghi nhớ đăng nhập</span>
                </label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Vui lòng kiểm tra email để đặt lại mật khẩu.'); }} className="underline hover:text-black">
                  Quên mật khẩu?
                </a>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-black hover:bg-neutral-800 text-white text-xs font-bold tracking-widest uppercase rounded-xs transition-colors shadow-md cursor-pointer"
              >
                Đăng Nhập
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
