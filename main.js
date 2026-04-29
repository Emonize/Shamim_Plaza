import './src/styles/main.css'
import { createIcons, Gem, Store, Building2, BedDouble, ShieldCheck, ArrowUpDown, Car, Zap, MessageCircle, Mail, MapPin, Phone, Home } from 'lucide';

// Initialize Icons
createIcons({
  icons: {
    Gem,
    Store,
    Building2,
    BedDouble,
    ShieldCheck,
    ArrowUpDown,
    Car,
    Zap,
    MessageCircle,
    Mail,
    MapPin,
    Phone,
    Home
  }
});

// Scroll Reveal Observer
const revealElements = document.querySelectorAll('.reveal');

const revealOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, revealOptions);

revealElements.forEach(el => {
  revealOnScroll.observe(el);
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && closeMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', (e) => {
    e.preventDefault();
    mobileMenu.classList.add('open');
  });
  
  closeMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });

  // Close menu when clicking a link
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  });
}

// Parallax Effect for Hero
const heroBg = document.getElementById('hero-parallax');
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  const scrollPosition = window.pageYOffset;
  
  // Apply parallax transform
  // The slower movement factor (e.g. 0.4) creates the parallax depth
  if (scrollPosition < window.innerHeight) {
    heroBg.style.transform = `translateY(${scrollPosition * 0.4}px)`;
  }
  
  // Sticky header background
  if (scrollPosition > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});
