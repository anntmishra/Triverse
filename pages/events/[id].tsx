import { useRouter } from 'next/router';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

// Mock data for events (same as in index.tsx)
const mockEvents = [
  {
    id: '1',
    title: 'Tech Conference 2023',
    date: 'June 15-17, 2023',
    location: 'San Francisco, CA',
    description: 'A three-day conference featuring the latest in technology trends, workshops, and networking opportunities.',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    details: 'Join us for an immersive experience in the world of technology. Network with industry leaders, attend workshops led by experts, and discover the latest innovations. The conference will feature keynote speeches, panel discussions, and hands-on sessions covering topics such as artificial intelligence, blockchain, cybersecurity, and more.',
    organizer: 'Tech Innovations Inc.',
    ticketPrice: '$299',
  },
  {
    id: '2',
    title: 'Music Festival',
    date: 'July 22-24, 2023',
    location: 'Austin, TX',
    description: 'An outdoor music festival featuring top artists from around the world, food vendors, and art installations.',
    imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    details: 'Experience three days of non-stop music across five stages featuring over 100 artists from various genres. Enjoy delicious food from local vendors, browse unique art installations, and camp under the stars. The festival grounds will also feature interactive experiences, workshops, and wellness activities.',
    organizer: 'Soundwave Productions',
    ticketPrice: '$199',
  },
  {
    id: '3',
    title: 'Food & Wine Expo',
    date: 'August 5-6, 2023',
    location: 'Chicago, IL',
    description: 'Sample cuisine and beverages from top chefs and wineries, with cooking demonstrations and tastings.',
    imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    details: 'Indulge in a weekend of culinary delights at the annual Food & Wine Expo. Sample dishes from award-winning chefs, taste wines from renowned vineyards, and learn new cooking techniques through live demonstrations. The expo will also feature artisanal food products, cookbook signings, and exclusive tasting sessions.',
    organizer: 'Gourmet Events LLC',
    ticketPrice: '$85',
  },
];

const EventDetail: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  
  const event = mockEvents.find(event => event.id === id);
  
  if (!event) {
    return (
      <div className="container">
        <Head>
          <title>Event Not Found | Triverse</title>
          <meta name="description" content="Event not found" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        
        <main className="main">
          <h1>Event Not Found</h1>
          <p>The event you're looking for doesn't exist or has been removed.</p>
          <Link href="/events">
            <button className="back-button">Back to Events</button>
          </Link>
        </main>
      </div>
    );
  }
  
  return (
    <div className="container">
      <Head>
        <title>{event.title} | Triverse</title>
        <meta name="description" content={event.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="main">
        <div className="event-header">
          <div className="image-container">
            <img src={event.imageUrl} alt={event.title} />
          </div>
          <div className="event-info">
            <h1>{event.title}</h1>
            <div className="meta">
              <div className="meta-item">
                <span className="label">Date:</span>
                <span className="value">{event.date}</span>
              </div>
              <div className="meta-item">
                <span className="label">Location:</span>
                <span className="value">{event.location}</span>
              </div>
              <div className="meta-item">
                <span className="label">Organizer:</span>
                <span className="value">{event.organizer}</span>
              </div>
              <div className="meta-item">
                <span className="label">Price:</span>
                <span className="value">{event.ticketPrice}</span>
              </div>
            </div>
            <div className="actions">
              <button className="register-button">Register Now</button>
              <button className="share-button">Share Event</button>
            </div>
          </div>
        </div>
        
        <div className="event-content">
          <h2>About This Event</h2>
          <p className="description">{event.details}</p>
        </div>
        
        <div className="navigation">
          <Link href="/events">
            <button className="back-button">Back to Events</button>
          </Link>
        </div>
      </main>
      
      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 1rem;
        }
        
        .main {
          max-width: 1200px;
          margin: 0 auto;
          padding: 6rem 0 2rem 0;
        }
        
        .event-header {
          display: flex;
          margin-bottom: 2rem;
          gap: 2rem;
        }
        
        .image-container {
          flex: 1;
          height: 400px;
          border-radius: 8px;
          overflow: hidden;
        }
        
        .image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .event-info {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        
        h1 {
          margin: 0 0 1rem 0;
          font-size: 2.5rem;
          color: #333;
        }
        
        .meta {
          margin-bottom: 2rem;
        }
        
        .meta-item {
          margin-bottom: 0.5rem;
          font-size: 1.1rem;
        }
        
        .label {
          font-weight: bold;
          margin-right: 0.5rem;
          color: #666;
        }
        
        .value {
          color: #333;
        }
        
        .actions {
          display: flex;
          gap: 1rem;
          margin-top: auto;
        }
        
        .register-button, .share-button {
          padding: 0.75rem 1.5rem;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .register-button {
          background-color: #EA8EEA;
          border: none;
          color: white;
        }
        
        .register-button:hover {
          background-color: #d67ad6;
        }
        
        .share-button {
          background-color: transparent;
          border: 1px solid #0070f3;
          color: #0070f3;
        }
        
        .share-button:hover {
          background-color: rgba(0, 112, 243, 0.1);
        }
        
        .event-content {
          margin-bottom: 2rem;
        }
        
        h2 {
          margin: 0 0 1rem 0;
          font-size: 1.8rem;
          color: #333;
        }
        
        .description {
          font-size: 1.1rem;
          line-height: 1.6;
          color: #444;
        }
        
        .navigation {
          margin-top: 2rem;
        }
        
        .back-button {
          padding: 0.5rem 1rem;
          background-color: #f0f0f0;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        
        .back-button:hover {
          background-color: #e0e0e0;
        }
        
        @media (max-width: 768px) {
          .event-header {
            flex-direction: column;
          }
          
          .image-container {
            height: 300px;
          }
        }
        
        @media (prefers-color-scheme: dark) {
          h1, h2 {
            color: #f0f0f0;
          }
          
          .label {
            color: #b0b0b0;
          }
          
          .value {
            color: #e0e0e0;
          }
          
          .description {
            color: #d0d0d0;
          }
          
          .back-button {
            background-color: #333;
            color: #f0f0f0;
          }
          
          .back-button:hover {
            background-color: #444;
          }
        }
      `}</style>
    </div>
  );
};

export default EventDetail; 