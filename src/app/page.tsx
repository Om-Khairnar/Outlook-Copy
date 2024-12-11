"use client"
import { useState,useEffect } from "react";
import {Email} from '../types/email'
import { fetchEmails } from '../services/api';
import { EmailListItem } from '../components/EmailListItem';
import { EmailBody } from '../components/EmailBody';
import { FilterBar } from '../components/FilterBar';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function Home() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read' | 'favorites'>('all');
  const [readEmails, setReadEmails] = useLocalStorage<string[]>('readEmails', []);
  const [favoriteEmails, setFavoriteEmails] = useLocalStorage<string[]>('favoriteEmails', []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEmails = async () => {
      try {
        const fetchedEmails = await fetchEmails();
        const enrichedEmails = fetchedEmails.map((email: Email) => ({
          ...email,
          read: readEmails.includes(email.id),
          favorite: favoriteEmails.includes(email.id)
        }));
        setEmails(enrichedEmails);
      } catch (error) {
        console.error('Failed to load emails:', error);
      }
      setLoading(false);
    };

    loadEmails();
  }, [readEmails, favoriteEmails]);

  const handleEmailSelect = (email: Email) => {
    setSelectedEmail(email);
    if (!email.read) {
      setReadEmails([...readEmails, email.id]);
    }
  };

  const handleToggleFavorite = () => {
    if (!selectedEmail) return;

    if (favoriteEmails.includes(selectedEmail.id)) {
      setFavoriteEmails(favoriteEmails.filter(id => id !== selectedEmail.id));
    } else {
      setFavoriteEmails([...favoriteEmails, selectedEmail.id]);
    }
  };

  const filteredEmails = emails.filter(email => {
    switch (filter) {
      case 'unread':
        return !email.read;
      case 'read':
        return email.read;
      case 'favorites':
        return email.favorite;
      default:
        return true;
    }
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto">
        <FilterBar filter={filter} onFilterChange={setFilter} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-border">
            {filteredEmails.map(email => (
              <EmailListItem
                key={email.id}
                email={email}
                isSelected={selectedEmail?.id === email.id}
                onClick={() => handleEmailSelect(email)}
              />
            ))}
          </div>
          {selectedEmail && (
            <div className="bg-white rounded-lg shadow-md border border-border">
              <EmailBody
                email={selectedEmail}
                onToggleFavorite={handleToggleFavorite}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
