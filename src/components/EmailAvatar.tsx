interface EmailAvatarProps {
  name: string;
}

export function EmailAvatar({ name }: EmailAvatarProps) {
  const initial = name.charAt(0).toUpperCase();
  
  return (
    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white font-semibold">
      {initial}
    </div>
  );
}