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

const main = () => {
  navSlide();
  linkAnimation();
}

main();
