import React, { useState } from 'react';
import { CarFront, Droplets, ShieldCheck, MapPin, Phone, CalendarDays, UserRound, Sparkles, Menu, MessageCircle } from 'lucide-react';

const OWNER_WHATSAPP = '27824398434';

export default function App() {
  const [form, setForm] = useState({
    name: '', location: '', car: '', service: 'Full car wash', date: ''
  });

  const update = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const submitBooking = (event) => {
    event.preventDefault();
    const message = [
      'Hello Bhekifas Mobile Car Wash! I would like to request a quote / book a service.',
      '',
      `Name: ${form.name}`,
      `Location: ${form.location}`,
      `Type of car: ${form.car}`,
      `Service required: ${form.service}`,
      `Preferred date: ${form.date || 'Not specified'}`,
    ].join('\n');

    window.open(`https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <main>
      <header className="navbar">
        <a className="brand" href="#home" aria-label="Bhekifas Mobile Car Wash home">
          <span className="brand-icon"><CarFront size={35} /></span>
          <span><strong>BHEKIFAS</strong><small>MOBILE CAR WASH</small></span>
        </a>
        <nav>
          <a href="#home">Home</a>
          <a href="#services">Our Services</a>
          <a href="#booking">Book Now</a>
        </nav>
        <a className="nav-phone" href="tel:+27824398434"><Phone size={18} /> 082 439 8434</a>
      </header>

      <section className="hero" id="home">
        <div className="hero-bg" />
        <div className="hero-shade" />
        <div className="hero-content">
          <div className="intro">
            <p className="eyebrow"><span /> MOBILE CAR WASH • WE COME TO YOU</p>
            <h1>BHEKIFAS <em>MOBILE CAR WASH</em></h1>
            <h2>We bring the car wash to you!</h2>
            <p className="description">Professional mobile car wash services at your convenience. We come to your location and make your vehicle shine.</p>
            <div className="features" id="services">
              <div><Droplets /><strong>Spotless<br />clean</strong></div>
              <div><ShieldCheck /><strong>Reliable<br />service</strong></div>
              <div><Sparkles /><strong>Fresh, shiny<br />finish</strong></div>
            </div>
            <a className="cta" href="#booking"><CalendarDays size={19} /> Get a quote & book now</a>
          </div>

          <section className="booking-card" id="booking">
            <div className="form-heading">
              <CalendarDays size={27} />
              <div><h3>Get a Quote & Book</h3><p>Tell us a little about your vehicle.</p></div>
            </div>
            <form onSubmit={submitBooking}>
              <label htmlFor="name">Full name</label>
              <div className="field"><UserRound size={18} /><input id="name" name="name" value={form.name} onChange={update} placeholder="Enter your full name" required /></div>

              <label htmlFor="location">Location</label>
              <div className="field"><MapPin size={18} /><input id="location" name="location" value={form.location} onChange={update} placeholder="Where should we come?" required /></div>

              <label htmlFor="car">Type of car</label>
              <div className="field"><CarFront size={18} /><input id="car" name="car" value={form.car} onChange={update} placeholder="e.g. VW Polo, Toyota Corolla" required /></div>

              <label htmlFor="service">Service required</label>
              <select id="service" name="service" value={form.service} onChange={update}>
                <option>Full car wash</option>
                <option>Exterior wash</option>
                <option>Interior cleaning</option>
                <option>Other / Not sure</option>
              </select>

              <label htmlFor="date">Preferred date <span className="optional">(optional)</span></label>
              <div className="field"><CalendarDays size={18} /><input id="date" type="date" name="date" value={form.date} onChange={update} min={new Date().toISOString().split('T')[0]} /></div>

              <button className="submit" type="submit"><MessageCircle size={19} /> Submit booking on WhatsApp</button>
              <p className="form-note">Your details will be sent to the owner via WhatsApp.</p>
            </form>
          </section>
        </div>
      </section>

      <footer>
        <a href="tel:+27824398434"><Phone size={18} /> 082 439 8434</a>
        <span className="footer-divider" />
        <span><MapPin size={18} /> Mobile service — we come to you!</span>
        <span className="tagline">Cleaner cars. Happier drives.</span>
      </footer>
    </main>
  );
}
