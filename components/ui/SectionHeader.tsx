import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  align = 'center',
  className = ''
}: SectionHeaderProps) {
  
  const alignClass = styles[`align-${align}`] || styles['align-center'];
  
  return (
    <header className={`${styles.header} ${alignClass} ${className}`}>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      <h2 className={styles.title}>{title}</h2>
    </header>
  );
}
