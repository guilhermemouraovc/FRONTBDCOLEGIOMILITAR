import React from 'react';
import { AlertTriangleIcon } from 'lucide-react';
import Modal from './Modal';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="flex flex-col items-center gap-4">
        <div className="text-warning">
          <AlertTriangleIcon size={48} />
        </div>
        <p className="text-center text-dark/80">{message}</p>
        <div className="flex gap-4 mt-4">
          <button
            onClick={onClose}
            className="btn bg-dark/10 hover:bg-dark/20 text-dark"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="btn btn-danger"
          >
            Confirmar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;