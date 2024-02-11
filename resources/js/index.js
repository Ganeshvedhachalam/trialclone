const generateID = () => Math.random().toString(36).substr(2, 9);

const createAccordianItem = (title, id, currentIndex) => {
return `
<div class="accordian-item" id="card${id}">
  <h2 class="accordian-header" id="heading${id}">
    <button class="btn btn-link text-decoration-none" style="color:black;" aria-expanded="${currentIndex === 0 ? true : false}"
      type="button" data-bs-toggle="collapse"
      data-bs-target="#collapse${id}"
      aria-controls="collapse${id}">
      ${title}
    </button>
  </h2>
  <div id="collapse${id}" 
  class="collapse ${currentIndex === 0 ? 'show' : ''}" 
  data-bs-parent="#accordianId" aria-labelledby="heading${id}">
  </div>
</div>`;
};

const createCarouselItem = (item, active) =>{
  return `
  <div class="carousel-item ${active ? "active" : ""}">
    <div class="card d-block">
      <img class="card-img-top img-fluid carousel-img" src="${item["enclosure"]["link"]}" alt="Card Imagecap">
      <div class="card-body">
        <h5 class="card-title">${item["title"]}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${item["author"]}</h6>
        <p class="card-text">${item["description"]}</p>
        <a href="${item["link"]}" class="stretched-link" target="_blank"></a>
      </div>
    </div>
  </div>
  `;
};


const createCarouselOuter = (id, innerId) => {
  return `
  <div id="carouselControls${id}" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner" id="${innerId}"></div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselControls${id}" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselControls${id}" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
    </button>
</div>`;
};

const init = async () => {
//iterate over magazines array
for(let i = 0; i<magazines.length; i++)
  {
    let url = magazines[i];

    let response = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${encodeURI(url)}`
    );
    let data = await response.json();

    let accordianId = generateID();

    let accordian = createAccordianItem(data["feed"]["title"], accordianId, i);
    document.getElementById("accordianItemContainer").innerHTML += accordian;
   
    //create carousel
    let carouselId = generateID();
    let carouselInnerId = generateID();

    let carousel = createCarouselOuter(carouselId, carouselInnerId);
    document.getElementById(`collapse${accordianId}`).innerHTML = carousel;

    //create carousel item and push it to carousel inner
    //add the carousel item in carousel
    let items = data["items"];

    items.forEach((item, index) => {
      let carouselItem = createCarouselItem(item, index ===0);
      document.getElementById(`${carouselInnerId}`).innerHTML += carouselItem;
    });
  }
}
init();