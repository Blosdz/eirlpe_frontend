import type { ReactNode } from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: ReactNode;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  isDestructive = true,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/40 dark:bg-black/60 backdrop-blur-sm transition-opacity">
      <div 
        className="relative w-full max-w-md bg-white dark:bg-surface-dark border border-charcoal/10 dark:border-primary/20 rounded-2xl shadow-xl overflow-hidden transform transition-all"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div className="absolute top-4 right-4">
          <button 
            onClick={onClose}
            className="text-charcoal/40 dark:text-primary/40 hover:text-charcoal dark:hover:text-primary transition-colors focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                isDestructive ? 'bg-red-100 dark:bg-red-900/30' : 'bg-blue-100 dark:bg-blue-900/30'
            }`}>
              <AlertTriangle className={`w-6 h-6 ${
                  isDestructive ? 'text-red-600 dark:text-red-400' : 'text-blue-600 dark:text-blue-400'
              }`} />
            </div>
            <h3 className="text-xl font-bold text-charcoal dark:text-primary" id="modal-headline">
              {title}
            </h3>
          </div>
          
          <div className="mb-8 pl-16">
            <p className="text-sm text-charcoal/60 dark:text-primary/70">
              {description}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-end mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 w-full sm:w-auto text-sm font-medium rounded-lg text-charcoal hover:bg-charcoal/5 dark:text-primary dark:hover:bg-primary/10 border border-charcoal/10 dark:border-primary/20 transition-colors focus:outline-none focus:ring-2 focus:ring-charcoal/20"
            >
              {cancelText}
            </button>
            <button
              type="button"
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`px-4 py-2 w-full sm:w-auto text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 disabled:opacity-50 ${
                isDestructive 
                  ? 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500' 
                  : 'bg-charcoal hover:bg-charcoal-light dark:bg-primary dark:hover:bg-primary/90 text-beige dark:text-charcoal focus:ring-charcoal/50'
              }`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
