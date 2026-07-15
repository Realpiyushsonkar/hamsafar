import { Link } from 'react-router-dom';

const VARIANTS = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700 shadow-sm hover:shadow-md',
  secondary: 'bg-amber text-ink-900 hover:bg-amber-600 shadow-sm hover:shadow-md',
  outline: 'bg-transparent text-primary-600 border border-primary-600 hover:bg-primary-50 dark:text-primary-300 dark:border-primary-300 dark:hover:bg-primary-800/30',
  ghost: 'bg-transparent text-ink-700 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-white/10',
};

const SIZES = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  type = 'button',
  className = '',
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 active:scale-[0.97] ${VARIANTS[variant]} ${SIZES[size]} ${className}`;

  if (to) {
    return <Link to={to} className={classes} {...props}>{children}</Link>;
  }
  if (href) {
    return <a href={href} className={classes} {...props}>{children}</a>;
  }
  return <button type={type} onClick={onClick} className={classes} {...props}>{children}</button>;
}