console.log(
  "%c[app.js] Loaded 🕷️🕸️",
  "background-color:pink; padding:10px; color:black;"
);

class Gallery {
  constructor(images, container) {
    this.images = images;
    this.container = container;

    this.galleryIndex = 0;
  }

  next = () => {
    if (this.galleryIndex === this.images.length - 1) {
      this.galleryIndex = 0;
    } else {
      this.galleryIndex++;
    }
    this.updateImage(this.images[this.galleryIndex]);
  };

  prev = () => {
    this.galleryIndex--;
    if (this.galleryIndex < 0) {
      this.galleryIndex = this.images.length - 1;
    }
    this.updateImage(this.images[this.galleryIndex]);
  };

  updateImage(image) {
    this.container
      .find(
        ".gallery-container .gallery__image img, .gallery-container .gallery__backdrop img"
      )
      .attr("src", image);

    this.container
      .find(".gallery__thumbnails")
      .empty()
      .append(this.generateThumbs());
    this.container.find(".gallery__thumbnail").click(this.handleThumbnail);
  }

  render() {
    this.container.empty();
    this.container.append(`<div class="gallery-container">
        <div class="gallery__image">
          <img src="" alt="" />
        </div>
        <div class="gallery__backdrop">
          <img src="" alt="" />
        </div>

        <div class="gallery__actions">
          <button id="prev">Prev</button>
          <button id="next">Next</button>
        </div>

        <div class="gallery__thumbnails">
          ${this.generateThumbs()}
        </div>

      </div>`);

    this.updateImage(this.images[this.galleryIndex]);

    this.container.on("click", "#prev", this.prev);
    this.container.on("click", "#next", this.next);

    this.container.find(".gallery__thumbnail").click(this.handleThumbnail);
  }

  handleThumbnail = event => {
    this.galleryIndex = $(event.target).attr("data-index");
    this.updateImage(this.images[this.galleryIndex]);
  };

  generateThumbs() {
    return this.images
      .map((image, index) => {
        if (this.galleryIndex === index) {
          return `<div class="thumbnail--active  gallery__thumbnail"> <img data-index="${index}" src="${image}" /> </div>`;
        }

        return `<div class="gallery__thumbnail"> <img data-index="${index}" src="${image}" /> </div>`;
      })
      .join("");
  }
}

const gallery = new Gallery(
  [
    "images/gwen.png",
    "images/eyes.jpg",
    "images/miles.jpg",
    "https://wallpapercave.com/wp/wp3059181.jpg",
  ],
  $("#galleryOne")
);

const galleryTwo = new Gallery(
  ["images/eyes.jpg", "https://wallpapercave.com/wp/wp3059181.jpg"],
  $("#galleryTwo")
);

gallery.render();
// galleryTwo.render();
