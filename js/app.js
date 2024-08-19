// ********** set date ************
// select span
const date = (document.getElementById('date').innerHTML =
  new Date().getFullYear());

// ********** smooth scroll ************
const scrollLinks = document.querySelectorAll('.scroll-link');
scrollLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    // prevent default
    e.preventDefault();

    const id = e.target.getAttribute('href').slice(1);
    const element = document.getElementById(id);
    //
    let position = element.offsetTop - 52.8;

    window.scrollTo({
      left: 0,
      // top: element.offsetTop,
      top: position,
      behavior: 'smooth',
    });
  });
});

// Navbar

window.onscroll = function () {
  var phoneIcon = document.querySelector('.phone-button');
  var whatsAppIcon = document.querySelector('.whatsapp-button');
  var telegramIcon = document.querySelector('.telegram-button');
  var emailIcon = document.querySelector('.email-button');
  if (window.scrollY > 50) {
    phoneIcon.classList.add('show-icon');
    whatsAppIcon.classList.add('show-icon');
    telegramIcon.classList.add('show-icon');
    emailIcon.classList.add('show-icon');
    document.getElementById('navbar').classList.add('shrink');
  } else {
    phoneIcon.classList.remove('show-icon');
    whatsAppIcon.classList.remove('show-icon');
    telegramIcon.classList.remove('show-icon');
    emailIcon.classList.remove('show-icon');
    document.getElementById('navbar').classList.remove('shrink');
  }
};

// Nav toggle

// select button and links
const navBtn = document.getElementById('nav-toggle');
const links = document.getElementById('nav-links');
// add event listener
navBtn.addEventListener('click', () => {
  links.classList.toggle('show-links');
});

// Accordion

var acc = document.getElementsByClassName('accordion');
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener('click', function () {
    this.classList.toggle('active');

    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
      this.querySelector('i').classList.remove('fa-minus');
      this.querySelector('i').classList.add('fa-plus');
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
      this.querySelector('i').classList.remove('fa-plus');
      this.querySelector('i').classList.add('fa-minus');
    }

    for (j = 0; j < acc.length; j++) {
      if (acc[j] !== this) {
        acc[j].classList.remove('active');
        acc[j].nextElementSibling.style.maxHeight = null;
        acc[j].querySelector('i').classList.remove('fa-minus');
        acc[j].querySelector('i').classList.add('fa-plus');
      }
    }
  });
}

// Tiles numbers

const items = [...document.querySelectorAll('.tiles-number')];

const updateCount = (el, duration) => {
  const value = parseInt(el.dataset.value);
  let initialValue = 0;
  const startTime = Date.now();

  const increaseCount = () => {
    const elapsedTime = Date.now() - startTime;
    const progress = elapsedTime / duration;

    initialValue = Math.round(progress * value);

    if (elapsedTime < duration) {
      el.textContent = `${initialValue}+`;
      requestAnimationFrame(increaseCount);
    } else {
      el.textContent = `${value}+`;
    }
  };

  increaseCount();
};

const isInViewport = (el) => {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

const checkScroll = () => {
  items.forEach((item) => {
    if (isInViewport(item) && !item.dataset.countStarted) {
      item.dataset.countStarted = 'true';
      updateCount(item, 2000); // 2000 milliseconds = 2 seconds
    }
  });
};

// Call checkScroll immediately to start the count as soon as the numbers appear on the screen
checkScroll();

window.addEventListener('scroll', checkScroll);

// Questions

const questions = document.querySelectorAll('.question');

questions.forEach(function (question) {
  const btn = question.querySelector('.question-btn');

  btn.addEventListener('click', function () {
    questions.forEach(function (item) {
      if (item !== question) {
        item.classList.remove('show-text');
      }
    });

    question.classList.toggle('show-text');
  });
});

// Modal Button

// Get modal element
const modal = document.getElementById('simpleModal');
// All page modals
var modals = document.querySelectorAll('.modal');
// Get open modal button
const modalBtn = document.querySelectorAll('.modal-btn');
// Get close button
const closeBtn = document.getElementsByClassName('closeBtn')[0];

// Listen 	for OPEN Click
modalBtn.forEach(function (e) {
  e.addEventListener('click', openModal);
});
// Listen for CLOSE Click
closeBtn.addEventListener('click', closeModal);
// Listen for OUTSIDE Click
window.addEventListener('click', outsideClick);

// Function to OPEN modal
function openModal() {
  modal.style.display = 'block';
}

// Function to CLOSE modal
function closeModal() {
  modal.style.display = 'none';
}
// Function to CLOSE modal
function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}

// Disable Form Button
function disable(x) {
  x.disabled = true;
  setTimeout(() => {
    x.disabled = false;
  }, '7000');
}

// Send Email

function sendMail() {
  var params = {
    name: document.getElementById('name').value,
    tel: document.getElementById('tel').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value,
  };

  const serviceID = 'service_v9iyyxe';
  const templateID = 'template_cp0wur3';

  if (params.tel == '' || params.email == '' || params.name == '') {
    Toastify({
      position: 'center',
      text: 'Заполните все поля!',
      style: {
        background: '#e5a280',
      },
      duration: 4000,
    }).showToast();
  } else {
    emailjs
      .send(serviceID, templateID, params)
      .then(() => {
        Toastify({
          position: 'center',
          text: 'Спасибо! Вы успешно отправили форму!',
          style: {
            background: 'linear-gradient(to right, #f1c141, #eeb111)',
          },
          duration: 3000,
        })
          .showToast()
          .then(
            setTimeout(() => {
              closeModal();
            }, '3000')
          );
      })
      .catch((err) => console.log(err));
  }
}
