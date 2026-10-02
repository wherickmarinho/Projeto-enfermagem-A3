import { useEffect, useId, useRef } from 'react';

// Janela modal usando o elemento nativo <dialog>.
// O navegador já cuida de: prender o foco dentro da janela e fechar com a tecla Esc.
export default function Modal({ open, title, onClose, actions, children, className = '' }) {
  const dialogRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog ref={dialogRef} className={`modal ${className}`} aria-labelledby={titleId} onClose={onClose}>
      <div className="modal-header">
        <h2 id={titleId}>{title}</h2>
      </div>
      <div className="modal-body">{children}</div>
      {actions && <div className="modal-actions">{actions}</div>}
    </dialog>
  );
}
