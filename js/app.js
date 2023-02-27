const loadPhones = async (searchText, dataLimit) => {
  //   console.log(searchText);
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data, dataLimit);
};

//display phones
const displayPhones = (phones, dataLimit) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = "";

  //display 10 phones only
  const showAll = document.getElementById("show-all");
  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 10);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }

  //no found display
  const noPhone = document.getElementById("no-found-message");
  if (phones.length === 0) {
    noPhone.classList.remove("d-none");
  } else {
    noPhone.classList.add("d-none");
  }

  //display phones
  phones.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
    <div class="card p-4">
              <img src="${phone.image}" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
                <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" id="loadDEtails" data-bs-toggle="modal"
                data-bs-target="#phoneDetailsModal">Show Details</button>
                
              </div>
            </div>
    `;
    phoneContainer.appendChild(phoneDiv);
  });
  //stop loader
  toggleSpinner(false);
};

// const searchPhones = () => {
//   const searchField = document.getElementById("search-field");
//   const searchText = searchField.value;
//   loadAllData(searchText);
// };

const searchProcess = (dataLimit) => {
  // start loader
  toggleSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;

  loadPhones(searchText, dataLimit);
};

//handle search button click
document.getElementById("search-btn").addEventListener("click", function () {
  searchProcess(10);
});

//search input field enter key handler
document.getElementById("search-field").addEventListener("keyup", function (e) {
  //keypress also allowed
  if (e.key === "Enter") {
    searchProcess(10);
  }
});

//spinner function
const toggleSpinner = (isLoading) => {
  const loader = document.getElementById("loader");
  if (isLoading) {
    loader.classList.remove("d-none");
  } else {
    loader.classList.add("d-none");
  }
};

//show phone details
const loadPhoneDetails = async (id) => {
  url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);
};
const displayPhoneDetails = (phone) => {
  console.log(phone);
  document.getElementById("phoneDetailsModalLabel").innerText = phone.name;
  document.getElementById("phone-details").innerHTML = `
  <p>Released date : ${
    phone.releaseDate ? phone.releaseDate : "no Release Date Found"
  }</p>
  <p>Storage : ${
    phone.mainFeatures ? phone.mainFeatures.storage : "no storage information"
  }</p>
  <p>Bluetooth : ${
    phone.others ? phone.others.Bluetooth : "no bluetooth information available"
  }</p>
  
  `;
};

//show all function
document.getElementById("show-all-btn").addEventListener("click", function () {
  searchProcess();
});
// loadPhones("iphone");
