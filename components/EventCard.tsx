import React from 'react';
import { useRouter } from 'next/router';

interface EventCardProps {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl?: string;
}

const EventCard: React.FC<EventCardProps> = ({
  id,
  title,
  date,
  location,
  description,
  imageUrl = '/event-placeholder.jpg',
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/events/${id}`);
  };

  return (
    <div className="event-card" onClick={handleClick}>
      <div className="image-container">
        <img src={imageUrl} alt={title} />
      </div>
      <div className="content">
        <h3>{title}</h3>
        <div className="details">
          <p className="date">{date}</p>
          <p className="location">{location}</p>
        </div>
        <p className="description">{description}</p>
      </div>

      <style jsx>{`
        .event-card {
          display: flex;
          flex-direction: column;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
          background: white;
          margin-bottom: 20px;
        }

        .event-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
        }

        .image-container {
          width: 100%;
          height: 200px;
          overflow: hidden;
        }

        .image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .content {
          padding: 16px;
        }

        h3 {
          margin: 0 0 10px 0;
          font-size: 1.5rem;
          color: #333;
        }

        .details {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          font-size: 0.9rem;
          color: #666;
        }

        .description {
          color: #444;
          font-size: 1rem;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @media (prefers-color-scheme: dark) {
          .event-card {
            background: #1e1e1e;
          }

          h3 {
            color: #f0f0f0;
          }

          .details {
            color: #b0b0b0;
          }

          .description {
            color: #d0d0d0;
          }
        }
      `}</style>
    </div>
  );
};

export default EventCard; 