function BodaSlider(sliderSelector, options = {}) {
  this.sliderContainer = document.querySelector(sliderSelector)
  this.slider = {
    el: this.sliderContainer.querySelector('.slides-container') || this.sliderContainer.querySelector(options.nodes.slidesContainer),
    slide: 0,

    get firstSlideMargin() {
      return parseFloat(this.firstSlide.style.marginLeft)
    },
    set firstSlideMargin(value) {
      this.firstSlide.style.marginLeft = value + 'px'
    },

    getSlide: num => this.slider.el.children[num],

    getSlideMargin: (slideNum, dir) => {

      const slide1 = this.slider.getSlide(slideNum - dir),
      slide2 = this.slider.getSlide(slideNum)

      if(dir > 0) return slide2.offsetLeft - (slide1.offsetLeft + slide1.offsetWidth)
      else if(dir < 0) return slide1.offsetLeft - (slide2.offsetLeft + slide2.offsetWidth)
    },

    move: dir => {
      if(this.slider.slide + dir < 0 || this.slider.maxSlide - 1 < this.slider.slide + dir) return

      this.slider.slide += dir
      this.slider.firstSlideMargin -= (this.slider.getSlide(this.slider.slide).offsetWidth + this.slider.getSlideMargin(this.slider.slide, dir)) * dir

      this.pagination.setPagination()
    }
  }

  this.slider.firstSlide = this.slider.el.firstElementChild
  this.slider.maxSlide = this.slider.el.children.length

  this.navigation = {
    next: this.sliderContainer.querySelector('.arrows-container .next') || this.sliderContainer.querySelector(options.navigation.elNext),
    prev: this.sliderContainer.querySelector('.arrows-container .prev') || this.sliderContainer.querySelector(options.navigation.elPrev)
  }
  this.pagination = {
    type: options.pagination.type,
    el: this.sliderContainer.querySelector(options.pagination.el),
    setPagination: () => {
      if(this.pagination.el) {
        if(this.pagination.type = 'numeric') this.pagination.el.innerText = this.slider.slide + 1 + '/' +  this.slider.maxSlide
      }   
    }
  }

  this.slider.firstSlide.style.marginLeft = 0

  this.navigation.next?.addEventListener('click', () => this.slider.move(1))
  this.navigation.prev?.addEventListener('click', () => this.slider.move(-1))

  this.pagination.setPagination()
}
