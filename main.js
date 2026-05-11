import './src/styles/main.css'
import { createIcons, Gem, Store, Building2, BedDouble, ShieldCheck, ArrowUpDown, Car, Zap, MessageCircle, Mail, MapPin, Phone, Home, Wifi, ArrowUpCircle, Wind, Maximize, ChevronDown, ChevronLeft, X, ExternalLink, Check, CheckCircle2, ChevronRight, Menu, PaintBucket, Play, XCircle, Camera, KeyRound, Droplets, Flame, Sparkles, Clock, Package, TreePine, Sun, Lock, Briefcase, PenTool, Scale, Monitor, Coffee, Utensils, Scissors, Activity, Globe, Star, GraduationCap, Dumbbell, ShoppingCart, Landmark, Plane, Palette } from 'lucide';
import { client, urlFor } from './src/sanityClient.js';

// Initialize Icons globally so we can call it again when injecting new HTML
window.refreshIcons = () => {
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
      Home,
      Wifi,
      ArrowUpCircle,
      Wind,
      Maximize,
      ChevronDown,
      ChevronLeft,
      X,
      ExternalLink,
      Check,
      CheckCircle2,
      ChevronRight,
      Menu,
      PaintBucket,
      Play,
      XCircle,
      Camera,
      KeyRound,
      Droplets,
      Flame,
      Sparkles,
      Clock,
      Package,
      TreePine,
      Sun,
      Lock,
      Briefcase,
      PenTool,
      Scale,
      Monitor,
      Coffee,
      Utensils,
      Scissors,
      Activity,
      Globe,
      Star,
      GraduationCap,
      Dumbbell,
      ShoppingCart,
      Landmark,
      Plane,
      Palette
    }
  });
};

window.refreshIcons();

// Scroll Reveal Observer
const revealElements = document.querySelectorAll('.reveal');

const revealOptions = {
  threshold: 0.05,
  rootMargin: '0px 0px 0px 0px'
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

// Mobile Menu Logic
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
}

// Mobile Portfolio Dropdown Toggle
const mobilePortfolioToggle = document.getElementById('mobile-portfolio-toggle');
const mobilePortfolioSub = document.getElementById('mobile-portfolio-sub');
const mobilePortfolioIcon = document.getElementById('mobile-portfolio-icon');

if (mobilePortfolioToggle && mobilePortfolioSub) {
  mobilePortfolioToggle.addEventListener('click', () => {
    const isExpanded = mobilePortfolioSub.style.display === 'flex' || mobilePortfolioSub.style.display === 'block';
    if (isExpanded) {
      mobilePortfolioSub.style.display = 'none';
      if (mobilePortfolioIcon) mobilePortfolioIcon.style.transform = 'rotate(0deg)';
    } else {
      mobilePortfolioSub.style.display = 'flex';
      mobilePortfolioSub.style.flexDirection = 'column';
      mobilePortfolioSub.style.gap = '15px';
      if (mobilePortfolioIcon) mobilePortfolioIcon.style.transform = 'rotate(180deg)';
    }
  });
}

// Close menu when clicking a link
if (mobileMenu) {
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
  if (heroBg && scrollPosition < window.innerHeight) {
    heroBg.style.transform = `translateY(${scrollPosition * 0.4}px)`;
  }
  
  // Sticky header background
  if (header) {
    if (scrollPosition > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
});

// ---- SANITY FETCHING LOGIC ---- //

async function fetchAndRenderAmenities() {
  const container = document.getElementById('amenities-container');
  if (!container) return;

  try {
    // Fetch amenities sorted by creation date (or you could add an order field)
    const amenities = await client.fetch('*[_type == "amenity" && isActive != false] | order(_createdAt asc)');
    
    // Clear container (in case there's placeholder content)
    container.innerHTML = '';
    
    amenities.forEach((amenity, index) => {
      const delayClass = index % 2 !== 0 ? 'reveal-delay-1' : '';
      const el = document.createElement('div');
      el.className = `amenity-item glass-panel reveal ${delayClass}`;
      el.style.padding = '30px 20px';
      el.style.textAlign = 'center';
      el.style.border = '1px solid rgba(255,255,255,0.05)';
      
      el.innerHTML = `
        <div class="amenity-icon"><i data-lucide="${amenity.iconName || 'check'}" style="width: 40px; height: 40px; color: var(--color-gold); margin-bottom: 16px;"></i></div>
        <h4 class="text-white" style="margin-bottom: 8px; font-size: 1.2rem;">${amenity.title}</h4>
        <p class="text-white-muted" style="font-size: 0.95rem; margin: 0;">${amenity.description}</p>
      `;
      
      container.appendChild(el);
      // Observe the new element for scroll reveal
      revealOnScroll.observe(el);
    });
    
    // Re-initialize lucide icons for the newly injected HTML
    window.refreshIcons();
  } catch (err) {
    console.error('Error fetching amenities:', err);
  }
}

// --- Lightbox Gallery Logic ---
window.currentLightboxImages = [];
window.currentLightboxIndex = 0;

window.openLightbox = function(images, index) {
  if (!images || images.length === 0) return;
  
  let modal = document.getElementById('lightbox-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'lightbox-modal';
    modal.className = 'lightbox-modal';
    modal.innerHTML = `
      <div class="lightbox-backdrop"></div>
      <button id="lightbox-close" class="lightbox-btn lightbox-close" aria-label="Close Gallery" style="font-size: 24px; font-weight: bold;">
        <i data-lucide="x" style="width: 28px; height: 28px;"></i>
      </button>
      <button id="lightbox-prev" class="lightbox-btn lightbox-nav lightbox-prev" aria-label="Previous Image">
        <i data-lucide="chevron-left"></i>
      </button>
      <button id="lightbox-next" class="lightbox-btn lightbox-nav lightbox-next" aria-label="Next Image">
        <i data-lucide="chevron-right"></i>
      </button>
      <div class="lightbox-content">
        <img id="lightbox-image" src="" alt="Gallery Image">
        <div id="lightbox-caption" class="lightbox-caption"></div>
      </div>
    `;
    document.body.appendChild(modal);
    if (window.lucide) {
      window.lucide.createIcons({ attrs: { class: "lucide" }, nameAttr: "data-lucide", root: modal });
    }
    
    document.getElementById('lightbox-close').addEventListener('click', window.closeLightbox);
    document.getElementById('lightbox-prev').addEventListener('click', () => window.navigateLightbox(-1));
    document.getElementById('lightbox-next').addEventListener('click', () => window.navigateLightbox(1));
    modal.querySelector('.lightbox-backdrop').addEventListener('click', window.closeLightbox);
  }

  const imgEl = document.getElementById('lightbox-image');
  const captionEl = document.getElementById('lightbox-caption');
  
  window.currentLightboxImages = images;
  window.currentLightboxIndex = index;
  
  const imgUrl = urlFor(images[index]).url();
  imgEl.src = imgUrl;
  captionEl.textContent = `Image ${index + 1} of ${images.length}`;
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closeLightbox = function() {
  const modal = document.getElementById('lightbox-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

window.navigateLightbox = function(direction) {
  if (window.currentLightboxImages.length === 0) return;
  
  window.currentLightboxIndex += direction;
  if (window.currentLightboxIndex < 0) window.currentLightboxIndex = window.currentLightboxImages.length - 1;
  if (window.currentLightboxIndex >= window.currentLightboxImages.length) window.currentLightboxIndex = 0;
  
  const imgEl = document.getElementById('lightbox-image');
  const captionEl = document.getElementById('lightbox-caption');
  
  imgEl.src = urlFor(window.currentLightboxImages[window.currentLightboxIndex]).url();
  captionEl.textContent = `Image ${window.currentLightboxIndex + 1} of ${window.currentLightboxImages.length}`;
};

// Lightbox Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  const backdrop = document.querySelector('.lightbox-backdrop');
  
  if (closeBtn) closeBtn.addEventListener('click', window.closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', () => window.navigateLightbox(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => window.navigateLightbox(1));
  if (backdrop) backdrop.addEventListener('click', window.closeLightbox);
  
  document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('lightbox-modal');
    if (modal && modal.classList.contains('active')) {
      if (e.key === 'Escape') window.closeLightbox();
      if (e.key === 'ArrowLeft') window.navigateLightbox(-1);
      if (e.key === 'ArrowRight') window.navigateLightbox(1);
    }
  });
});

window.openVideoModal = function(videoUrl) {
  let modal = document.getElementById('video-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'video-modal';
    modal.className = 'lightbox-modal';
    modal.innerHTML = `
      <div class="lightbox-backdrop" onclick="window.closeVideoModal()"></div>
      <button class="lightbox-btn lightbox-close" aria-label="Close Video" style="font-size: 24px; font-weight: bold;" onclick="window.closeVideoModal()">
        <i data-lucide="x" style="width: 28px; height: 28px;"></i>
      </button>
      <div class="lightbox-content" style="width: 90vw; max-width: 1000px;">
        <video id="video-modal-player" controls playsinline style="width: 100%; max-height: 85vh; border-radius: 4px; box-shadow: 0 20px 50px rgba(0,0,0,0.5); outline: none; background: #000;"></video>
      </div>
    `;
    document.body.appendChild(modal);
    if (window.lucide) {
      window.lucide.createIcons({ attrs: { class: "lucide" }, nameAttr: "data-lucide", root: modal });
    }
  }
  
  const videoEl = document.getElementById('video-modal-player');
  videoEl.src = videoUrl;
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  videoEl.play().catch(e => console.log('Autoplay prevented:', e));
};

window.closeVideoModal = function() {
  const modal = document.getElementById('video-modal');
  if (modal) {
    const videoEl = document.getElementById('video-modal-player');
    if (videoEl) {
      videoEl.pause();
      videoEl.src = '';
    }
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

async function fetchAndRenderProperties() {
  const furnishedContainer = document.getElementById('furnished-gallery');
  const unfurnishedContainer = document.getElementById('unfurnished-gallery');
  const officeContainer = document.getElementById('office-gallery');
  const retailContainer = document.getElementById('retail-gallery');
  
  if (!furnishedContainer && !unfurnishedContainer && !officeContainer && !retailContainer) return;

  try {
    const properties = await client.fetch('*[_type == "property"] | order(_createdAt asc) { ..., "videoUrl": videoFile.asset->url }');
    
    if (furnishedContainer) furnishedContainer.innerHTML = '';
    if (unfurnishedContainer) unfurnishedContainer.innerHTML = '';
    if (officeContainer) officeContainer.innerHTML = '';
    if (retailContainer) retailContainer.innerHTML = '';

    properties.forEach((prop, index) => {
      let containerId = `${prop.type}-gallery`;
      if (prop.type === 'residential') {
        containerId = prop.furnishedStatus === 'unfurnished' ? 'unfurnished-gallery' : 'furnished-gallery';
      }
      const targetContainer = document.getElementById(containerId);
      if (!targetContainer) return;

      const delayClass = index % 2 !== 0 ? 'reveal-delay-1' : '';
      const el = document.createElement('div');
      el.className = `property-card reveal ${delayClass}`;

      const statusColor = prop.status === 'available' ? 'var(--color-gold)' : 'var(--color-white-muted)';
      const imagesJson = prop.images ? encodeURIComponent(JSON.stringify(prop.images)).replace(/'/g, "%27") : '%5B%5D';
      
      let mediaItems = [];
      if (prop.videoUrl) {
        mediaItems.push({ type: 'video', url: prop.videoUrl });
      }
      if (prop.images && prop.images.length > 0) {
        prop.images.forEach((img, idx) => {
          if (img.asset) {
            mediaItems.push({ type: 'image', url: urlFor(img).width(800).height(450).url(), index: idx });
          }
        });
      }

      const displayItems = mediaItems.slice(0, 4);
      const remainingCount = mediaItems.length > 4 ? mediaItems.length - 4 : 0;
      const cardHeight = '250px';
      
      let imgHtml = '';

      if (displayItems.length === 0) {
         imgHtml = `<div style="height: ${cardHeight}; width: 100%; background: #1a1a1c; display: flex; align-items: center; justify-content: center; position: relative;">
             <div class="property-status-badge" style="color: ${statusColor}; border-color: ${statusColor}; left: 12px; right: auto; top: 12px;">${prop.status}</div>
             <span class="text-gold" style="opacity: 0.5;">No Media Available</span>
           </div>`;
      } else {
         let gridStyle = `height: ${cardHeight}; width: 100%;`;
         if (displayItems.length === 1) {
            gridStyle += ` display: block;`;
         } else if (displayItems.length === 2) {
            gridStyle += ` display: flex;`;
         } else if (displayItems.length === 3) {
            gridStyle += ` display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; gap: 2px;`;
         } else if (displayItems.length === 4) {
            gridStyle += ` display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; gap: 2px;`;
         }

         let innerHtml = displayItems.map((item, idx) => {
           let itemStyle = "position: relative; cursor: pointer; overflow: hidden; background: #000;";
           
           if (displayItems.length === 2) {
             itemStyle += ` flex: 1; border-right: ${idx === 0 ? '1px solid rgba(255,255,255,0.1)' : 'none'};`;
           } else if (displayItems.length === 3 && idx === 0) {
             itemStyle += " grid-row: 1 / span 2;";
           }
           
           let labelHtml = '';
           if (displayItems.length <= 2) {
             if (item.type === 'video') {
               labelHtml = `<div style="position: absolute; bottom: 8px; width: 100%; text-align: center; color: rgba(255,255,255,0.9); font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; text-shadow: 0 2px 4px rgba(0,0,0,0.8); z-index: 2;">Watch Video</div>`;
             } else if (item.type === 'image' && item.index === 0) {
               labelHtml = `<div style="position: absolute; bottom: 8px; width: 100%; text-align: center; color: rgba(255,255,255,0.9); font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; text-shadow: 0 2px 4px rgba(0,0,0,0.8); z-index: 2;">View Gallery</div>`;
             }
           }

           const overlayText = (idx === 3 && remainingCount > 0) ? `<div style="position: absolute; inset: 0; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem; font-weight: bold; backdrop-filter: blur(2px);">+${remainingCount}</div>` : '';

           if (item.type === 'video') {
             return `<div style="${itemStyle}" onclick="window.openVideoModal('${item.url}')">
                <video src="${item.url}" autoplay loop muted playsinline class="property-card-img" style="filter: brightness(0.85); object-fit: cover; width: 100%; height: 100%; background: #000;"></video>
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(0,0,0,0.5); border-radius: 50%; padding: ${displayItems.length>2?'6px':'8px'}; color: var(--color-gold); backdrop-filter: blur(4px); pointer-events: none;">
                  <i data-lucide="play" style="width: ${displayItems.length>2?'16px':'20px'}; height: ${displayItems.length>2?'16px':'20px'}; margin-left: 2px;"></i>
                </div>
                ${labelHtml}
                ${idx === 0 ? `<div class="property-status-badge" style="color: ${statusColor}; border-color: ${statusColor}; left: 12px; right: auto; top: 12px; z-index: 2;">${prop.status}</div>` : ''}
             </div>`;
           } else {
             return `<div style="${itemStyle}" onclick="window.openLightbox(JSON.parse(decodeURIComponent('${imagesJson}')), ${item.index})">
                <img src="${item.url}" class="property-card-img" style="filter: brightness(0.85);">
                ${labelHtml}
                ${overlayText}
                ${idx === 0 ? `<div class="property-status-badge" style="color: ${statusColor}; border-color: ${statusColor}; left: 12px; right: auto; top: 12px; z-index: 2;">${prop.status}</div>` : ''}
             </div>`;
           }
         }).join('');

         imgHtml = `<div style="${gridStyle}">${innerHtml}</div>`;
      }

      el.innerHTML = `
        ${imgHtml}
        <div class="property-card-content">
          <h3 class="property-card-title">${prop.title}</h3>
          <div class="property-card-meta">
            ${prop.size ? `<div class="property-card-meta-item"><i data-lucide="maximize" style="width:16px; height:16px;"></i> ${prop.size}</div>` : ''}
          </div>
          <p class="property-card-desc">${prop.description ? prop.description.substring(0, 150) + '...' : ''}</p>
          <div class="property-card-actions">
            <div class="property-price">${prop.price || 'Upon Request'}</div>
            <div style="display: flex; gap: 8px;">
              ${prop.airbnbLink ? `<button class="btn btn-primary" style="padding: 8px 16px; font-size: 0.85rem; background: #FF5A5F; border-color: #FF5A5F; color: white;" onclick="window.open('${prop.airbnbLink}', '_blank')"><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style="width: 14px; height: 14px; fill: currentColor; margin-right: 6px; vertical-align: middle;"><path d="M16 1.923c-8.231 0-14.538 6.554-14.538 14.785 0 8.231 6.308 14.785 14.538 14.785 8.231 0 14.538-6.554 14.538-14.785 0-8.231-6.308-14.785-14.538-14.785zm7.323 21.062c-1.354 0-2.615-.554-3.569-1.538l-.646-.708c-.738-.862-1.938-2.277-3.108-2.277-1.169 0-2.369 1.415-3.108 2.277l-.646.708c-.954.985-2.215 1.538-3.569 1.538-2.8 0-5.077-2.308-5.077-5.138 0-1.846.985-3.508 2.615-4.431l7.077-3.969c.862-.492 1.877-.492 2.738 0l7.077 3.969c1.631.923 2.615 2.585 2.615 4.431 0 2.831-2.277 5.138-5.077 5.138h-.323zM21.2 11.231a3.69 3.69 0 00-3.692-3.692c-2.031 0-3.692 1.662-3.692 3.692S12.169 18 14.2 18h7V11.231z"/></svg>Airbnb</button>` : ''}
              <button class="btn btn-ghost" style="padding: 8px 16px; font-size: 0.85rem;" onclick="window.location.href='/contact.html'">Inquire</button>
            </div>
          </div>
        </div>
      `;

      targetContainer.appendChild(el);
      revealOnScroll.observe(el);
    });
    
    window.refreshIcons();
  } catch (err) {
    console.error('Error fetching properties:', err);
  }
}

async function fetchAndRenderPromotions() {
  const carouselContainer = document.getElementById('promotions-carousel-container');
  if (!carouselContainer) return;

  try {
    const promotions = await client.fetch('*[_type == "promotion" && isActive == true] { ..., "videoUrl": videoFile.asset->url }');
    
    if (promotions.length === 0) {
      carouselContainer.innerHTML = '';
      return;
    }

    let carouselHtml = `
      <div style="text-align: center; margin-bottom: 40px;">
        <h2 class="text-gold" style="font-size: 2.5rem; font-family: 'Italiana', serif;">Featured Opportunities</h2>
        <div style="width: 60px; height: 2px; background: var(--color-gold); margin: 16px auto;"></div>
      </div>
      <div class="promo-carousel">
    `;

    promotions.forEach(promo => {
      const imgSrc = promo.image && promo.image.asset ? urlFor(promo.image).url() : '';
      
      if (promo.videoUrl) {
        // Video layout
        carouselHtml += `
          <div class="promo-slide">
            <div style="flex: 1 1 300px; min-height: 350px; position: relative; overflow: hidden; background: #000;">
              <video src="${promo.videoUrl}" controls playsinline style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;"></video>
            </div>
            <div style="flex: 1 1 300px; padding: 40px; display: flex; flex-direction: column; justify-content: center;">
              <h3 class="text-gold" style="font-size: 2rem; font-family: 'Italiana', serif; margin-bottom: 16px; line-height: 1.2;">${promo.headline}</h3>
              <p class="text-white-muted" style="font-size: 1.05rem; margin-bottom: 30px; line-height: 1.6;">${promo.description || ''}</p>
              ${promo.linkUrl ? `<a href="${promo.linkUrl}" class="btn btn-gold" style="align-self: flex-start; padding: 10px 24px;">${promo.callToAction || 'Discover More'}</a>` : ''}
            </div>
          </div>
        `;
      } else if (imgSrc) {
        // Image layout: Side-by-side
        carouselHtml += `
          <div class="promo-slide">
            <div style="flex: 1 1 300px; min-height: 350px; background: url('${imgSrc}') center/cover no-repeat;"></div>
            <div style="flex: 1 1 300px; padding: 40px; display: flex; flex-direction: column; justify-content: center;">
              <h3 class="text-gold" style="font-size: 2rem; font-family: 'Italiana', serif; margin-bottom: 16px; line-height: 1.2;">${promo.headline}</h3>
              <p class="text-white-muted" style="font-size: 1.05rem; margin-bottom: 30px; line-height: 1.6;">${promo.description || ''}</p>
              ${promo.linkUrl ? `<a href="${promo.linkUrl}" class="btn btn-gold" style="align-self: flex-start; padding: 10px 24px;">${promo.callToAction || 'Discover More'}</a>` : ''}
            </div>
          </div>
        `;
      } else {
        // No image layout: Centered Typographic Elegance
        carouselHtml += `
          <div class="promo-slide" style="justify-content: center; align-items: center; text-align: center; background: radial-gradient(circle at top right, rgba(212, 175, 55, 0.15), var(--color-obsidian) 60%);">
            <div style="padding: 60px 40px; max-width: 600px; position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center;">
              <i data-lucide="sparkles" style="width: 32px; height: 32px; color: var(--color-gold); margin-bottom: 20px; opacity: 0.8;"></i>
              <h3 class="text-gold" style="font-size: 2.2rem; font-family: 'Italiana', serif; margin-bottom: 16px; line-height: 1.2;">${promo.headline}</h3>
              <p class="text-white-muted" style="font-size: 1.05rem; margin-bottom: 30px; line-height: 1.6;">${promo.description || ''}</p>
              ${promo.linkUrl ? `<a href="${promo.linkUrl}" class="btn btn-gold" style="padding: 10px 24px;">${promo.callToAction || 'Discover More'}</a>` : ''}
            </div>
          </div>
        `;
      }
    });

    carouselHtml += `</div>`;
    carouselContainer.innerHTML = carouselHtml;

    if (window.lucide) {
      window.lucide.createIcons();
    }

  } catch(err) {
    console.error('Error fetching promotions:', err);
  }
}

async function fetchAndRenderSettings() {
  try {
    const [homepageSettings, aboutSettings, contactSettings] = await Promise.all([
      client.fetch(`*[_type == "homepageSettings"][0]`),
      client.fetch(`*[_type == "aboutSettings"][0]`),
      client.fetch(`*[_type == "contactSettings"][0]`)
    ]);

    const updateText = (id, text) => {
      const el = document.getElementById(id);
      if (el) {
        el.textContent = text || '';
      }
    };

    // Homepage
    if (homepageSettings) {
      updateText('hero-title', homepageSettings.heroTitle);
      updateText('hero-subtitle', homepageSettings.heroSubtitle);
      
      // Homepage Hero Image
      if (homepageSettings.heroImage && homepageSettings.heroImage.asset) {
        const heroImageEl = document.querySelector('.hero-image');
        if (heroImageEl) {
          heroImageEl.src = urlFor(homepageSettings.heroImage).url();
        }
      }
      
      // Hero Book Button
      if (homepageSettings.bookStayLink) {
        const heroBookBtn = document.getElementById('hero-book-btn');
        if (heroBookBtn) {
          heroBookBtn.href = homepageSettings.bookStayLink;
          heroBookBtn.target = '_blank';
        }
      }
    }
    
    // About
    if (aboutSettings && aboutSettings.aboutContent) {
      const container = document.getElementById('about-content-container');
      if (container) {
        const paragraphs = aboutSettings.aboutContent.split('\n\n').filter(p => p.trim() !== '');
        container.innerHTML = paragraphs.map((p, index) => {
          // make the last paragraph look like the conclusion (centered, white text, top border)
          if (index === paragraphs.length - 1 && paragraphs.length > 1) {
            return `<p class="text-white" style="font-size: 1.15rem; margin: 0; text-align: center; padding-top: 20px; border-top: 1px solid rgba(212, 175, 55, 0.2);">${p.replace(/\n/g, '<br>')}</p>`;
          }
          return `<p class="text-white-muted" style="font-size: 1.05rem; margin-bottom: 24px;">${p.replace(/\n/g, '<br>')}</p>`;
        }).join('');
      }
    }

    // Contact & Global
    if (contactSettings) {
      updateText('contact-address', contactSettings.contactAddress);
      updateText('contact-city', contactSettings.contactCity);
      updateText('contact-phone', contactSettings.contactPhone);
      updateText('contact-email', contactSettings.contactEmail);
      updateText('footer-text', contactSettings.footerText);
    }
    
  } catch (error) {
    console.error("Error fetching site settings:", error);
  }
}

async function fetchAndRenderBusinesses() {
  const grid = document.getElementById("business-grid");
  if (!grid) return;

  try {
    const businesses = await client.fetch('*[_type == "business" && isActive == true] | order(order asc)');
    
    if (businesses.length === 0) {
      grid.innerHTML = '<p class="text-white-muted" style="grid-column: 1/-1; text-align: center;">No businesses listed at the moment.</p>';
      return;
    }

    grid.innerHTML = '';
    
    const modal = document.getElementById("business-modal");
    const mIcon = document.getElementById("modal-icon");
    const mTitle = document.getElementById("modal-title");
    const mCategory = document.getElementById("modal-category");
    const mDesc = document.getElementById("modal-desc");
    const mLinks = document.getElementById("modal-links");

    businesses.forEach((biz) => {
      const card = document.createElement("div");
      card.className = "business-card";
      card.innerHTML = `
        <div class="business-icon">
          <i data-lucide="${biz.icon || 'briefcase'}" style="width: 32px; height: 32px;"></i>
        </div>
        <h3 class="business-name">${biz.name}</h3>
        <div class="business-category">${biz.category}</div>
        <p class="text-white-muted" style="font-size: 0.95rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${biz.description || ''}</p>
      `;
      
      card.addEventListener("click", () => {
        mIcon.innerHTML = `<i data-lucide="${biz.icon || 'briefcase'}" style="width: 40px; height: 40px;"></i>`;
        mTitle.textContent = biz.name;
        mCategory.textContent = biz.category;
        mDesc.textContent = biz.description || '';
        
        const ensureHttps = (url) => {
          if (!url) return '';
          url = url.trim();
          if (url.startsWith('http://') || url.startsWith('https://')) return url;
          return `https://${url}`;
        };

        let linksHtml = '';
        if (biz.phone && biz.phone.trim() !== '') {
          linksHtml += `
            <a href="tel:${biz.phone}" class="portal-link-item">
              <i data-lucide="phone" style="width: 20px; height: 20px;"></i>
              ${biz.phone}
            </a>`;
        }
        if (biz.website && biz.website.trim() !== '') {
          linksHtml += `
            <a href="${ensureHttps(biz.website)}" target="_blank" rel="noopener noreferrer" class="portal-link-item">
              <i data-lucide="globe" style="width: 20px; height: 20px;"></i>
              Visit Website
            </a>`;
        }
        if (biz.facebook && biz.facebook.trim() !== '') {
          linksHtml += `
            <a href="${ensureHttps(biz.facebook)}" target="_blank" rel="noopener noreferrer" class="portal-link-item">
              <i data-lucide="facebook" style="width: 20px; height: 20px;"></i>
              Facebook
            </a>`;
        }
        if (biz.twitter && biz.twitter.trim() !== '') {
          linksHtml += `
            <a href="${ensureHttps(biz.twitter)}" target="_blank" rel="noopener noreferrer" class="portal-link-item">
              <i data-lucide="twitter" style="width: 20px; height: 20px;"></i>
              Twitter
            </a>`;
        }
        mLinks.innerHTML = linksHtml;
        
        window.refreshIcons();
        modal.classList.add("active");
        document.body.style.overflow = 'hidden';
      });

      grid.appendChild(card);
    });
    
    window.refreshIcons();
  } catch (error) {
    console.error("Error fetching businesses:", error);
    grid.innerHTML = '<p class="text-white-muted" style="grid-column: 1/-1; text-align: center;">Unable to load directory at this time.</p>';
  }
}

// Run fetchers
fetchAndRenderSettings();
fetchAndRenderAmenities();
fetchAndRenderProperties();
fetchAndRenderPromotions();
fetchAndRenderBusinesses();
