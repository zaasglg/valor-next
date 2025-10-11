"use client";

import { useLanguage } from '@/contexts/LanguageContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface GameModeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMode: (mode: 'demo' | 'real') => void;
}

export function GameModeDialog({ isOpen, onClose, onSelectMode }: GameModeDialogProps) {
  const { t } = useLanguage();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-[#1a1a2e] border-[#16213e] p-0 overflow-hidden">
        {/* Header with blue background like deposit modal */}
        <DialogHeader className="bg-blue-900 text-white px-6 py-6 rounded-t-lg">
          <DialogTitle className="text-lg font-bold">{t('game_mode.select_mode')}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4 px-6">
          {/* Demo Mode */}
          <div className="border border-gray-600 rounded-lg p-4 hover:border-[#ffb32c] transition-colors cursor-pointer bg-[#16213e]"
               onClick={() => onSelectMode('demo')}>
            <div className="flex items-center space-x-3">
              <div className="flex-1">
                <h3 className="font-semibold text-white">{t('game_mode.demo_mode')}</h3>
                <p className="text-sm text-gray-300">{t('game_mode.demo_description')}</p>
              </div>
            </div>
          </div>

          {/* Real Mode */}
          <div className="border border-gray-600 rounded-lg p-4 hover:border-[#ffb32c] transition-colors cursor-pointer bg-[#16213e]"
               onClick={() => onSelectMode('real')}>
            <div className="flex items-center space-x-3">
              <div className="flex-1">
                <h3 className="font-semibold text-white">{t('game_mode.real_mode')}</h3>
                <p className="text-sm text-gray-300">{t('game_mode.real_description')}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
