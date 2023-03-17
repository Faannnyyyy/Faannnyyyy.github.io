/* const { AOS } = require("./assets/aos/aos"); */

    //NAVBAR
    let lastScrollTop = 0;
    navbar = document.getElementById('navbar')
    
    window.addEventListener('scroll', function() {
      const scrollTop = window.pageTOFFset ||
      this.document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        navbar.style.top="-50px";
      } else {
        navbar.style.top="0";
      }
      lastScrollTop = scrollTop;
    });

    
    //TYPED
  var typed3 = new Typed('.typed', {
    strings: ["À la recherche active d'un nouvel emploi, j'aime me sentir utile , je suis curieuse et persévérante. J'aime me donner de nouveaux objectifs. Je veux enrichir mes compétences et connaissances que ce soit dans mon domaine de formation ou dans un autre. Je suis polyvalente, j'aime m'adapter à de nouvelles situations et enrichir mon expérience personnelle. "],
    stypeSpeed: 10, // this is a default  
  });

  // COMPTEUR LIVE
  let compteur = 0;

  $(window).scroll(function() {

    const top = $('.counter').offset().top 
    window.innerHeight;

    if (compteur == 0 && $(window).scrollTop() > top) {
    $('.counter-value').each(function() {
        let $this =$(this),
          countTo = $this.attr('data-count');
       $({
        countNum: $this.text()
       }).animate({
        countNum : countTo
       },
       {
        duration: 10000,
        easing: 'swing',
        step: function() {
            $this.text(Math.floor(this.countNum));
        },
        complete: function() {
            $this.text(this.countNum);
        }
       });
    });
    compteur = 1;
  }
});

//AOS
/* AudioScheduledSourceNode.init(); */

/* Aos.init(); */

AOS.init();