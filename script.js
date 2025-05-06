fetch('config.json')
  .then(res => res.json())
  .then((data) => {
    updateLogo(data.logo);
    loadAbout(data.about);
    loadGallery(data.gallery);
    loadFeedback(data.feedbacks);
    loadFooter(data.contact);
  });
  

function updateLogo(logoPath) {
  const logoEl = document.querySelector('.logo');
  if (logoEl) {
    logoEl.src = logoPath;
  }
}

function loadAbout(about) {
  const section = document.getElementById('about');

  if (about.mainImage) {
    const img = document.createElement('img');
    img.src = about.mainImage;
    img.alt = 'About Main Image';
    img.className = 'about-main-img';
    section.appendChild(img);
  }

  about.sections.forEach(item => {
    const div = document.createElement('div');
    div.className = 'about-subsection';
    div.innerHTML = `
        ${
          item.image
            ? `<img src="${item.image}" alt="${item.title}" class="about-sub-img" />`
            : ''
        }
        <div>
          <h2>${item.title}</h2>
          <p>${item.text}</p>
        </div>
      `;
    section.appendChild(div);
  });
}

function loadGallery(gallery) {
  const section = document.getElementById('gallery');
  section.classList.add('gallery');
  gallery.forEach(item => {
    const div = document.createElement('div');
    div.innerHTML = `<img src="${item.image}" alt="${item.text}" /><p>${item.text}</p>`;
    section.appendChild(div);
  });
}

function loadFeedback(feedbacks) {
  const section = document.getElementById('feedback');
  feedbacks.forEach(fb => {
    const div = document.createElement('div');
    div.innerHTML = `
      <img src="${fb.photo}" alt="${fb.name}" style="width:100px;border-radius:50%;" />
      <p><strong>${fb.name}</strong>: ${fb.text}</p>
    `;
    section.appendChild(div);
  });
}

function loadFooter(contact) {
  const footer = document.getElementById('footer');
  footer.innerHTML = `
    <p>Email: <a href="mailto:${contact.email}">${contact.email}</a></p>
    <p>WhatsApp: <a href="https://wa.me/${contact.whatsapp.replace(
      /\D/g,
      ''
    )}" target="_blank">${contact.whatsapp}</a></p>
    <p>
      <a href="${contact.instagram}" target="_blank">Instagram</a> |
      <a href="${contact.facebook}" target="_blank">Facebook</a>
    </p>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu");
  
    if (toggleBtn && menu) {
      toggleBtn.addEventListener("click", () => {
        menu.classList.toggle("active");
      });
    }
  });
  
