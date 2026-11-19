import React, { useEffect, useRef, useState } from 'react';
import { CarFront, Droplets, ShieldCheck, MapPin, Phone, CalendarDays, UserRound, Sparkles, MessageCircle, ChevronLeft, ChevronRight, Navigation, Pencil } from 'lucide-react';

const OWNER_WHATSAPP = '27662264635';
const serviceImages = [
  '1.jpg',
  '2.jpg',
  '3.jpg',
  '4.jpg',
  '5.jpg',
  '6.jpg',
  '7.jpg',
  '8.jpg',
  '9.jpg',
  '10.jpg',
  '11.jpg',
];

export default function App() {
  const [activeImage, setActiveImage] = useState(0);
  const [form, setForm] = useState({
    name: '', location: '', car: '', service: 'Full car wash', date: ''
  });
  const [locationMode, setLocationMode] = useState('manual');
  const [locationCoords, setLocationCoords] = useState(null);
  const [locationStatus, setLocationStatus] = useState('Enter an address or choose a GPS option.');
  const locationWatchId = useRef(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % serviceImages.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  const update = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    if (event.target.name === 'location' && event.target.value.trim()) {
      setLocationStatus('');
    }
  };

  const showImage = (index) => {
    setActiveImage((index + serviceImages.length) % serviceImages.length);
  };

  const stopLocationWatch = () => {
    if (locationWatchId.current !== null && navigator.geolocation) {
      navigator.geolocation.clearWatch(locationWatchId.current);
      locationWatchId.current = null;
    }
  };

  useEffect(() => () => {
    if (locationWatchId.current !== null && navigator.geolocation) {
      navigator.geolocation.clearWatch(locationWatchId.current);
    }
  }, []);

  const chooseLocationMode = (mode) => {
    stopLocationWatch();
    setLocationMode(mode);
    setLocationCoords(null);
    setForm((current) => ({ ...current, location: '' }));

    if (mode === 'manual') {
      setLocationStatus('Enter an address, suburb, or landmark.');
      return;
    }

    if (!navigator.geolocation) {
      setLocationStatus('Location is not supported by this browser. Please enter your address manually.');
      return;
    }

    setLocationStatus('Requesting location permission...');
    const options = { enableHighAccuracy: true, maximumAge: mode === 'live' ? 0 : 60000, timeout: 15000 };
    const onSuccess = (position) => {
      const coords = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      setLocationCoords(coords);
      setForm((current) => ({
        ...current,
        location: `${coords.latitude.toFixed(6)}, ${coords.longitude.toFixed(6)}`,
      }));
      setLocationStatus(mode === 'live'
        ? 'Live location updates while this page stays open. Your booking sends the latest map pin.'
        : 'Current location captured. Your booking will include a map pin.');
    };
    const onError = (error) => {
      stopLocationWatch();
      if (error.code === 1) {
        setLocationStatus('Location permission was denied. Allow access in your browser or enter your address manually.');
      } else if (error.code === 3) {
        setLocationStatus('The location request timed out. Try again or enter your address manually.');
      } else {
        setLocationStatus('Your location could not be found. Try again or enter your address manually.');
      }
    };

    if (mode === 'live') {
      locationWatchId.current = navigator.geolocation.watchPosition(onSuccess, onError, options);
    } else {
      navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
    }
  };

  const submitBooking = (event) => {
    event.preventDefault();
    if (locationMode === 'manual' && !form.location.trim()) {
      setLocationStatus('Enter an address or landmark to continue.');
      return;
    }

    if (locationMode !== 'manual' && !locationCoords) {
      setLocationStatus('Wait for your location to be found, or enter your address manually.');
      return;
    }

    const locationDetails = locationCoords
      ? `${locationMode === 'live' ? 'Live' : 'Current'} location (${form.location})\nMap: https://www.google.com/maps?q=${locationCoords.latitude},${locationCoords.longitude}`
      : form.location.trim();
    const message = [
      'Hello Bhekifas Mobile Car Wash! I would like to quote and book a service.',
      '',
      `Name: ${form.name}`,
      `Location: ${locationDetails}`,
      `Type of car: ${form.car}`,
      `Service required: ${form.service}`,
      `Preferred date: ${form.date || 'Not specified'}`,
    ].join('\n');

    window.open(`https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <main>
      <header className="navbar">
        <a className="brand" href="#home" aria-label="BHEKIFAS Mobile Car Wash home">
          <span className="brand-icon"><CarFront size={35} /></span>
          <span><strong>BHEKIFAS</strong><small>MOBILE CAR WASH</small></span>
        </a>
        <nav>
          <a href="#home">Home</a>
          <a href="#services">Our Services</a>
          <a href="#booking">Book Now</a>
        </nav>
      </header>

      <section className="hero" id="home">
        <div className="hero-bg" />
        <div className="hero-shade" />
        <div className="hero-content">
          <div className="intro">
            <p className="eyebrow"><span /> MOBILE CAR WASH • WE COME TO YOU</p>
            <h1>BHEKIFAS <em>MOBILE CAR WASH</em></h1>
            <h2>We bring the car wash to you!</h2>
            <p className="description">Professional mobile car wash services, delivered to your doorstep! We bring our fully equipped mobile car wash setup directly to your location, making it easier than ever to keep your vehicle clean and shiny. With washes starting from R120, you can enjoy a convenient, hassle-free service without having to leave your home or workplace. </p>
            <div className="features">
              <div><Droplets /><strong>Spotless<br />clean</strong></div>
              <div><ShieldCheck /><strong>Reliable<br />service</strong></div>
              <div><Sparkles /><strong>Fresh and <br />shiny</strong></div>
            </div>
            <a className="cta" href="#booking"><CalendarDays size={19} /> Get a quote & book now</a>
          </div>
        </div>
      </section>

      <section className="services-gallery" id="services" aria-labelledby="services-title">
        <div className="services-heading">
          <p className="eyebrow"><span /> OUR SERVICES</p>
          <h2 id="services-title">A closer look at <em>what we do</em></h2>
          <p>Professional car care, brought right to your door.</p>
          <p>Our current focus is on making everyday vehicle care more convenient, accessible and affordable. Whether your vehicle needs a routine wash or simply a refresh to restore its clean, presentable look, we’re here to make the experience effortless.</p>
          <p>As we continue to grow, so will our range of services, with a commitment to delivering quality and convenience at every stage.</p>
        </div>
        <div className="service-carousel" aria-label="Our car wash services">
          <img
            key={serviceImages[activeImage]}
            className="service-image"
            src={`/images/ourservices/${serviceImages[activeImage]}`}
            alt={`Bezucal mobile car wash service ${activeImage + 1}`}
          />
          <button
            className="carousel-arrow carousel-previous"
            type="button"
            onClick={() => showImage(activeImage - 1)}
            aria-label="Show previous service photo"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="carousel-arrow carousel-next"
            type="button"
            onClick={() => showImage(activeImage + 1)}
            aria-label="Show next service photo"
          >
            <ChevronRight size={24} />
          </button>
          <div className="carousel-pagination" aria-label="Choose a service photo">
            {serviceImages.map((image, index) => (
              <button
                key={image}
                className={`carousel-dot${index === activeImage ? ' active' : ''}`}
                type="button"
                onClick={() => showImage(index)}
                aria-label={`Show service photo ${index + 1}`}
                aria-current={index === activeImage ? 'true' : undefined}
              />
            ))}
          </div>
          <span className="carousel-count">{activeImage + 1} / {serviceImages.length}</span>
        </div>
      </section>

      <section className="booking-section" id="booking" aria-labelledby="booking-title">
        <div className="booking-section-heading">
          <p className="eyebrow"><span /> BOOK YOUR SERVICE</p>
          <h2 id="booking-title">Ready for a <em>spotless car?</em></h2>
        </div>
        <div className="booking-card">
          <div className="form-heading">
            <CalendarDays size={27} />
            <div><h3>Get a Quote & Book</h3><p>Tell us a little about your vehicle.</p></div>
          </div>
          <form onSubmit={submitBooking}>
            <label htmlFor="name">Full name</label>
            <div className="field"><UserRound size={18} /><input id="name" name="name" value={form.name} onChange={update} placeholder="Enter your full name" required /></div>

            <span className="location-label">How should we find you?</span>
            <div className="location-options" role="group" aria-label="Choose a location method">
              <button className={locationMode === 'current' ? 'location-option active' : 'location-option'} type="button" onClick={() => chooseLocationMode('current')} aria-pressed={locationMode === 'current'}>
                <MapPin size={17} /> Current location
              </button>
              <button className={locationMode === 'live' ? 'location-option active' : 'location-option'} type="button" onClick={() => chooseLocationMode('live')} aria-pressed={locationMode === 'live'}>
                <Navigation size={17} /> Live location
              </button>
              <button className={locationMode === 'manual' ? 'location-option active' : 'location-option'} type="button" onClick={() => chooseLocationMode('manual')} aria-pressed={locationMode === 'manual'}>
                <Pencil size={17} /> Enter manually
              </button>
            </div>
            {locationMode === 'manual' ? (
              <>
                <label htmlFor="location">Address or landmark</label>
                <div className="field"><MapPin size={18} /><input id="location" name="location" value={form.location} onChange={update} placeholder="Street, suburb, or nearby landmark" required /></div>
                {locationStatus && <p className="location-help" aria-live="polite">{locationStatus}</p>}
              </>
            ) : (
              <div className="location-result" aria-live="polite">
                <p>{locationStatus}</p>
                {locationCoords && (
                  <a href={`https://www.google.com/maps?q=${locationCoords.latitude},${locationCoords.longitude}`} target="_blank" rel="noreferrer">
                    <MapPin size={15} /> {form.location} — view map
                  </a>
                )}
              </div>
            )}

            <label htmlFor="car">Type of car</label>
            <div className="field"><CarFront size={18} /><input id="car" name="car" value={form.car} onChange={update} placeholder="e.g. VW Polo, Toyota Corolla" required /></div>

            <label htmlFor="service">Service required</label>
            <select id="service" name="service" value={form.service} onChange={update}>
              <option>Full car wash</option>
              <option>Exterior wash only</option>
              <option>Interior cleaning only</option>
              <option>Other - Specify your desired service</option>
            </select>

            <label htmlFor="date">Preferred date <span className="optional">(optional)</span></label>
            <div className="field"><CalendarDays size={18} /><input id="date" type="date" name="date" value={form.date} onChange={update} min={new Date().toISOString().split('T')[0]} /></div>

            <button className="submit" type="submit"><MessageCircle size={19} /> Submit booking on WhatsApp</button>
            <p className="form-note">Your details will be sent via WhatsApp.</p>
          </form>
        </div>
      </section>

      <footer>
        <p className="tagline">Bhekifas mobile car wash is a subsidiary of Phefumlela Holdings. Currently managed by Bhekifa Mbuyane and the car wash started operating 18 October 2026.</p>
        <span className="footer-divider" />
        <span><MapPin size={18} /> Mobile service — we come to you!</span>
        <span className="tagline">Cleaner cars. Happier drives.</span>
      </footer>
    </main>
  );
}
