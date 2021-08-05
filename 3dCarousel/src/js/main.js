(function () {
  const carouselUl = document.querySelector(".carousel-list");
  const imageInput = document.querySelector("#image-upload-input");
  const prevButton = document.querySelector(".prev-btn");
  const nextButton = document.querySelector(".next-btn");

  function changeTransform() {
    const items = document.querySelectorAll(".carousel-item");
  }

  function moveNext() {
    const items = document.querySelectorAll(".carousel-item");

    if (items.length > 1) {
      const currentItem = document.querySelector(".now");
      const next = currentItem.nextElementSibling;
      carouselUl.appendChild(currentItem);
      currentItem.classList.remove("now");
      next.classList.add("now");
    }
  }

  function movePrev() {
    const items = document.querySelectorAll(".carousel-item");

    if (items.length > 1) {
      const currentItem = document.querySelector(".now");
      const last = carouselUl.lastElementChild;

      carouselUl.insertBefore(last, items[0]);
      currentItem.classList.remove("now");
      last.classList.add("now");
    }
  }

  function createTag(imgUrl) {
    const list = document.createElement("li");
    const img = document.createElement("img");
    list.classList.add("carousel-item");
    img.src = imgUrl;
    list.appendChild(img);

    const items = document.querySelectorAll(".carousel-item");
    items.forEach((element) => {
      element.classList.remove("now");
    });
    list.classList.add("now");

    return list;
  }

  function uploadImg(value) {
    const items = document.querySelectorAll(".carousel-item");

    if (value.files) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const imgUrl = e.target.result;
        carouselUl.insertBefore(createTag(imgUrl), items[0]);
      };
      reader.readAsDataURL(value.files[0]);
    }
  }

  imageInput.addEventListener("change", (e) => {
    uploadImg(e.target);
  });
  nextButton.addEventListener("click", moveNext);
  prevButton.addEventListener("click", movePrev);
})();
