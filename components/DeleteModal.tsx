"use client"

import { AlertTriangle, Trash2, X } from "lucide-react";
import { ModalBackDrop } from "./ModalBackDrop";
import { Button } from "./Button";


interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void>;
    title?: string;
    message?: string;
    itemName?: string;
    itemType?: string;
    isLoading?: boolean;
    destructiveAction?: boolean;
}

export const DeleteModal =({
    isOpen,
    onClose,
    onConfirm,
    title = "Delete Item",
    message,
    itemName,
    itemType = "item",
    isLoading = false,
    destructiveAction = true
  }: DeleteModalProps) => {
    const defaultMessage = itemName 
      ? `Are you sure you want to delete "${itemName}"? This action cannot be undone.`
      : `Are you sure you want to delete this ${itemType}? This action cannot be undone.`;
  
    const finalMessage = message || defaultMessage;
  
    return (
      <ModalBackDrop isOpen={isOpen} onClose={onClose}>
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl p-6 w-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl ${destructiveAction ? 'bg-red-500/20' : 'bg-orange-500/20'}`}>
                {destructiveAction ? (
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                ) : (
                  <Trash2 className="w-6 h-6 text-orange-400" />
                )}
              </div>
              <h2 className="text-xl font-bold text-white">{title}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors duration-200"
              disabled={isLoading}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
  
          {/* Content */}
          <div className="mb-8">
            <p className="text-gray-300 leading-relaxed">
              {finalMessage}
            </p>
            
            {destructiveAction && (
              <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                <p className="text-red-300 text-sm font-medium">
                  ⚠️ This is a permanent action and cannot be undone.
                </p>
              </div>
            )}
          </div>
  
          {/* Actions */}
          <div className="flex flex-col-reverse sm:flex-row gap-3">
            <Button
              variant="ghost"
              onClick={() => {
                if (!isLoading) {
                  onClose();
                }
              }}
              disabled={isLoading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={onConfirm}
              isLoading={isLoading}
              disabled={isLoading}
              className="flex-1"
            >
              <Trash2 className="w-4 h-4" />
              {isLoading ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </div>
      </ModalBackDrop>
    );
}