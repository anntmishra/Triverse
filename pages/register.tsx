import type { NextPage } from 'next';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Event information
const eventInfo = {
  seekhothon: {
    name: 'Seekhothon',
    date: 'March 28, 2024',
    description: 'A 24-hour hackathon where participants collaborate to build innovative solutions to real-world problems.'
  },
  finlit: {
    name: 'FinLit',
    date: 'March 29, 2024',
    description: 'A financial literacy summit featuring expert panels, workshops, and networking sessions.'
  },
  betfortech: {
    name: 'Bet for Tech',
    date: 'March 29, 2024',
    description: 'A startup pitch competition where entrepreneurs present their tech innovations to a panel of investors.'
  },
  tedtalk: {
    name: 'TED Talk',
    date: 'March 30, 2024',
    description: 'An inspiring series of talks from thought leaders and innovators sharing ideas worth spreading.'
  }
};

const Register: NextPage = () => {
  const router = useRouter();
  const { event } = router.query;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    event: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  useEffect(() => {
    if (event && typeof event === 'string' && eventInfo[event as keyof typeof eventInfo]) {
      setFormData(prev => ({
        ...prev,
        event: event as string
      }));
    }
  }, [event]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const getEventTitle = () => {
    if (formData.event && eventInfo[formData.event as keyof typeof eventInfo]) {
      return eventInfo[formData.event as keyof typeof eventInfo].name;
    }
    return 'Triverse 2.0';
  };

  if (isSubmitted) {
    return (
      <div className="container">
        <Head>
          <title>Registration Successful | Triverse</title>
          <meta name="description" content="Registration successful for Triverse 2.0" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="main">
          <div className="success-container">
            <h1>Registration Successful!</h1>
            <p>Thank you for registering for {getEventTitle()}. We've sent a confirmation email to {formData.email}.</p>
            <p>We look forward to seeing you on March 28-30th!</p>
            <Link href="/">
              <button className="back-button">Back to Home</button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="container">
      <Head>
        <title>Register | Triverse</title>
        <meta name="description" content="Register for Triverse 2.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <h1 className="title">Register for <span className="highlight">{getEventTitle()}</span></h1>
        <p className="subtitle">March 28-30th</p>

        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email address"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="organization">Organization</label>
              <input
                type="text"
                id="organization"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                placeholder="Enter your organization name"
              />
            </div>

            {!formData.event && (
              <div className="form-group">
                <label htmlFor="event">Select Event</label>
                <select
                  id="event"
                  name="event"
                  value={formData.event}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select an event</option>
                  <option value="seekhothon">Seekhothon</option>
                  <option value="finlit">FinLit</option>
                  <option value="betfortech">Bet for Tech</option>
                  <option value="tedtalk">TED Talk</option>
                </select>
              </div>
            )}

            {formData.event && (
              <div className="selected-event">
                <p>
                  <strong>Selected Event:</strong> {eventInfo[formData.event as keyof typeof eventInfo]?.name}
                </p>
                <p>
                  <strong>Date:</strong> {eventInfo[formData.event as keyof typeof eventInfo]?.date}
                </p>
                <p className="event-description">
                  {eventInfo[formData.event as keyof typeof eventInfo]?.description}
                </p>
              </div>
            )}

            <button 
              type="submit" 
              className="submit-button"
              disabled={isSubmitting || !formData.event}
            >
              {isSubmitting ? 'Submitting...' : 'Complete Registration'}
            </button>
          </form>
        </div>

        <div className="back-link">
          <Link href="/">
            <span>← Back to Home</span>
          </Link>
        </div>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 1rem;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          color: white;
        }

        .main {
          max-width: 800px;
          margin: 0 auto;
          padding: 6rem 0 4rem 0;
        }

        .title {
          font-size: 2.5rem;
          text-align: center;
          margin-bottom: 0.5rem;
        }

        .highlight {
          color: #0070f3;
          background: linear-gradient(90deg, #0070f3, #00c6ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .subtitle {
          text-align: center;
          color: #aaa;
          margin-bottom: 3rem;
          font-size: 1.2rem;
        }

        .form-container {
          background: rgba(255, 255, 255, 0.05);
          padding: 2rem;
          border-radius: 10px;
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        label {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          color: #ccc;
        }

        input, select {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.05);
          color: white;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        select {
          appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          background-size: 1em;
        }

        input:focus, select:focus {
          outline: none;
          border-color: #0070f3;
          box-shadow: 0 0 0 2px rgba(0, 112, 243, 0.2);
        }

        input::placeholder {
          color: #666;
        }

        .selected-event {
          margin-bottom: 1.5rem;
          padding: 1rem;
          background: rgba(0, 112, 243, 0.1);
          border-radius: 4px;
          border-left: 3px solid #0070f3;
        }

        .selected-event p {
          margin: 0.5rem 0;
          color: #ddd;
        }

        .selected-event .event-description {
          font-style: italic;
          color: #aaa;
          margin-top: 0.5rem;
        }

        .submit-button {
          width: 100%;
          padding: 1rem;
          background-color: #EA8EEA;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 1rem;
          font-weight: bold;
        }

        .submit-button:hover:not(:disabled) {
          background-color: #d67ad6;
        }

        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .back-link {
          margin-top: 2rem;
          text-align: center;
        }

        .back-link span {
          color: #0070f3;
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .back-link span:hover {
          text-decoration: underline;
        }

        .success-container {
          text-align: center;
          background: rgba(255, 255, 255, 0.05);
          padding: 3rem 2rem;
          border-radius: 10px;
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .success-container h1 {
          color: #0070f3;
          margin-bottom: 1.5rem;
        }

        .success-container p {
          margin-bottom: 1rem;
          font-size: 1.1rem;
          color: #ddd;
        }

        .back-button {
          margin-top: 1.5rem;
          padding: 0.75rem 1.5rem;
          background-color: #EA8EEA;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .back-button:hover {
          background-color: #d67ad6;
        }

        @media (max-width: 768px) {
          .main {
            padding: 2rem 0;
          }
          
          .title {
            font-size: 2rem;
          }
          
          .form-container {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Register; 