//Homepage carousel - Liam Doherty 
const slidesContainer = document.querySelector('.slides');
const dots = document.querySelectorAll('.dot');
let index = 0;

function showSlide(i) {
  slidesContainer.style.transform = `translateX(-${i * 100}%)`;
  dots.forEach((dot, idx) => dot.classList.toggle('active', idx === i));
}

function nextSlide() {
  index = (index + 1) % dots.length;
  showSlide(index);
}


setInterval(nextSlide, 4000);


dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    index = i;
    showSlide(index);
  });
});
// Newsletter live validation - Liam Doherty 
const form = document.getElementById('newsletterForm');
if (form) {
  const first = document.getElementById('nlFirst');
  const email = document.getElementById('nlEmail');
  const msg = document.getElementById('nlMsg');

  // Simple name validation (letters only, min 2 chars)
  const nameValid = (v) => /^[A-Za-zÀ-ž' -]{2,}$/.test(v.trim());

  function validateFirst() {
    if (!first.value.trim()) {
      msg.textContent = 'Please enter your first name.';
      first.style.borderColor = 'red';
      return false;
    } else if (!nameValid(first.value)) {
      msg.textContent = 'Name should be at least 2 letters, no numbers.';
      first.style.borderColor = 'red';
      return false;
    }
    first.style.borderColor = '';
    msg.textContent = '';
    return true;
  }
//Email Validation - Liam Doherty
  function validateEmail() {
    if (!email.value.trim()) {
      msg.textContent = 'Please enter your email address.';
      email.style.borderColor = 'red';
      return false;
    } else if (email.validity.typeMismatch) {
      msg.textContent = 'Please enter a valid email address.';
      email.style.borderColor = 'red';
      return false;
    }
    email.style.borderColor = '';
    msg.textContent = '';
    return true;
  }

  first.addEventListener('input', validateFirst);
  email.addEventListener('input', validateEmail);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const validFirst = validateFirst();
    const validEmail = validateEmail();

    if (validFirst && validEmail) {
      msg.style.color = '#ffffffff';
      msg.textContent = 'Thanks for subscribing to Jungle Pals! 🦎';
      form.reset();
    } else {
      msg.style.color = '#ffffffff';
    }
  });
}

// Back to Top JQuery - Liam Doherty 
$(function () {
  const $btn = $('#backTop');

  function toggleBtn() {
    $btn.toggle($(window).scrollTop() > 150); // show after 150px 
  }

  toggleBtn();

  $(window).on('scroll', toggleBtn);

  $btn.on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 600);
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const checkboxes = document.querySelectorAll('input[name="readiness"]');
  const readyBtn = document.getElementById('ready-button');
  const speciesBox = document.getElementById('Species-Location');
  const searchBtn = document.getElementById('search-adopt');

  if (!checkboxes.length || !readyBtn || !speciesBox || !searchBtn) return;

  // Hide the species/location box in the beginning
  speciesBox.style.display = 'none';

  // Turns off ready button until all checked
  readyBtn.disabled = true;
  function updateReadyState() {
    const allChecked = [...checkboxes].every(cb => cb.checked);
    readyBtn.disabled = !allChecked;
  }
  checkboxes.forEach(cb => cb.addEventListener('change', updateReadyState));

  // Show the box when the button is clicked
  readyBtn.addEventListener('click', () => {
    speciesBox.style.display = 'block';
    speciesBox.scrollIntoView({ behavior: 'smooth' });
  });

  // Get dropdowns and adopt div's
  const speciesSelect = document.getElementById('Species');
  const locationSelect = document.getElementById('location-selector');
  const adoptDivs = document.querySelectorAll('#adopt-images > .adopt-card');

  // Hide all adopt images from the beginning
  adoptDivs.forEach(div => div.style.display = 'none');

  // 'No Results" div if there's nothing
  let noResults = document.getElementById('no-results');
  if (!noResults) {
    noResults = document.createElement('div');
    noResults.id = 'no-results';
    noResults.style.display = 'none';
    noResults.style.textAlign = 'center';
    noResults.style.padding = '20px';
    noResults.style.fontWeight = 'bold';
    noResults.textContent = 'No results found.';
    document.getElementById('adopt-images').appendChild(noResults);
  }

  // Filter adopt images when searching
  searchBtn.addEventListener('click', () => {
    const selectedSpecies = speciesSelect.value;
    const selectedLocation = locationSelect.value;

    let anyShown = false; // hide the others

    adoptDivs.forEach(div => {
      const matchesSpecies = div.dataset.species === selectedSpecies;
      const matchesLocation = div.dataset.location === selectedLocation;

      if (matchesSpecies && matchesLocation) {
        div.style.display = 'block';
        anyShown = true;
      } else {
        div.style.display = 'none';
      }
    });

    // Show or hide the "No Results" message
    noResults.style.display = anyShown ? 'none' : 'block';

    // Go to results
    const resultsSection = document.getElementById('adopt-images');
    if (resultsSection) resultsSection.scrollIntoView({ behavior: 'smooth' });
  });
});

// Pop-Up Message for form submission
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.querySelector('#contactform form');

  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();
    alert('Your query has been sent!');
    contactForm.reset();
  });
});

// The hover effect for contact info boxes
$(document).ready(function () {
  $('.mb-4').hover(
    function () {
      $(this).css({
        'transform': 'scale(1.05)',
        'box-shadow': '0 10px 20px rgba(0,0,0,0.3)'
      });
    },
    function () {
      $(this).css({
        'transform': 'scale(1)',
        'box-shadow': '0 4px 10px rgba(0,0,0,0.2)'
      });
    }
  );
});

$(document).ready(function () {
  const $checkboxes = $('input[name="readiness"]');
  const $readyBtn = $('#ready-button');
  const $speciesBox = $('#Species-Location');
  const $searchBtn = $('#search-adopt');
  const $speciesSelect = $('#Species');
  const $locationSelect = $('#location-selector');
  const $adoptDivs = $('#adopt-images > .adopt-card');
  const $noResults = $('#no-results');

  // hide the species/location and "No results" from the start
  $speciesBox.hide();
  $adoptDivs.hide();
  $noResults.hide();

  // Allow the ready button only when all the checkboxes are checked
  $checkboxes.on('change', function () {
    const allChecked = $checkboxes.length === $checkboxes.filter(':checked').length;
    $readyBtn.prop('disabled', !allChecked);
  });

  $readyBtn.on('click', function () {
    $speciesBox.slideDown();
    $('html, body').animate({ scrollTop: $speciesBox.offset().top }, 600);
  });

  // Filter adoption cards on search
  $searchBtn.on('click', function () {
    const selectedSpecies = $speciesSelect.val();
    const selectedLocation = $locationSelect.val();
    let anyShown = false;

    $adoptDivs.each(function () {
      const $this = $(this);
      const matches = $this.data('species') === selectedSpecies && $this.data('location') === selectedLocation;
      $this.toggle(matches);
      if (matches) anyShown = true;
    });

    $noResults.toggle(!anyShown);

    // Scroll to results
    if (anyShown || !anyShown) {
      $('html, body').animate({ scrollTop: $('#adopt-images').offset().top }, 600);
    }
  });
});
//Nav Hover effect - Liam Doherty 
$('nav a').hover( 
  function () {
    $(this).css({ 'color': '#ff7f50', 'transition': 'color 0.3s ease' });
  },
  function () {
    $(this).css({ 'color': '', 'transition': 'color 0.3s ease' });
  }
);
;
//Featured animal carousel - Liam Doherty 
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("featuredTrack");
  const dotsWrap = document.getElementById("featuredDots");
  const carousel = document.getElementById("featuredCarousel");

  if (!track || !dotsWrap || !carousel) return; 

  const slides = Array.from(track.children);
  let current = 0;
  let timer;

  dotsWrap.innerHTML = slides.map((_, i) =>
    `<button class="featured-dot ${i === 0 ? "active" : ""}" aria-label="Go to featured slide ${i + 1}"></button>`
  ).join("");

  const dots = Array.from(dotsWrap.children);

  function goToSlide(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle("active", i === current));
  }

  function next() { goToSlide(current + 1); }
  function prev() { goToSlide(current - 1); }

  const prevBtn = carousel.querySelector(".featured-nav.prev");
  const nextBtn = carousel.querySelector(".featured-nav.next");

  prevBtn.addEventListener("click", () => {
    prev();
    resetTimer();
  });

  nextBtn.addEventListener("click", () => {
    next();
    resetTimer();
  });

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      goToSlide(i);
      resetTimer();
    });
  });

  function startTimer() {
    timer = setInterval(next, 4500);
  }
  function resetTimer() {
    clearInterval(timer);
    startTimer();
  }
  startTimer();
});


//Scroll Reveal - Liam Doherty 
document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".reveal");

  if (!reveals.length) return;

  const revealOnScroll = () => {
    const triggerPoint = window.innerHeight - 80;

    reveals.forEach((el) => {
      const top = el.getBoundingClientRect().top;
      if (top < triggerPoint) {
        el.classList.add("show");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // run once on load
});


//Shane JS added 04.12.25//

//full story modal

document.addEventListener('DOMContentLoaded',() => {
	const storyButtons = document.querySelectorAll('.story-btn');
	if (!storyButtons.length) return; //ensure it only runs on stories page
	
	const storyData = {
		gary: {
			title: "Gary's Gone",
			text: "When Gary first arrived at Jungle Pals he would rarely been seen by anyone, it took approximately a month before he started to move at night. We were concerned for Gary as we did not expect this reaction considering the environment he was now in. However, Gary slowly came around and eventually gained the confidence to pop out every so often. Once the Harrison family adopted him, he has gone from strength to strength and even loves chilling on Mr Harrison's shoulder!"
		},
		
		charles: {
			title:"Charles' New Adventure",
			text:"Charles was very nervous and easily startled when he was rescued. The Marilyn family visited him every weekend prior to the adoption date, talking to him softly and bringing his favourite treats. Over time, Charles began to trust them and he is a super chatty and cofident Cockatoo today. We even have videos of him dancing!"
		},
		
		sirius: {
			title: "Sirius' Big Move",
			text: "Sirius needed a lot of space and stimulation. We were concerned initially, as he refused to leave his bed due to his timid nature. Over time, however, he grew in confidence and made use of the play area we had for him. The Gray family were the perfect fit for Sirius, as they worked closely with our team at Jungle Pals to ensure their own garden and play area was safe and adequate in size for Sirius. Since his adoption Sirius has realised his love for ripping apart stuffed animals, much to the despair of Mr & Mrs Gray's daughter."
		}
	};
	
	
	//creating modal element once
	
	const modal = document.createElement('div');
	modal.id = 'storyModal';
	modal.innerHTML = `
		<div class="story-modal-content">
			<h2 id="storyModalTitle"></h2>
			<p id="storyModalText"></p>
			<button type="button" class="story-modal-close">Close</button>
		</div>
	`;
	
	document.body.appendChild(modal);
	
	const titleEl = document.getElementById('storyModalTitle');
	const textEl = document.getElementById('storyModalText');
	const closeBtn = modal.querySelector('.story-modal-close');
	
	function openStory(key) {
		const data = storyData[key];
		if (!data) return;
		titleEl.textContent = data.title;
		textEl.textContent = data.text;
		modal.style.display = 'flex';
	}
	
	storyButtons.forEach(btn => {
		btn.addEventListener('click', e=> {
			e.preventDefault();
			const key = btn.dataset.story;
			openStory(key);
		});
	});
	
	//close on button click or backdrop click or escape
	closeBtn.addEventListener('click', () => modal.style.display = 'none');
	modal.addEventListener('click', e => {
		if (e.target === modal) modal.style.display = 'none';
	});
	
	document.addEventListener('keydown', e => {
		if (e.key === 'Escape') modal.style.display = 'none';
		});
	});
