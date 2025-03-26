import React, { useState } from "react";
import Link from "next/link";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(
    null
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // This is a placeholder for the actual submission logic
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitStatus("success");
      setEmail("");
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus(null), 3000);
    }
  };

  return (
    <footer className="site-footer">
      <div className="footer-separator"></div>

      <div className="footer-content">
        <div className="footer-logo-section">
          <div className="footer-logo">
            <img src="/assets/logonobg (1).png" alt="TRIVERSE 2.0" />
          </div>
          <p className="footer-description">
            Bennett University's flagship tech fest bringing together
            innovation, creativity and technology.
          </p>
          <div className="social-icons">
            <a
              href="https://twitter.com/Triverse"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>
            <a
              href="https://instagram.com/Triverse"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a
              href="https://linkedin.com/company/Triverse"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a
              href="https://github.com/Triverse"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
          </div>
          
          <div className="creator-credits">
            <h3 className="creator-title">
              Made with <span className="heart">❤</span> by:
            </h3>
            <div className="team-grid">
              <div className="team-member">
                <a href="https://linkedin.com/in/ayush-katare" target="_blank" rel="noopener noreferrer">
                  <div className="team-card">
                    <div className="team-card-inner">
                      <div className="team-card-front">
                        <div className="team-photo">
                          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces" alt="Ayush Katare" />
                        </div>
                        <span className="team-name">Ayush Katare</span>
                      </div>
                      <div className="team-card-back">
                        <div className="team-socials">
                          <a href="https://github.com/ayushkatare" target="_blank" rel="noopener noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                            </svg>
                          </a>
                          <a href="https://linkedin.com/in/ayush-katare" target="_blank" rel="noopener noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                              <rect x="2" y="9" width="4" height="12"></rect>
                              <circle cx="4" cy="4" r="2"></circle>
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="team-member">
                <a href="https://linkedin.com/in/rudraksh-jurel" target="_blank" rel="noopener noreferrer">
                  <div className="team-card">
                    <div className="team-card-inner">
                      <div className="team-card-front">
                        <div className="team-photo">
                          <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=faces" alt="Rudraksh Jurel" />
                        </div>
                        <span className="team-name">Rudraksh Jurel</span>
                      </div>
                      <div className="team-card-back">
                        <div className="team-socials">
                          <a href="https://github.com/rudraksh-jurel" target="_blank" rel="noopener noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                            </svg>
                          </a>
                          <a href="https://linkedin.com/in/rudraksh-jurel" target="_blank" rel="noopener noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                              <rect x="2" y="9" width="4" height="12"></rect>
                              <circle cx="4" cy="4" r="2"></circle>
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="team-member">
                <a href="https://linkedin.com/in/vidit-khenwar" target="_blank" rel="noopener noreferrer">
                  <div className="team-card">
                    <div className="team-card-inner">
                      <div className="team-card-front">
                        <div className="team-photo">
                          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces" alt="Vidit Khenwar" />
                        </div>
                        <span className="team-name">Vidit Khenwar</span>
                      </div>
                      <div className="team-card-back">
                        <div className="team-socials">
                          <a href="https://github.com/viditkhenwar" target="_blank" rel="noopener noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                            </svg>
                          </a>
                          <a href="https://linkedin.com/in/vidit-khenwar" target="_blank" rel="noopener noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                              <rect x="2" y="9" width="4" height="12"></rect>
                              <circle cx="4" cy="4" r="2"></circle>
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="team-member">
                <a href="https://linkedin.com/in/anant-mishra" target="_blank" rel="noopener noreferrer">
                  <div className="team-card">
                    <div className="team-card-inner">
                      <div className="team-card-front">
                        <div className="team-photo">
                          <img src="https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=150&h=150&fit=crop&crop=faces" alt="Anant Mishra" />
                        </div>
                        <span className="team-name">Anant Mishra</span>
                      </div>
                      <div className="team-card-back">
                        <div className="team-socials">
                          <a href="https://github.com/anantmishra1" target="_blank" rel="noopener noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                            </svg>
                          </a>
                          <a href="https://linkedin.com/in/anant-mishra" target="_blank" rel="noopener noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                              <rect x="2" y="9" width="4" height="12"></rect>
                              <circle cx="4" cy="4" r="2"></circle>
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-links-section">
          <div className="footer-section">
            <h3>Links</h3>
            <ul>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/events">Events</Link>
              </li>
              <li>
                <Link href="/schedule">Schedule</Link>
              </li>
              <li>
                <Link href="/sponsors">Sponsors</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Resources</h3>
            <ul>
              <li>
                <Link href="/faqs">FAQs</Link>
              </li>
              <li>
                <Link href="/gallery">Gallery</Link>
              </li>
              <li>
                <Link href="/register">Register</Link>
              </li>
              <li>
                <Link href="/code-of-conduct">Code of Conduct</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contact</h3>
            <ul className="contact-list">
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <a href="mailto:triverse@bennett.edu.in">
                  triverse@bennett.edu.in
                </a>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <a href="tel:+918318794187">+91 8318794187 <br /> Parth Shukla (Chairperson)</a>
                
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <a href="tel:+918287589908">+91 8287589908 <br />Vrinda Gupta <br />(Vice Chairperson)</a>
                
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>Bennett University, Greater Noida, UP 201310</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-newsletter">
          <h3>Subscribe to our Newsletter</h3>
          <p>
            Stay updated with the latest news and announcements about Triverse.
          </p>
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                required
              />
              <button
                type="submit"
                className={`submit-button ${isSubmitting ? "submitting" : ""}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Subscribe"}
              </button>
            </div>
            {submitStatus === "success" && (
              <div className="status-message success">
                Thank you for subscribing!
              </div>
            )}
            {submitStatus === "error" && (
              <div className="status-message error">
                Something went wrong. Please try again.
              </div>
            )}
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <div className="footer-copyright">
            <p>
              &copy; {new Date().getFullYear()} Triverse | Bennett University. All
              rights reserved.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .site-footer {
          background: rgba(10, 10, 30, 0.95);
          position: relative;
          z-index: 10;
          padding: 0;
          margin-top: 6rem;
        }

        .footer-separator {
          position: relative;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(146, 93, 161, 0.1),
            rgba(234, 142, 234, 0.5),
            rgba(146, 93, 161, 0.1)
          );
          margin-bottom: 4rem;
          box-shadow: 0 0 8px rgba(234, 142, 234, 0.3);
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem 3rem;
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 3rem;
        }

        .footer-logo-section {
          grid-column: span 3;
        }

        .footer-links-section {
          grid-column: span 5;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .footer-newsletter {
          grid-column: span 4;
        }

        .footer-logo {
          width: 180px;
          margin-bottom: 1.5rem;
        }

        .footer-logo img {
          width: 100%;
          height: auto;
          filter: brightness(1.1);
        }

        .footer-description {
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 1.5rem;
          line-height: 1.6;
          font-size: 0.95rem;
        }

        .footer-section h3 {
          color: #ea8eea;
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 1.2rem;
          position: relative;
          padding-bottom: 0.5rem;
        }

        .footer-section h3::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 40px;
          height: 2px;
          background: linear-gradient(90deg, #d4c499, #925da1);
          border-radius: 1px;
        }

        .footer-section ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-section ul li {
          margin-bottom: 0.8rem;
        }

        .footer-section ul li a {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          transition: all 0.3s ease;
          font-size: 0.95rem;
          display: inline-block;
        }

        .footer-section ul li a:hover {
          color: #ea8eea;
          transform: translateX(3px);
        }

        .contact-list li {
          display: flex;
          align-items: flex-start;
          gap: 0.8rem;
          margin-bottom: 1rem;
        }

        .contact-list svg {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
          color: #ea8eea;
          margin-top: 3px;
        }

        .contact-list a,
        .contact-list span {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          transition: all 0.3s ease;
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .contact-list a:hover {
          color: #ea8eea;
        }

        .social-icons {
          display: flex;
          gap: 1rem;
          margin-top: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .social-icons a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.9);
          transition: all 0.3s ease;
        }

        .social-icons a:hover {
          background: rgba(234, 142, 234, 0.25);
          transform: translateY(-3px);
          color: white;
          box-shadow: 0 5px 15px rgba(234, 142, 234, 0.2);
        }

        .social-icons svg {
          width: 18px;
          height: 18px;
        }

        .footer-newsletter h3 {
          color: #ea8eea;
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 1.2rem;
          position: relative;
          padding-bottom: 0.5rem;
        }

        .footer-newsletter h3::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 40px;
          height: 2px;
          background: linear-gradient(90deg, #d4c499, #925da1);
          border-radius: 1px;
        }

        .footer-newsletter p {
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 1.5rem;
          line-height: 1.6;
          font-size: 0.95rem;
        }

        .newsletter-form {
          margin-top: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-group input {
          width: 100%;
          padding: 0.8rem 1rem;
          border-radius: 0.5rem;
          border: 1px solid rgba(146, 93, 161, 0.3);
          background: rgba(10, 10, 20, 0.3);
          color: white;
          font-size: 0.95rem;
          transition: all 0.3s ease;
        }

        .form-group input:focus {
          outline: none;
          border-color: #ea8eea;
          box-shadow: 0 0 0 2px rgba(234, 142, 234, 0.2);
          background: rgba(30, 30, 60, 0.3);
        }

        .submit-button {
          background: linear-gradient(90deg, #d4c499, #925da1);
          color: white;
          border: none;
          padding: 0.8rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
          text-align: center;
        }

        .submit-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(146, 93, 161, 0.4);
        }

        .submit-button:active {
          transform: translateY(-1px);
        }

        .submit-button.submitting {
          background: #666;
          cursor: not-allowed;
          opacity: 0.7;
        }

        .status-message {
          margin-top: 1rem;
          padding: 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.9rem;
          text-align: center;
        }

        .status-message.success {
          background: rgba(72, 187, 120, 0.2);
          color: #48bb78;
        }

        .status-message.error {
          background: rgba(245, 101, 101, 0.2);
          color: #f56565;
        }

        .footer-bottom {
          position: relative;
          padding: 2rem 0 1.5rem;
        }

        .footer-bottom::before {
          content: "";
          position: absolute;
          top: 0;
          left: 10%;
          right: 10%;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(146, 93, 161, 0),
            rgba(146, 93, 161, 0.4),
            rgba(146, 93, 161, 0)
          );
        }

        .footer-bottom-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          text-align: left;
        }
        
        .footer-copyright p {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
          margin: 0;
        }

        .heart {
          color: #ea8eea;
          display: inline-block;
          animation: heartbeat 1.5s ease infinite;
        }

        .creator-credits {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 2.5rem;
          width: 100%;
          background: rgba(15, 15, 30, 0.4);
          border-radius: 15px;
          padding: 2rem 1rem;
          border: 1px solid rgba(146, 93, 161, 0.2);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        .creator-title {
          color: #ea8eea;
          font-size: 1.2rem;
          font-weight: 600;
          margin: 0 0 1.8rem 0;
          text-align: center;
          position: relative;
          padding-bottom: 0.5rem;
        }
        
        .creator-title::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 50px;
          height: 2px;
          background: linear-gradient(90deg, #d4c499, #925da1);
          border-radius: 1px;
        }
        
        .team-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          justify-content: center;
          width: 100%;
          max-width: 700px;
        }
        
        .team-member {
          display: flex;
          justify-content: center;
          perspective: 1000px;
        }
        
        .team-member a {
          text-decoration: none;
          display: block;
          width: 100%;
        }
        
        .team-card {
          width: 100%;
          height: 140px;
          position: relative;
        }
        
        .team-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform-style: preserve-3d;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
        }
        
        .team-member:hover .team-card-inner {
          transform: rotateY(180deg);
        }
        
        .team-card-front, .team-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          background: rgba(25, 25, 45, 0.4);
          border: 1px solid rgba(146, 93, 161, 0.3);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          padding: 1rem;
          overflow: hidden;
        }
        
        .team-card-front::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, rgba(146, 93, 161, 0.1), rgba(30, 30, 60, 0.1));
          z-index: -1;
        }
        
        .team-card-back {
          transform: rotateY(180deg);
          background: rgba(35, 35, 70, 0.7);
        }
        
        .team-photo {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(146, 93, 161, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid rgba(234, 142, 234, 0.5);
          overflow: hidden;
          transition: all 0.3s ease;
          margin-bottom: 0.9rem;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        
        .team-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .team-member:hover .team-photo img {
          transform: scale(1.1);
        }
        
        .team-name {
          color: #ffffff;
          font-size: 0.95rem;
          font-weight: 500;
          text-align: center;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
          letter-spacing: 0.02em;
        }
        
        .team-socials {
          display: flex;
          justify-content: center;
          gap: 1.2rem;
          width: 100%;
        }
        
        .team-socials a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(146, 93, 161, 0.3);
          transition: all 0.3s ease;
        }
        
        .team-socials a:hover {
          background: rgba(234, 142, 234, 0.5);
          transform: translateY(-5px);
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
        }
        
        .team-socials svg {
          width: 22px;
          height: 22px;
          color: rgba(255, 255, 255, 0.95);
        }

        @keyframes heartbeat {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        @media (max-width: 1024px) {
          .footer-content {
            grid-template-columns: repeat(2, 1fr);
          }

          .footer-logo-section {
            grid-column: span 1;
          }

          .footer-links-section {
            grid-column: span 1;
          }

          .footer-newsletter {
            grid-column: span 2;
            margin-top: 2rem;
          }
          
          .team-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 1rem;
            max-width: 600px;
          }
          
          .team-card {
            height: 130px;
          }
          
          .team-photo {
            width: 70px;
            height: 70px;
          }
          
          .creator-credits {
            padding: 1.5rem 1rem;
          }
        }

        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding-bottom: 2rem;
          }

          .footer-logo-section,
          .footer-links-section,
          .footer-newsletter {
            grid-column: span 1;
          }

          .footer-links-section {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
          }
          
          .creator-credits {
            margin-top: 1.5rem;
            margin-bottom: 2.5rem;
            padding: 1.5rem 0.8rem;
          }

          .team-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
            max-width: 450px;
          }
          
          .team-card {
            height: 140px;
          }
          
          .team-photo {
            width: 75px;
            height: 75px;
          }
          
          .team-name {
            font-size: 0.9rem;
          }
        }

        @media (max-width: 480px) {
          .footer-separator {
            margin-bottom: 2rem;
          }

          .footer-links-section {
            grid-template-columns: 1fr;
          }

          .form-group {
            flex-direction: column;
          }
          
          .footer-bottom {
            padding: 1.5rem 0 1rem;
          }
          
          .team-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
            max-width: 320px;
          }
          
          .team-card {
            height: 125px;
          }
          
          .team-photo {
            width: 60px;
            height: 60px;
            margin-bottom: 0.6rem;
          }
          
          .team-name {
            font-size: 0.85rem;
          }
          
          .team-socials a {
            width: 42px;
            height: 42px;
          }
          
          .team-socials svg {
            width: 20px;
            height: 20px;
          }
          
          .creator-credits {
            padding: 1.2rem 0.5rem;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
