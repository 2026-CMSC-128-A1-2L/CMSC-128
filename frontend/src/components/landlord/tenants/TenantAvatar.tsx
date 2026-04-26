import { Icon } from '@iconify/react';

type TenantAvatarProps = {
  photoUrl?: string;
  name: string;
  size?: number;
  className?: string;
};

const TenantAvatar = ({ photoUrl, name, size = 72, className = '' }: TenantAvatarProps) => {
  const style = { height: `${size}px`, width: `${size}px` };

  return (
    <span
      className={[
        'flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#e5e7eb] text-[#9ca3af]',
        className,
      ].join(' ')}
      style={style}
      aria-hidden={!photoUrl}
    >
      {photoUrl ? (
        <img src={photoUrl} alt={name} className="h-full w-full object-cover" />
      ) : (
        <Icon
          icon="solar:user-bold"
          style={{ height: `${Math.round(size * 0.6)}px`, width: `${Math.round(size * 0.6)}px` }}
          aria-hidden="true"
        />
      )}
    </span>
  );
};

export default TenantAvatar;
