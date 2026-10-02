// Botão padrão do sistema. Todos os botões seguem o mesmo visual (consistência).
// variant: primary | secondary | ghost | danger | success
export default function Button({ variant = 'primary', size, icon, children, className = '', ...props }) {
  const classes = `btn btn-${variant} ${size === 'large' ? 'btn-large' : ''} ${className}`;

  return (
    <button type="button" className={classes} {...props}>
      {icon && <span aria-hidden="true">{icon}</span>}
      {children}
    </button>
  );
}
