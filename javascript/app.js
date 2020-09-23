const burger = document.querySelector('.burger');
const nav = document.querySelector('.navLinks');

window.addEventListener("resize", () => {
  document.querySelectorAll('.navLinks li').forEach((link) => {
    link.removeAttribute("style");
  })
  burger.classList.remove('toggle');
  nav.classList.remove('navActive')
})

const pageLoad = () => {
  const tl = gsap.timeline();

  tl.to(".logoName p", { duration: .7, x: "0", opacity: 1, delay: .3 });
  tl.to(".logo", { duration: .7, rotation: 720, opacity: 1 }, "-=.7");
  tl.from(".navLinks li", { duration: .4, opacity: 0, y: "-5", stagger: .1 }, "-=.3");
  tl.from(".burger", {duration: .1, opacity: 0, y: "-5"}, "-=.2")
  tl.from(".resumeButton", { duration: .1, opacity: 0, y: "-5"}, "-=.1");
  tl.from(".verticalLine", { duration: .3, opacity: 0, delay: .1 });
  tl.from(".heroLine", {duration: .4, width: 0}, "-=.2");
  tl.from(".titleText", {duration: .4, y: "100%" }, "-=.2");
  tl.from(".heroTextSmall h5", {duration: .5, y: "-120%"}, "-=.35");
}

const navSlide = () => {
  // Toggle Nav
  burger.addEventListener('click', ()=> {
    nav.classList.toggle('navActive');
    //Burger Animation
    burger.classList.toggle('toggle');
    const navLinks = document.querySelectorAll('.navLinks li');

    // Show Links
    navLinks.forEach((link, index) => {
      link.style.animation = `navLinkFade 0.2s ease forwards ${index / 9 + .1}s`;
    });
  });
  nav.addEventListener('click', ()=> {
    nav.classList.toggle('navActive');
    burger.classList.toggle('toggle');
  })
}

const overlayCreate = () => {
  const cardOverlay = document.querySelector('.cardOverlay');
  const workCards = document.querySelectorAll('.workCard');
  const body = document.body;
  const navButtons = document.querySelector('.navButtons');

  workCards.forEach((workCard) => {
    workCard.addEventListener("click", () => {
      //cardFullBox is the one that scrolls rather than cardOverlay
      document.querySelector('.cardFullBox').scrollTop = 0;
      cardOverlay.classList.add("open");
      // measure width before vert scrollbar removed
      const w1 = document.body.clientWidth;
      //inadvertantly removes scrollbar from body (but adds it to overlay)
      body.classList.add("noScroll");
      //temp padding
      body.style.padding = `0px 16px 0px 0px`;
      //measure width after sb removal
      const w2 = document.body.clientWidth;
      //add padding to avoid reflow
      body.style.padding = `0px ${w2-w1}px 0px 0px`;
      navButtons.style.padding =  `0px ${w2-w1}px 0px 0px`;

      cardOverlay.setAttribute('aria-hidden', false);

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
  pageLoad();
  navSlide();
  overlayCreate();
}

main();
