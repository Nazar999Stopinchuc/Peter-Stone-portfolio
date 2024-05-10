const worksData = {
  images: {
    'category-a': ['images/works/L1.png', 'images/works/L2.png', 'images/works/B1.png', 'images/works/K1.png', 'images/works/K2.png', 'images/works/B2.png', 'images/works/L6.png', 'images/works/B4.png', 'images/works/L3.png', 'images/works/L3.png'],
    'category-b': ['images/works/K1.png', 'images/works/K2.png', 'images/works/K3.png', 'images/works/K4.png', 'images/works/K5.png', 'images/works/K6.png', 'images/works/K4.png', 'images/works/K4.png', 'images/works/K4.png', 'images/works/K2.png', 'images/works/K2.png'],
    'category-c': ['images/works/L1.png', 'images/works/L2.png', 'images/works/L3.png', 'images/works/L4.png', 'images/works/L5.png', 'images/works/L6.png', 'images/works/L1.png', 'images/works/L2.png', 'images/works/L3.png', 'images/works/L1.png', 'images/works/L2.png',],
    'category-d': ['images/works/B1.png', 'images/works/B2.png', 'images/works/B3.png', 'images/works/B4.png', 'images/works/B5.png', 'images/works/B6.png', 'images/works/B1.png', 'images/works/B2.png', 'images/works/B3.png', 'images/works/B1.png', 'images/works/B2.png', 'images/works/B3.png', 'images/works/B4.png', 'images/works/B5.png',]
  }
};
const sliderImg = ['images/works/L1.png', 'images/works/L2.png', 'images/works/B1.png', 'images/works/L3.png', 'images/works/B4.png'];


const filter = (controlHeader, controlItems, controlItemsActive, boxContent, loadMore) => {
  const controlBlock = document.querySelector(controlHeader),
    box = document.querySelector(boxContent),
    moreBtn = document.querySelector(loadMore),
    controlBtns = document.querySelectorAll(`.${controlItems}`);

  let categoriSelect = 'category-a';
  let addFromIndex = 6;
  let addToIndex = addFromIndex + 3;

  function createCard(photoSrc) {
    let card = document.createElement('li');
    card.innerHTML = `<img class="works__img" src=${photoSrc} alt="Фото проекта"></img>`;
    card.className = `works__item swashIn`;

    return card;
  };

  controlBlock.addEventListener('click', (e) => {
    let target = e.target;
    categoriSelect = target.dataset.filter;
    addFromIndex = 6;
    addToIndex = addFromIndex + 3;
    moreBtn.style.display = 'inline-block';

    if (target && target.classList.contains(controlItems)) {
      box.innerHTML = '';
      fillBox(0, addFromIndex, categoriSelect);

      controlBtns.forEach(elem => {
        elem.classList.remove(controlItemsActive);
      });

      target.classList.add(controlItemsActive);
    };
  });

  function fillBox(from, to, category) {
    let card;
    for (let i = from; i < to; i++) {
      if (worksData.images[categoriSelect].length <= i) return;
      card = createCard(worksData.images[category][i]);
      box.append(card);
    };
  };

  moreBtn.addEventListener('click', () => {
    fillBox(addFromIndex, addToIndex, categoriSelect);
    addFromIndex += 3;
    addToIndex = addFromIndex + 3;

    if (worksData.images[categoriSelect].length <= addFromIndex) moreBtn.style.display = 'none';
  });

  fillBox(0, addFromIndex, 'category-a');
};

const burgerMenu = (triger, contentOpen, linkList, bodyLock, burgerActyve) => {
  let burgerBtn = document.querySelector(triger);
  let content = document.querySelector(contentOpen);
  let links = document.querySelectorAll(linkList);

  burgerBtn.addEventListener('click', () => {
    content.classList.toggle(burgerActyve);
    burgerBtn.classList.toggle(burgerActyve);
    document.body.classList.toggle(bodyLock);
  });

  links.forEach(elem => {
    elem.addEventListener('click', () => {
      if (document.body.clientWidth <= 993) {
        content.classList.remove(burgerActyve);
        burgerBtn.classList.remove(burgerActyve);
        document.body.classList.remove(bodyLock);
      }
    });
  });
};

const scrollAnimation = () => {
  function onEntry(entry) {
    entry.forEach(change => {
      if (change.isIntersecting) {
        change.target.classList.add('show-animation');
      };
    });
  };

  let options = {
    threshold: [0.4]
  };

  let observer = new IntersectionObserver(onEntry, options);
  let elements = document.querySelectorAll('.element-animation');

  for (let elm of elements) {
    observer.observe(elm);
  };
};

const modalsImg = (modalBox, modalItems, popupSelektor) => {
  const modalsZone = document.querySelector(modalBox),
    popup = document.querySelector(popupSelektor),
    popupContent = document.createElement('img');

  popupContent.className = 'popup__content';

  modalsZone.addEventListener('click', (e) => {
    e.preventDefault();
    let target = e.target;

    if (target && target.classList.contains(modalItems)) {
      popup.style.display = 'flex';

      const path = target.getAttribute('src');
      popupContent.src = path;
      popup.append(popupContent);

      document.body.style.overflow = 'hidden';
    };
    if (target && target.matches('div.popup')) {
      popup.style.display = 'none';
      document.body.style.overflow = 'auto';
    };
  });



}

const fixedHeader = () => {
  window.onscroll = () => {
    let header = document.querySelector('.header__wrapper');

    if (window.pageYOffset > 55) {
      header.classList.add('header__wrapper--fixed');
    } else {
      header.classList.remove('header__wrapper--fixed');
    }
  };
};

const slider = (sliderBox) => {
  const slider = document.querySelector(sliderBox),
    changeSpeed = 6000;
  let slideCount = 0;
  slider.style = `background-image: url("${sliderImg[slideCount]}")`;

  setInterval(() => {
    slideCount++;
    if (slideCount >= sliderImg.length) slideCount = 0;
    slider.style = `background-image: url("${sliderImg[slideCount]}")`;
  }, changeSpeed);


};

window.addEventListener('DOMContentLoaded', () => {
  fixedHeader();
  modalsImg('.works', 'works__img', '.popup');
  burgerMenu('.burger', '.menu__list', '.menu__link', 'lock', 'active');
  filter('.works__control', 'works__btn', 'works__btn--active', '.works__content', '#works-btn');
  scrollAnimation();
  slider('.header__slider');
});











