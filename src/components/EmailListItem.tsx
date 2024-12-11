import { Email } from '../types/email';
import { EmailAvatar } from './EmailAvatar';
import { formatDate } from '../utils/dateFormatter';

interface EmailListItemProps {
  email: Email;
  isSelected: boolean;
  onClick: () => void;
}

export function EmailListItem({ email, isSelected, onClick }: EmailListItemProps) {
  return (
    <div 
      className={`p-4 border-b border-border cursor-pointer transition-colors ${
        isSelected ? 'bg-background' : 'hover:bg-background'
      } ${email.read ? 'bg-read-bg' : 'bg-white font-semibold'}`}
      onClick={onClick}
    >
      <div className="flex gap-4">
        <EmailAvatar name={email.from.name} />
        <div className="flex-1">
          <div className="flex justify-between">
            <span className="text-text">From: <strong>{email.from.name}</strong> &lt;{email.from.email}&gt;</span>
            <span className="text-sm text-text">{formatDate(email.date)}</span>
          </div>
          <div className="mt-1">
            <h3 className="font-medium text-text">{email.subject}</h3>
            <p className="text-sm text-text mt-1">{email.short_description}</p>
          </div>
          {email.favorite && (
            <span className="text-accent text-sm mt-2 inline-block">★ Favorite</span>
          )}
        </div>
      </div>
    </div>
  );
}