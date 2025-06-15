"use client"
import { ReactNode } from "react";



interface ModalBackDropProps {
    isOpen: boolean
    onClose: () => void;
    children: ReactNode
}

export const ModalBackDrop = ({ isOpen, onClose, children }: ModalBackDropProps) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
        {/* Backdrop - only this closes the modal */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
  
        {/* Modal Container - doesn't close on click */}
        <div className="relative z-10 w-full max-w-md transform animate-scaleIn">
          {children}
        </div>
      </div>
    );
  };
  