import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { Email, EmailBody as EmailBodyType } from '../types/email';
import { fetchEmailBody } from '../services/api';
import { formatDate } from '../utils/dateFormatter';

interface EmailBodyProps {
  email: Email;
  onToggleFavorite: () => void;
}

export function EmailBody({ email, onToggleFavorite }: EmailBodyProps) {
  const [emailBody, setEmailBody] = useState<EmailBodyType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEmailBody = async () => {
      setLoading(true);
      try {
        const body = await fetchEmailBody(email.id);
        setEmailBody(body);
      } catch (error) {
        console.error('Failed to load email body:', error);
      }
      setLoading(false);
    };

    loadEmailBody();
  }, [email.id]);

  if (loading) {
    return (
      <div className="p-8 flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-2 text-text">{email.subject}</h2>
          <div className="text-text">
            From: {email.from.name} &lt;{email.from.email}&gt;
          </div>
          <div className="text-text text-sm">
            {formatDate(email.date)}
          </div>
        </div>
        <button
          onClick={onToggleFavorite}
          className={`p-2 rounded-full hover:bg-background transition-colors ${
            email.favorite ? 'text-accent' : 'text-text'
          }`}
        >
          <Star className={email.favorite ? 'fill-current' : ''} />
        </button>
      </div>
      <div className="prose max-w-none text-text" dangerouslySetInnerHTML={{ __html: emailBody?.body || '' }} />
    </div>
  );
}