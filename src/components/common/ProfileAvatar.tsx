interface ProfileAvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
}

const ProfileAvatar = ({ src, alt, size = 'md' }: ProfileAvatarProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700`}>
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
};

export default ProfileAvatar;