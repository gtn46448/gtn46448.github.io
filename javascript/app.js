const navSlide = () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.navLinks');
  // Toggle Nav
  burger.addEventListener('click', ()=> {
    nav.classList.toggle('navActive');
    //Burger Animation
      burger.classList.toggle('toggle');
  });
}

const linkAnimation = () => {
  const navLinks = document.querySelectorAll('.navLinks li');

  // Show Links
  navLinks.forEach((link, index) => {
    link.style.animation = `navLinkFade 0.2s ease forwards ${index / 7 + .1}s`;
  });
}

const overlayManage = () => {
  const cardOverlay = document.querySelector('.cardOverlay');
  const workCards = document.querySelectorAll('.workCard');
  const body = document.body;
  const navButtons = document.querySelector('.navButtons');

  workCards.forEach((workCard) => {
    workCard.addEventListener("click", () => {
      cardOverlay.classList.add("open");
      // measure width before vert scrollbar removed
      const w1 = document.body.clientWidth;
      //inadvertantly removes scrollbar from body (but adds it to overlay)
      body.classList.add("noScroll");
      //measure width after sb removal
      const w2 = document.body.clientWidth;
      //add padding to avoid reflow
      body.style.padding = `0px ${w2-w1}px 0px 0px`;
      navButtons.style.padding =  `0px ${w2-w1}px 0px 0px`;

      cardOverlay.setAttribute('aria-hidden', false);
      //cardFullBox is the one that scrolls rather than cardOverlay
      document.querySelector('.cardFullBox').scrollTop = 0;

      const fullImage = document.querySelector('.cardFullImage');
      const cardImage = workCard.querySelector('.cardPreviewImage');
      fullImage.setAttribute('src', cardImage.getAttribute('src'))

      const fullTitle = document.querySelector('.cardFullTitle');
      const cardTitle = workCard.querySelector('.cardTitle');
      fullTitle.innerHTML = cardTitle.innerHTML;

      const fullDesc = document.querySelector('.cardFullDescription');
      const cardDesc = workCard.getAttribute('descFull');
      console.log(cardDesc);
      fullDesc.innerHTML = cardDesc;

    })
  })

  cardOverlay.addEventListener("click", (e) => {
    console.log(e);
    if(e.target.classList.contains("overlayClose")) {
      cardOverlay.classList.remove("open");
      body.classList.remove("noScroll");
      body.style.padding = '0';
      navButtons.style.padding =  '0';
      cardOverlay.setAttribute('aria-hidden', true);
    }
  })
}

const main = () => {
  navSlide();
  linkAnimation();
  overlayManage();
}

main();
