
import { useState } from "react";
import {
  ArrowRight,
  MapPin,
  Compass,
  Menu,
  X,
  Plane,
  CalendarDays,
  Wallet,
  Luggage,
  Sparkles,
  Globe2,
  Check,
  XCircle,
  ShieldCheck,
  Headphones,
  Clock,
  ChevronDown,
  Star,
  Zap,
} from "lucide-react";

import TripPlanner from "./tripPlanner";
import "./App.css";

// 20 BEAUTIFUL TRAVEL DESTINATIONS
const destinationPhotos = [
  {
    name: "Santorini, Greece",
    description: "Discover the beauty of the Greek islands.",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1400&q=90",
  },
  {
    name: "Bali, Indonesia",
    description: "Experience a tropical paradise.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1400&q=90",
  },
  {
    name: "Maldives",
    description: "Escape to crystal-clear waters.",
    image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1400&q=90",
  },
  {
    name: "Paris, France",
    description: "Fall in love with the city of lights.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1400&q=90",
  },
  {
    name: "Venice, Italy",
    description: "Explore the charm of romantic Venice.",
    image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1400&q=90",
  },
  {
    name: "Swiss Alps, Switzerland",
    description: "Discover breathtaking mountain views.",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1400&q=90",
  },
  {
    name: "Dubai, UAE",
    description: "Experience luxury and modern architecture.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=90",
  },
  {
    name: "Tokyo, Japan",
    description: "Experience the energy of modern Japan.",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1400&q=90",
  },
  {
    name: "New York, USA",
    description: "Explore the city that never sleeps.",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1400&q=90",
  },
  {
    name: "London, England",
    description: "Discover history and city life.",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1400&q=90",
  },
  {
    name: "Kyoto, Japan",
    description: "Find peace among traditional temples.",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1400&q=90",
  },
  {
    name: "Amalfi Coast, Italy",
    description: "Enjoy colourful villages by the sea.",
    image: "https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?auto=format&fit=crop&w=1400&q=90",
  },
  {
    name: "Iceland",
    description: "Discover dramatic landscapes and waterfalls.",
    image: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&w=1400&q=90",
  },
  {
    name: "Prague, Czech Republic",
    description: "Walk through beautiful historic streets.",
    image: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=1400&q=90",
  },
  {
    name: "Rio de Janeiro, Brazil",
    description: "Enjoy beaches and vibrant city life.",
    image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1400&q=90",
  },
  {
    name: "Machu Picchu, Peru",
    description: "Explore an unforgettable mountain wonder.",
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1400&q=90",
  },
  {
    name: "Thailand",
    description: "Discover tropical beaches and culture.",
    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1400&q=90",
  },
  {
    name: "Cape Town, South Africa",
    description: "Discover spectacular coastal scenery.",
    image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1400&q=90",
  },
  {
    name: "Lake Bled, Slovenia",
    description: "Enjoy a peaceful lakeside escape.",
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=90",
  },
  {
    name: "Moraine Lake, Canada",
    description: "Experience beautiful turquoise mountain lakes.",
    image: "https://images.unsplash.com/photo-1503614472-8c93d56cd9b6?auto=format&fit=crop&w=1400&q=90",
  },
];

// SELECT TWO DIFFERENT DESTINATIONS ON EVERY VISIT
function getRandomDestinations() {
  let previous = [];

  try {
    previous = JSON.parse(
      localStorage.getItem("bookmyjourneyLastDestinations") || "[]"
    );
  } catch {
    previous = [];
  }

  const availableForHero = destinationPhotos
    .map((_, index) => index)
    .filter((index) => index !== previous[0]);

  const heroIndex =
    availableForHero[
      Math.floor(Math.random() * availableForHero.length)
    ];

  const availableForAbout = destinationPhotos
    .map((_, index) => index)
    .filter(
      (index) =>
        index !== heroIndex &&
        index !== previous[1]
    );

  const aboutIndex =
    availableForAbout[
      Math.floor(Math.random() * availableForAbout.length)
    ];

  try {
    localStorage.setItem(
      "bookmyjourneyLastDestinations",
      JSON.stringify([heroIndex, aboutIndex])
    );
  } catch {
    // Continue normally if browser storage is unavailable.
  }

  return {
    hero: destinationPhotos[heroIndex],
    about: destinationPhotos[aboutIndex],
  };
}

// CONTACT FORM COMPONENT
function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSuccess(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSuccess(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h3>Send us a message</h3>

      <label htmlFor="contact-name">Your Name</label>
      <input
        id="contact-name"
        type="text"
        name="name"
        placeholder="Enter your name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label htmlFor="contact-email">Email Address</label>
      <input
        id="contact-email"
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <label htmlFor="contact-subject">Subject</label>
      <input
        id="contact-subject"
        type="text"
        name="subject"
        placeholder="What is this about?"
        value={formData.subject}
        onChange={handleChange}
        required
      />

      <label htmlFor="contact-message">Message</label>
      <textarea
        id="contact-message"
        name="message"
        placeholder="Write your message here..."
        rows="5"
        value={formData.message}
        onChange={handleChange}
        required
      />

      <button type="submit" className="primary-button">
        Send Message <ArrowRight size={17} />
      </button>

      {success && (
        <p className="success-message" role="status">
          ✓ Your message has been submitted successfully!
        </p>
      )}
    </form>
  );
}

// PRICING PLAN COMPONENT
function PricingCard({
  name,
  description,
  price,
  period,
  features,
  popular,
  buttonText,
  free,
}) {
  return (
    <div className={`price-card ${popular ? "featured-price" : ""}`}>
      {popular && (
        <span className="popular-tag">
          <Star size={13} fill="currentColor" />
          MOST POPULAR
        </span>
      )}

      <div className="pricing-plan-icon">
        {popular ? <Zap size={22} /> : <Compass size={22} />}
      </div>

      <h3>{name}</h3>

      <div className="pricing-price">
        <h2>{price}</h2>
        {period && <span>{period}</span>}
      </div>

      <p className="pricing-description">{description}</p>

      <a
        href="#planner"
        className={popular ? "primary-button" : "secondary-button"}
      >
        {buttonText} <ArrowRight size={16} />
      </a>

      <div className="pricing-divider"></div>

      <h4>What's included</h4>

      <ul className="pricing-feature-list">
        {features.map((feature, index) => (
          <li key={index}>
            <span className="feature-check">
              <Check size={15} />
            </span>
            {feature}
          </li>
        ))}
      </ul>

      {free && (
        <span className="pricing-note">
          Free forever. No credit card required.
        </span>
      )}
    </div>
  );
}

// PRICING COMPARISON COMPONENT
function PricingComparison() {
  const comparison = [
    ["Trip planning", "Basic", "Advanced"],
    ["Day-wise itinerary", "3 days", "Unlimited"],
    ["Travel budget calculator", true, true],
    ["Multiple travellers", "2 travellers", "Unlimited"],
    ["Activity management", "Basic", "Advanced"],
    ["Packing checklist", false, true],
    ["Trip organization", "Basic", "Advanced"],
    ["Priority support", false, true],
  ];

  const renderValue = (value) => {
    if (value === true) {
      return (
        <span className="comparison-yes">
          <Check size={17} />
          Included
        </span>
      );
    }

    if (value === false) {
      return (
        <span className="comparison-no">
          <XCircle size={16} />
          Not included
        </span>
      );
    }

    return value;
  };

  return (
    <div className="comparison-wrapper">
      <div className="comparison-heading">
        <span className="section-label">COMPARE PLANS</span>
        <h3>Find the right plan for your journey.</h3>
        <p>
          See what each BookMyJourney plan offers before choosing.
        </p>
      </div>

      <div className="comparison-table-container">
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Features</th>
              <th>Explorer</th>
              <th>Adventurer</th>
            </tr>
          </thead>

          <tbody>
            {comparison.map((row, index) => (
              <tr key={index}>
                <td>{row[0]}</td>
                <td>{renderValue(row[1])}</td>
                <td>{renderValue(row[2])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// PRICING FAQ COMPONENT
function PricingFAQ() {
  const questions = [
    {
      question: "Can I use BookMyJourney for free?",
      answer:
        "Yes! The Explorer plan is free and gives you access to basic trip planning, itinerary creation and budget estimation.",
    },
    {
      question: "What is included in the Adventurer plan?",
      answer:
        "Adventurer includes advanced itinerary planning, unlimited trip days, a packing checklist, expanded trip organization and priority support.",
    },
    {
      question: "Can I change my plan later?",
      answer:
        "You can choose the plan that suits your travel needs. The pricing section currently demonstrates the available plan options.",
    },
    {
      question: "Do I need a credit card for the free plan?",
      answer:
        "No. You can start with the Explorer plan without entering any payment information.",
    },
    {
      question: "Are payments currently enabled?",
      answer:
        "The pricing page is currently a front-end demonstration. Online payments and subscription management have not yet been connected.",
    },
  ];

  return (
    <div className="pricing-faq">
      <div className="comparison-heading">
        <span className="section-label">GOT QUESTIONS?</span>
        <h3>Frequently asked questions.</h3>
        <p>Everything you need to know before getting started.</p>
      </div>

      <div className="faq-list">
        {questions.map((item, index) => (
          <details className="faq-item" key={index}>
            <summary>
              {item.question}
              <ChevronDown size={19} />
            </summary>

            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

// MAIN APP COMPONENT
function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [billing, setBilling] = useState("monthly");

  // TWO DIFFERENT PHOTOS FOR THE WEBSITE
  const [destinations] = useState(() => getRandomDestinations());

  const closeMenu = () => setMenuOpen(false);

  const adventurerPrice =
    billing === "monthly" ? "₹299" : "₹2,990";

  const adventurerPeriod =
    billing === "monthly" ? "/ month" : "/ year";

  const explorerFeatures = [
    "Basic trip planner",
    "Up to 3 itinerary days",
    "Travel budget calculator",
    "Up to 2 travellers",
    "Basic activity management",
    "Organize your trip details",
  ];

  const adventurerFeatures = [
    "Everything in Explorer",
    "Unlimited itinerary days",
    "Advanced budget planning",
    "Unlimited travellers",
    "Advanced activity management",
    "Packing checklist",
    "Priority support",
  ];

  return (
    <div className="app">

      {/* NAVIGATION */}
      <nav className="navbar">
        <a href="#home" className="brand" onClick={closeMenu}>
          <img
            src="/bookmyjourney-logo.svg"
            alt="BookMyJourney - Discover. Book. Explore."
            className="brand-logo"
          />
        </a>

        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <a href="#home" onClick={closeMenu}>Home</a>
          <a href="#features" onClick={closeMenu}>Features</a>
          <a href="#planner" onClick={closeMenu}>Planner</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#pricing" onClick={closeMenu}>Pricing</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </div>

        <a href="#planner" className="nav-button">
          Get Started <ArrowRight size={16} />
        </a>

        <button
          className="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <main>

        {/* HERO SECTION */}
        <section className="hero" id="home">
          <div className="hero-content">

            <div className="announcement">
              <Sparkles size={15} />
              Welcome to BookMyJourney — your journey starts here!
            </div>

            <h1>
              Discover more.
              <br />
              Travel better.
              <br />
              <span>Live the journey.</span>
            </h1>

            <p>
              Plan unforgettable trips without the stress.
              Organize destinations, create itineraries and
              manage your travel budget — all in one place.
            </p>

            <div className="hero-actions">
              <a href="#planner" className="primary-button">
                Start Planning <ArrowRight size={18} />
              </a>

              <a href="#features" className="secondary-button">
                Explore Features
              </a>
            </div>

            <div className="hero-note">
              <Globe2 size={17} />
              Your journey, perfectly organized.
            </div>

          </div>

          <div className="hero-visual">
            <div
              className="travel-image"
              style={{
                backgroundImage: `url("${destinations.hero.image}")`,
              }}
            >
              <div className="image-overlay">

                <span className="destination-tag">
                  <MapPin size={14} />
                  Featured Destination
                </span>

                <div className="destination-info">
                  <span>EXPLORE THE WORLD</span>
                  <h2>{destinations.hero.name}</h2>
                  <p>{destinations.hero.description}</p>
                </div>

              </div>
            </div>

            <div className="floating-card trip-card">
              <div className="floating-icon">
                <CalendarDays size={20} />
              </div>
              <div>
                <strong>5 Days Trip</strong>
                <span>Your next adventure</span>
              </div>
            </div>

            <div className="floating-card budget-card">
              <div className="floating-icon budget-icon">
                <Wallet size={20} />
              </div>
              <div>
                <strong>Budget Ready</strong>
                <span>Plan your expenses</span>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="features-section" id="features">
          <div className="section-heading">
            <span className="section-label">WHY BOOKMYJOURNEY?</span>

            <h2>Everything you need for a better journey.</h2>

            <p>
              From your first destination idea to your final travel day,
              keep everything organized in one place.
            </p>
          </div>

          <div className="feature-grid">

            <div className="feature-card">
              <div className="feature-icon">
                <MapPin />
              </div>
              <h3>Discover Places</h3>
              <p>
                Explore destinations and organize the places you want to visit.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <CalendarDays />
              </div>
              <h3>Plan Itineraries</h3>
              <p>
                Arrange activities and create a simple day-by-day travel plan.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Wallet />
              </div>
              <h3>Manage Budget</h3>
              <p>
                Estimate travel expenses and keep your trip within budget.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Luggage />
              </div>
              <h3>Stay Organized</h3>
              <p>
                Keep your travel plans and important details together.
              </p>
            </div>

          </div>
        </section>

        {/* INTERACTIVE TRIP PLANNER */}
        <TripPlanner />

        {/* ABOUT SECTION */}
        <section className="about-section" id="about">
          <div className="about-content">
            <span className="section-label">ABOUT BOOKMYJOURNEY</span>

            <h2>
              Less planning stress. More unforgettable moments.
            </h2>

            <p>
              BookMyJourney brings your travel planning into one simple
              workspace. Choose your destination, organize your
              itinerary and estimate your budget before you go.
            </p>

            <a href="#planner" className="text-link">
              Start planning your trip <ArrowRight size={17} />
            </a>
          </div>

          {/* SECOND AUTOMATICALLY CHANGING PHOTO */}
          <div className="about-visual about-photo-visual">
            <img
              className="about-destination-photo"
              src={destinations.about.image}
              alt={`Beautiful destination: ${destinations.about.name}`}
              loading="eager"
            />

            <div className="about-photo-overlay"></div>

            <div className="about-decoration decoration-one"></div>
            <div className="about-decoration decoration-two"></div>

            <span className="about-photo-caption">
              <MapPin size={15} />
              {destinations.about.name.toUpperCase()}
            </span>
          </div>
        </section>

        {/* ENHANCED PRICING SECTION */}
        <section className="pricing-section" id="pricing">

          <div className="section-heading">
            <span className="section-label">SIMPLE & TRANSPARENT PRICING</span>

            <h2>Choose your way to explore.</h2>

            <p>
              Start for free and upgrade whenever your travel plans grow.
              No complicated pricing.
            </p>
          </div>

          {/* BILLING TOGGLE */}
          <div className="billing-selector">
            <button
              className={billing === "monthly" ? "billing-option active" : "billing-option"}
              onClick={() => setBilling("monthly")}
              type="button"
              aria-pressed={billing === "monthly"}
            >
              Monthly
            </button>

            <button
              className={billing === "yearly" ? "billing-option active" : "billing-option"}
              onClick={() => setBilling("yearly")}
              type="button"
              aria-pressed={billing === "yearly"}
            >
              Yearly
              <span className="billing-save">Save 17%</span>
            </button>
          </div>

          {/* PRICING CARDS */}
          <div className="pricing-preview">

            <PricingCard
              name="Explorer"
              description="Everything you need to begin organizing your next adventure."
              price="Free"
              features={explorerFeatures}
              buttonText="Start for Free"
              free
            />

            <PricingCard
              name="Adventurer"
              description="More flexibility and powerful tools for frequent travellers."
              price={adventurerPrice}
              period={adventurerPeriod}
              features={adventurerFeatures}
              buttonText="Choose Adventurer"
              popular
            />

          </div>

          {/* PRICING TRUST POINTS */}
          <div className="pricing-trust">
            <div>
              <ShieldCheck size={19} />
              <span>Transparent pricing</span>
            </div>

            <div>
              <Clock size={19} />
              <span>Start in minutes</span>
            </div>

            <div>
              <Headphones size={19} />
              <span>Travel support</span>
            </div>
          </div>

          {/* COMPARISON TABLE */}
          <PricingComparison />

          {/* PRICING FAQ */}
          <PricingFAQ />

          {/* PRICING CTA */}
          <div className="pricing-cta">
            <div className="pricing-cta-icon">
              <Plane size={30} />
            </div>

            <div className="pricing-cta-content">
              <span>YOUR NEXT ADVENTURE AWAITS</span>
              <h3>Great journeys start with great planning.</h3>
              <p>
                Build your itinerary, organize your budget and make
                your next trip memorable with BookMyJourney.
              </p>
            </div>

            <a href="#planner" className="primary-button">
              Plan My Trip <ArrowRight size={17} />
            </a>
          </div>

        </section>

        {/* CONTACT SECTION */}
        <section className="contact-section" id="contact">
          <div className="contact-container">

            <div className="contact-info">
              <span className="section-label">LET'S CONNECT</span>

              <h2>Ready for your next adventure?</h2>

              <p>
                Have questions or suggestions? Send us a message.
                We'd love to hear from you.
              </p>

              <div className="contact-detail">
                <span>✉</span>
                <div>
                  <strong>Email</strong>
                  <p>hello@bookmyjourney.example</p>
                </div>
              </div>

              <div className="contact-detail">
                <span>✈</span>
                <div>
                  <strong>Our promise</strong>
                  <p>Making travel planning simpler and smarter.</p>
                </div>
              </div>
            </div>

            <ContactForm />

          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="footer">
        <a href="#home" className="brand">
          <img
            src="/bookmyjourney-logo.svg"
            alt="BookMyJourney - Discover. Book. Explore."
            className="brand-logo"
          />
        </a>

        <p>© 2026 BookMyJourney. Discover. Book. Explore.</p>

        <a href="#home" className="back-top">
          Back to top ↑
        </a>
      </footer>

    </div>
  );
}

export default App;
