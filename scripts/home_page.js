class Slider {
  constructor (prefix = string) {

    this.slider_content = document.querySelector(`${prefix} .carousel__viewport`);
    this.slides = this.slider_content.children;

    this.picSlideIndex = 0;
    this.nextSlideIndex = this.picSlideIndex;
    
    this.picSlide = this.slides[this.picSlideIndex];

    this.btnPrev = document.querySelector(`${prefix} .btn_prev`);
    this.btnNext = document.querySelector(`${prefix} .btn_next`);

    this.moveTiming = {duration: 500, easing: "ease-out", fill: "forwards"};
    this.swapTiming = {duration: 0, fill: "forwards"};
  }

  start () {

    this.calcOffset(this);
    addEventListener('resize', (event) => {
      this.calcOffset(this);
    })

    this.btnPrev.addEventListener('click', () => {
      this.funBtnPrev(this);
    });

    this.btnNext.addEventListener('click', () => {
      this.funBtnNext(this);
    });

    // this.slider_content.prepend(this.slides[this.lastSlideIndex].cloneNode(true));
    this.slider_content.append(this.slides[0].cloneNode(true));
    this.slider_content.append(this.slides[1].cloneNode(true));
    this.slider_content.append(this.slides[2].cloneNode(true));

    this.lastSlideIndex = this.slides.length - 3;
  }

  calcOffset (_this) {
    let elementStyles = window.getComputedStyle(this.picSlide);
    let width = parseFloat(elementStyles.getPropertyValue('width'));
    let margin = parseFloat(elementStyles.getPropertyValue('margin-right'));
    this.offset = width + margin;
    // alert(this.offsetString);
  }

  funBtnPrev (_this) {
    // alert('click btnPrev');
    this.nextSlideIndex = this.picSlideIndex - 1;
    if ( this.nextSlideIndex < 0 ) {
      this.nextSlideIndex = this.lastSlideIndex;
      
    };
    this.itemAnimation(this, this.moveTiming);
    this.picSlideIndex = this.nextSlideIndex;
  }

  funBtnNext (_this) {
    this.nextSlideIndex = this.picSlideIndex + 1;
    if ( this.nextSlideIndex > this.lastSlideIndex ) {
      this.swapSlider(this)
      this.nextSlideIndex =  + 1;
    };
    this.itemAnimation(this, this.moveTiming);
    this.picSlideIndex = this.nextSlideIndex;
  }

  itemAnimation(_this, timing) {
    this.slider_content.animate(this.moveContainer(this), timing);
  }

  swapSlider (_this) {
    this.nextSlideIndex = (this.nextSlideIndex < 0) ? this.lastSlideIndex : 0;
    // alert(this.nextSlideIndex);
    this.itemAnimation(this, this.swapSlider);
    this.picSlideIndex = this.nextSlideIndex;
    return this.picSlideIndex;
  }

  moveContainer(_this) {
    return [
      {transform: `translateX(-${this.picSlideIndex * this.offset}px)`},
      {transform: `translateX(-${this.nextSlideIndex * this.offset}px)`}
    ]
  }

};

let slider1 = new Slider('.developersportfolio');
let slider2 = new Slider('.artistsportfolio');

slider1.start();
slider2.start();
