fetch('config.json')
  .then(res => res.json())
  .then(data => {
    setLogo(data.logo);
    setAbout(data.about);
    setGallery(data.gallery);
    setFeedback(data.feedbacks);
    setContact(data.contact);
    setFooter(data.footer);
  });

// Define o logo
function setLogo(logoUrl) {
  const logo = document.getElementById('logo');
  if (logo) logo.src = logoUrl;
}

// Preenche o About
function setAbout(about) {
  const mainImg = document.getElementById('about-main-image');
  const container = document.getElementById('about-section-container');

  if (mainImg) mainImg.src = about.mainImage;

  if (Array.isArray(about.sections)) {
    about.sections.forEach(section => {
      const block = document.createElement('div');
      block.className = 'about-subsection';

      const img = document.createElement('img');
      img.src = section.image;
      img.alt = section.title;
      img.className = 'about-sub-img';

      const textContainer = document.createElement('div');
      const h2 = document.createElement('h2');
      h2.textContent = section.title;
      const p = document.createElement('p');
      p.textContent = section.text;

      textContainer.appendChild(h2);
      textContainer.appendChild(p);

      block.appendChild(img);
      block.appendChild(textContainer);
      container.appendChild(block);
    });
  }
}

// Preenche a galeria
function setGallery(gallery) {
  const preview = document.getElementById('gallery-main-image');
  const previewText = document.getElementById('gallery-main-text');
  const thumbnails = document.getElementById('gallery-thumbnails');

  if (!Array.isArray(gallery) || !preview || !previewText || !thumbnails)
    return;

  // Mostra a primeira imagem por padrão
  preview.src = gallery[0].image;
  preview.alt = gallery[0].text;
  previewText.textContent = gallery[0].text;

  gallery.forEach((item, index) => {
    const thumb = document.createElement('img');
    thumb.src = item.image;
    thumb.alt = item.text;

    if (index === 0) thumb.classList.add('active');

    thumb.addEventListener('click', () => {
      preview.src = item.image;
      preview.alt = item.text;
      previewText.textContent = item.text;

      // Remove 'active' de todas as thumbs
      document
        .querySelectorAll('#gallery-thumbnails img')
        .forEach(img => img.classList.remove('active'));
      thumb.classList.add('active');
    });

    thumbnails.appendChild(thumb);
  });
}

// Preenche os feedbacks com carrossel
function setFeedback(feedbacks) {
  const container = document.getElementById('feedback-container');

  if (Array.isArray(feedbacks)) {
    feedbacks.forEach((fb, index) => {
      const div = document.createElement('div');
      div.className = 'feedback-item';

      const carousel = document.createElement('div');
      carousel.className = 'feedback-carousel';
      carousel.id = `carousel-${index}`;

      fb.photos.forEach((photoUrl, i) => {
        const img = document.createElement('img');
        img.src = photoUrl;
        img.alt = `Photo ${i + 1} of ${fb.name}`;
        img.className = 'carousel-img';
        if (i !== 0) img.style.display = 'none';
        carousel.appendChild(img);
      });

      const indicators = document.createElement('div');
      indicators.className = 'carousel-indicators';

      fb.photos.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.className = 'dot';
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => showSlide(index, i));
        indicators.appendChild(dot);
      });

      const quote = document.createElement('blockquote');
      quote.textContent = `“${fb.text}”`;

      const name = document.createElement('p');
      name.innerHTML = `<strong>${fb.name}</strong>`;

      div.appendChild(carousel);
      div.appendChild(indicators);
      div.appendChild(quote);
      div.appendChild(name);
      container.appendChild(div);
    });
  }
}

function showSlide(carouselIndex, slideIndex) {
  const carousel = document.getElementById(`carousel-${carouselIndex}`);
  if (!carousel) return;

  const images = carousel.querySelectorAll('.carousel-img');
  const dots = carousel.nextElementSibling.querySelectorAll('.dot');

  images.forEach((img, i) => {
    img.style.display = i === slideIndex ? 'block' : 'none';
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === slideIndex);
  });
}

// Preenche contato
function setContact(contact) {
  const email = document.getElementById('contact-email');
  const whatsapp = document.getElementById('contact-whatsapp');
  const insta = document.getElementById('contact-instagram');
  const face = document.getElementById('contact-facebook');

  if (email) {
    email.href = `mailto:${contact.email}`;
    // email.textContent = contact.email;
  }

  if (whatsapp) {
    const cleanNumber = contact.whatsapp.replace(/\D/g, '');
    whatsapp.href = `https://wa.me/${cleanNumber}`;
    // whatsapp.textContent = contact.whatsapp;
  }

  if (insta) insta.href = contact.instagram;
  if (face) face.href = contact.facebook;
}

// Preenche o rodapé
function setFooter(footer) {
  const footerText = document.getElementById('footer-text');
  const footerIcons = document.getElementById('footer-icons');

  if (footerText) footerText.textContent = footer.text;

  if (footerIcons && Array.isArray(footer.socialMedia)) {
    footerIcons.innerHTML = ''; // limpa os ícones existentes
    footer.socialMedia.forEach(social => {
      const a = document.createElement('a');
      a.href = social.url;
      a.target = '_blank';
      a.setAttribute('aria-label', social.platform.toLowerCase());

      const icon = document.createElement('i');
      const lower = social.platform.toLowerCase();
      if (lower === 'instagram') icon.className = 'fab fa-instagram';
      else if (lower === 'facebook') icon.className = 'fab fa-facebook';
      else if (lower === 'twitter') icon.className = 'fab fa-twitter';
      else icon.className = 'fas fa-globe'; // fallback

      a.appendChild(icon);
      footerIcons.appendChild(a);
    });
  }
}

// Menu hamburguer toggle
window.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');

  if (toggleBtn && menu) {
    toggleBtn.addEventListener('click', () => {
      if (menu.classList.contains('active')) {
        menu.classList.remove('active');
        menu.style.display = 'none';
      } else {
        menu.classList.add('active');
        menu.style.display = 'flex';
        menu.style.flexDirection = 'column';
      }
      toggleBtn.setAttribute(
        'aria-expanded',
        menu.classList.contains('active')
      );
    });
  }
});
