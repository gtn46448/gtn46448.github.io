const burger = document.querySelector('.burger');
const nav = document.querySelector('.navLinks');

window.addEventListener("resize", () => {
  document.querySelectorAll('.navLinks li').forEach((link) => {
    link.removeAttribute("style");
  })
  burger.classList.remove('toggle');
  nav.classList.remove('navActive')
})

const scrollAdjust = () => {
  //adjusting for scrollbar widths
  const w1 = document.body.clientWidth;
  document.body.classList.remove("noScroll");
  const w2 = document.body.clientWidth;
  document.querySelector('.nav').style.padding = `0px ${w1-w2}px 0px 0px`;
  document.querySelector('.navLinks').style.right = `${w1-w2}px`;
}

// everything GSAP + navbar padding adjustments
const pageLoad = () => {
  document.body.classList.add('noScroll');
  //preload page GSAP

  const tl = gsap.timeline();

  // tl.to(".introScreen", {duration: 0, display: "flex"})
  tl.to(".introScreen", {duration: 0, opacity: 1});
  tl.from(".introWheel", {duration: .7, rotation: "180", ease: "sine.out"});
  tl.to(".introWheel", {duration: .1, height: "15rem", width: "15rem", delay: .2});
  tl.to(".introInner", {duration: .1, opacity: 1});
  tl.to(".introScreen", {duration: .1, backgroundColor: "#2d3639"}, "<")
  tl.to(".introWheel", {duration: .3, opacity: 0, delay: .7});
  tl.add(scrollAdjust);
  tl.to(".introScreen", {duration: .4, height: 0});
  tl.to(".introScreen", {duration: 0, display: "none"});

  //everything else GSAP

  tl.from(".logo", { duration: .6, rotation: "720", opacity: 0});
  tl.from(".logoName div", { duration: .6, x: "-100%", opacity: 0 }, "-=.7");
  tl.from(".navLinks li", { duration: .4, opacity: 0, y: "-5", stagger: .1 }, "-=.5");
  tl.from(".burger", {duration: .1, opacity: 0, y: "-5"}, "-=.2")
  tl.from(".resumeButton", { duration: .1, opacity: 0, y: "-5"}, "-=.1");
  tl.from(".verticalLine", { duration: ".3", opacity: 0, delay: .1 });
  tl.from(".heroLine", {duration: ".5", width: "0"}, "-=.9");
  tl.from(".titleText", {duration: ".5", y: "100%" }, "-=.8");
  tl.from(".heroTextSmall h2", {duration: ".6", y: "-120%"}, "-=.75");

  gsap.registerPlugin(ScrollTrigger);

  const tlAbout = gsap.timeline({scrollTrigger: { trigger: "#about", start: "top 70%"}, defaults: {ease: "power1.out"}});

  tlAbout.from(".profilePic", { duration: ".7", y: "50%", opacity: "0"});
  tlAbout.from(".aboutHeader", { duration: ".5", y: "-50%", opacity: "0" }, "-=.5");
  tlAbout.from(".column1 .horizontalLine", { duration: ".3", width: "0" });
  tlAbout.from(".aboutWords p", { duration: ".3", y: "35%", opacity: "0", stagger: ".2" }, "-=.2");

  const tlSkills = gsap.timeline({scrollTrigger: { trigger: "#skills", start: "top 70%"}, defaults: {ease: "power1.out"}});

  tlSkills.from(".skillsHeader", { duration: ".5", y: "-70%", opacity: "0" });
  tlSkills.from(".skillsWords .horizontalLine", { duration: ".2", width: "0" });
  tlSkills.from(".skillsDescription p", { duration: ".3", y: "35%", opacity: "0", stagger: ".2" }, "-=.1");
  tlSkills.from(".skillsSubheader", { duration: ".2", x: "35%", opacity: "0", stagger: ".1"}, "-=.2");
  tlSkills.from(".skillItem", {duration: ".15", y: "100%", opacity: "0", stagger: ".1"});

  const tlWorks = gsap.timeline({scrollTrigger: { trigger: "#works", start: "top 70%"}, defaults: {ease: "power1.out"}});

  tlWorks.from(".worksHeader", { duration: ".5", y: "-70%", opacity: "0"});
  tlWorks.from(".worksTitle .horizontalLine", { duration: ".2", width: "0" });
  tlWorks.from(".workCard", { y: "50%", opacity: "0", duration: "0.3", stagger: "0.2" });
  tlWorks.from(".workCard", { scale: "1.05", duration: "0.3", stagger: "0.2"}, "<.5");
  tlWorks.from(".workCard", 0.3, { boxShadow: "8px 8px 17px 1px #000", stagger: 0.2}, "<");
  tlWorks.to(".workCard", {clearProps: "all", stagger: "0.3"}, "<.3");

  const tlContact = gsap.timeline({scrollTrigger: { trigger: "#contact", start: "50% bottom"}, defaults: {ease: "power1.out"}})

  tlContact.from(".contactHeader", { duration: ".5", y: "-70%", opacity: "0" });
  tlContact.from(".contactContent .horizontalLine", { duration: ".3", width: "0"});
  tlContact.from(".contactNote", { duration: "0.3", y: "50%", opacity: "0"});
  tlContact.from(".contactButton", { duration: "0.3", y: "50%", opacity: "0"});
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

      cardOverlay.setAttribute('aria-hidden', false);

      const fullImage = document.querySelector('.cardFullImage');
      const cardImage = workCard.getAttribute('imageFull');
      //backup in case fullImage not yet loaded
      fullImage.setAttribute('src', workCard.querySelector('.cardPreviewImage').getAttribute('src'));
      fullImage.setAttribute('src', cardImage);

      const fullTitle = document.querySelector('.cardFullTitle');
      const cardTitle = workCard.querySelector('.cardTitle');
      fullTitle.innerHTML = cardTitle.innerHTML;

      const fullLinks = document.querySelector('.cardFullLinks');
      const cardLinks = workCard.getAttribute('cardLinks');
      fullLinks.innerHTML = "";
      if(!cardLinks == "") {
        let linksSplit = cardLinks.split(" ");
        // console.log(linksSplit);
        do {
          let linkType = linksSplit.shift();
          let link = linksSplit.shift();
          console.log(linksSplit);
          let appendLink = document.createElement('a');
          if(linkType == "github") {
            appendLink.innerHTML = "<div class=\"cardFullLinkImage\"><svg role=\"img\" viewBox=\"0 0 450 450\" xmlns=\"http://www.w3.org/2000/svg\"><title>GitHub</title><circle cx=\"225\" cy=\"225\" r=\"225\"/><path d=\"m281.65 442.75c-187.77-295.17-93.883-147.58 0 0zm0 0c-0.45176-1.3273-0.69141-2.7588-0.69141-4.3066v-63.359c0-19.419-5.0781-33.635-15.23-42.641 11.131-1.2012 21.139-3.0095 30.027-5.4141 8.8841-2.4045 18.068-6.3064 27.541-11.713 9.4711-5.4023 17.382-12.06 23.734-19.971 6.3455-7.912 11.52-18.416 15.521-31.533 3.9967-13.115 6.0059-28.177 6.0059-45.193 0-24.224-7.7197-44.848-23.148-61.867 7.23-18.216 6.4458-38.636-2.3398-61.26-5.4713-1.8039-13.387-0.7015-23.738 3.3008-10.345 4.0044-19.334 8.4099-26.947 13.217l-11.133 7.2051c-18.168-5.2035-36.92-7.8066-56.254-7.8066-19.334 0-38.083 2.6032-56.25 7.8066-3.1256-2.1984-7.2734-4.9088-12.451-8.1074-5.1778-3.1997-13.33-7.0594-24.463-11.564-11.131-4.503-19.531-5.8567-25.195-4.0527-8.5948 22.623-9.2768 43.044-2.0488 61.26-15.43 17.019-23.146 37.636-23.146 61.865 0 17.017 2.001 32.031 6.0039 45.047 4.0008 13.01 9.1298 23.524 15.379 31.533 6.248 8.0046 14.11 14.716 23.586 20.119 9.4711 5.4107 18.651 9.3123 27.535 11.717 8.8893 2.4014 18.898 4.2071 30.029 5.4062-7.8098 7.2062-12.596 17.516-14.354 30.936-4.1034 2.0006-8.4994 3.5045-13.184 4.5059-4.6894 0.9961-10.255 1.498-16.699 1.498s-12.842-2.1499-19.188-6.4551c-6.3506-4.3052-11.765-10.561-16.26-18.771-3.7115-6.4036-8.4464-11.608-14.207-15.611-5.7637-4.0065-10.596-6.4045-14.502-7.207l-5.8574-0.89648c-4.1034 0-6.9313 0.43825-8.4961 1.3418-1.5648 0.90354-2.0518 2.0548-1.4648 3.459 0.58591 1.4032 1.4629 2.8051 2.6348 4.2051 1.1729 1.4 2.4418 2.6052 3.8086 3.6055l2.0508 1.5058c4.2964 2.0017 8.5442 5.8028 12.744 11.41 4.1999 5.6021 7.2739 10.714 9.2266 15.314l2.9297 6.9102c2.5396 7.6028 6.8366 13.762 12.889 18.467 6.0551 4.7049 12.596 7.7071 19.629 9.002 7.0299 1.3064 13.819 2.0099 20.359 2.1035 6.5436 0.0968 11.965-0.24597 16.262-1.0527l6.7383-1.1934c0 7.6017 0.0459 16.51 0.14648 26.723 0.0975 10.212 0.14844 15.616 0.14844 16.217 0 1.5698-0.25558 3.0183-0.73828 4.3613 18.423 4.7711 37.377 7.1856 56.408 7.1856 19.114-6.7e-4 38.15-2.437 56.648-7.25zm-113.06 0.0645c-112.39-295.21-56.197-147.6 0 0z\" fill=\"#fff\"/></svg></div>GitHub";
          }
          if(linkType == "site") {
            appendLink.innerHTML = "<div class=\"cardFullLinkImage\"><svg role=\"img\" viewBox=\"0 0 119.06 119.06\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"59.531\" cy=\"59.531\" r=\"59.531\"/><g transform=\"matrix(1.0833 0 0 1.0833 1.701 -13.282)\" fill=\"#fff\" shape-rendering=\"auto\"><path d=\"m32.592 35.463c-6.0268 0-10.961 4.9358-10.961 10.963v41.576c0 6.0268 4.9338 10.961 10.961 10.961h41.578c6.0268 0 10.961-4.9343 10.961-10.961v-26.08h-5.2912v26.08c0 3.1868-2.4832 5.6699-5.6699 5.6699h-41.578c-3.1867 0-5.6679-2.4832-5.6679-5.6699v-41.576c0-3.1867 2.4811-5.6699 5.6679-5.6699h26.081v-5.2927z\" color=\"#000000\" color-rendering=\"auto\" dominant-baseline=\"auto\" image-rendering=\"auto\" solid-color=\"#000000\" stop-color=\"#000000\" style=\"font-feature-settings:normal;font-variant-alternates:normal;font-variant-caps:normal;font-variant-east-asian:normal;font-variant-ligatures:normal;font-variant-numeric:normal;font-variant-position:normal;font-variation-settings:normal;inline-size:0;isolation:auto;mix-blend-mode:normal;shape-margin:0;shape-padding:0;text-decoration-color:#000000;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-orientation:mixed;text-transform:none;white-space:normal\"/><path d=\"m63.965 35.464v5.2912h12.133l-29.879 29.878 3.7424 3.7424 29.879-29.878v12.133h5.2912v-21.167z\" color=\"#000000\" color-rendering=\"auto\" dominant-baseline=\"auto\" image-rendering=\"auto\" solid-color=\"#000000\" stop-color=\"#000000\" style=\"font-feature-settings:normal;font-variant-alternates:normal;font-variant-caps:normal;font-variant-east-asian:normal;font-variant-ligatures:normal;font-variant-numeric:normal;font-variant-position:normal;font-variation-settings:normal;inline-size:0;isolation:auto;mix-blend-mode:normal;shape-margin:0;shape-padding:0;text-decoration-color:#000000;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-orientation:mixed;text-transform:none;white-space:normal\"/></g></svg></div>Visit Website";
          }
          fullLinks.appendChild(appendLink);
          appendLink.href = link;
          appendLink.target = "_blank";
        } while(linksSplit.length > 0);
      }

      const fullDesc = document.querySelector('.cardFullDescription');
      const cardDesc = workCard.getAttribute('descFull');
      fullDesc.innerHTML = cardDesc;

    })
  })

  cardOverlay.addEventListener("click", (e) => {
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
