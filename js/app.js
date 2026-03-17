/* ===================================================================
   EXECOM XXVI — Core Application Logic
   Handles URL routing, data loading, and dynamic rendering
   =================================================================== */

(function () {
  'use strict';

  const DATA_PATH = 'data/teamInfo.json';

  // ---- Utilities ----

  function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  async function fetchMembers() {
    const response = await fetch(DATA_PATH);
    if (!response.ok) throw new Error(`Failed to load data (${response.status})`);
    const data = await response.json();
    return data["2025"] || [];
  }

  // ---- Landing Page (index.html) — Members Catalogue ----

  function renderMemberCards(members) {
    const grid = document.getElementById('members-grid');
    const loading = document.getElementById('loading-state');
    if (!grid) return;

    if (loading) loading.remove();

    members.forEach((member) => {
      const card = document.createElement('a');
      card.href = `profile.html?id=${encodeURIComponent(member.aqute)}`;
      card.className = 'badge-card';
      card.id = `card-${member.aqute}`;
      card.setAttribute('aria-label', `View profile of ${member.name}`);

      // Use the actual PNG files the user uploaded based on the aqute ID
      const imageName = memberImages[member.aqute];
      const photoUrl = imageName ? encodeURI(imageName) : `https://api.dicebear.com/7.x/initials/svg?seed=${member.aqute}&backgroundColor=transparent&textColor=333333`;

      card.innerHTML = `
        <div class="badge-top">
          <div class="badge-info">
            <h3 class="badge-name">${member.name}</h3>
            <p class="badge-role">${member.role}</p>
          </div>
        </div>
        <span class="badge-vertical-text">EXECOM XXVI</span>
        <div class="badge-photo-area">
          <img class="badge-photo photo-${member.aqute}" src="${photoUrl}" alt="${member.name}" loading="lazy" />
        </div>
        <div class="badge-bottom">
          <p class="badge-tagline">#maythefossbewithyou</p>
          <div class="badge-rainbow"></div>
        </div>
      `;

      grid.appendChild(card);
    });
  }

  // ---- Profile Page (profile.html) — QR scan destination ----

  const memberImages = {
    "ashmi": "assets/images/members/ashmi-g-suneer.png",
    "dhyan": "assets/images/members/dhyan-s.png",
    "zeon": "assets/images/members/adithyan-up.png",
    "geethu": "assets/images/members/geethu-s-bahulayan.png",
    "jeevan": "assets/images/members/jeevan-s.png",
    "krishna": "assets/images/members/krishna-m-j.png",
    "lakshmi": "assets/images/members/lakshmi-g-nair.png",
    "sanemi": "assets/images/members/niranjan-s.png",
    "pavithra": "assets/images/members/pavithra.png",
    "sanjana": "assets/images/members/sanjana-s.png",
    "saranya": "assets/images/members/saranya-a.png",
    "mtyt": "assets/images/members/sreedev-s-s.png",
    "srs": "assets/images/members/sreehari-s.png",
    "hvh": "assets/images/members/havis-v-h.png",
    "indu": "assets/images/members/induchoodan-v-s.png",
    "hgp": "assets/images/members/harigovind-p-nair.png"
  };

  function renderProfile(member, memberIndex) {
    const card = document.getElementById('profile-card');
    const loading = document.getElementById('loading-state');
    if (!card) return;

    // Use the actual PNG files the user uploaded based on the aqute ID
    // with a fallback to the dicebear if no image exists
    const imageName = memberImages[member.aqute];
    const photoUrl = imageName ? encodeURI(imageName) : `https://api.dicebear.com/7.x/initials/svg?seed=${member.aqute}&backgroundColor=transparent&textColor=333333`;

    // Photo
    const profilePhotoEl = document.getElementById('profile-photo');
    profilePhotoEl.src = photoUrl;
    profilePhotoEl.alt = member.name;
    // Add specific class for custom scaling
    profilePhotoEl.className = `profile-photo photo-${member.aqute}`;

    // Text fields
    document.getElementById('profile-name').textContent = member.name;
    document.getElementById('profile-designation').textContent = member.role;
    document.getElementById('profile-department').textContent = member.dept || "EXECOM XXVI";

    // Chamber Lead badge (only for chamber leads)
    if (member.chamber) {
      const chamberGroup = document.getElementById('profile-chamber-group');
      const chamberImg = document.getElementById('profile-chamber-img');
      const chamberLink = document.getElementById('profile-chamber-link');
      
      chamberImg.src = member.chamber;
      chamberGroup.classList.remove('hidden');

      if (member.chamber_id) {
        chamberLink.href = member.chamber_id;
        chamberLink.style.cursor = 'pointer';
      } else {
        chamberLink.removeAttribute('href');
        chamberLink.style.cursor = 'default';
      }

      // Renumber contacts label from 4 to 5
      document.getElementById('contacts-label').textContent = '5. CONTACT & SOCIALS';
    }

    // Update page title
    document.title = `${member.name} — Execom XXVI`;

    // Contacts & Socials
    const socials = member.socials || {};

    // Email
    const emailRow = document.getElementById('detail-email');
    if (socials.email) {
      emailRow.href = socials.email;
      emailRow.classList.remove('hidden');
      document.getElementById('detail-email-value').textContent = "Send Email";
    } else {
      emailRow.classList.add('hidden');
    }

    // Github (replacing phone)
    const githubRow = document.getElementById('detail-phone'); // Reusing ID for now, will change icon in HTML
    if (socials.github) {
      githubRow.href = socials.github;
      githubRow.classList.remove('hidden');
      const ghUsername = socials.github.split('/').filter(Boolean).pop();
      document.getElementById('detail-phone-value').textContent = ghUsername;
    } else {
      githubRow.classList.add('hidden');
    }

    // Instagram
    const instaRow = document.getElementById('detail-instagram');
    if (socials.instagram) {
      instaRow.href = socials.instagram;
      instaRow.classList.remove('hidden');
      const instaUsername = socials.instagram.split('/').filter(Boolean).pop();
      document.getElementById('detail-instagram-value').textContent = `@${instaUsername}`;
    } else {
      instaRow.classList.add('hidden');
    }

    // LinkedIn
    const linkedinRow = document.getElementById('detail-linkedin');
    if (socials.linkedin) {
      linkedinRow.href = socials.linkedin;
      linkedinRow.classList.remove('hidden');
      document.getElementById('detail-linkedin-value').textContent = "LinkedIn Profile";
    } else {
      linkedinRow.classList.add('hidden');
    }

    // Show card, hide loading
    if (loading) loading.classList.add('hidden');
    card.classList.remove('hidden');

    // Member ID code
    const memberIdEl = document.getElementById('license-member-id');
    if (memberIdEl) {
      const idNum = String(memberIndex + 1).padStart(3, '0');
      memberIdEl.textContent = `FOSS-XXVI-${idNum}`;
    }
  }

  function showProfileError() {
    const loading = document.getElementById('loading-state');
    const error = document.getElementById('error-state');
    if (loading) loading.classList.add('hidden');
    if (error) error.classList.remove('hidden');
  }

  // ---- Initialization ----

  async function init() {
    const isProfilePage = document.body.classList.contains('profile-page');

    try {
      const members = await fetchMembers();

      if (isProfilePage) {
        const memberId = getQueryParam('id');
        if (!memberId) {
          showProfileError();
          return;
        }

        const memberIndex = members.findIndex(
          (m) => m.aqute.toLowerCase() === memberId.toLowerCase()
        );
        const member = memberIndex !== -1 ? members[memberIndex] : null;

        if (member) {
          renderProfile(member, memberIndex);
        } else {
          showProfileError();
        }
      } else {
        renderMemberCards(members);
      }
    } catch (err) {
      console.error('Execom App Error:', err);

      if (isProfilePage) {
        showProfileError();
      } else {
        const loading = document.getElementById('loading-state');
        if (loading) {
          loading.innerHTML = `
            <div class="error-icon" style="margin-bottom:1rem;"><i class="fa-solid fa-triangle-exclamation"></i></div>
            <p>Failed to load members. Please try again later.</p>
          `;
        }
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
