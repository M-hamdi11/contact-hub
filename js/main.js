var save = document.querySelector("#save");
var update = document.querySelector("#update");
var full_name = document.querySelector("#full-name");
var phone_number = document.querySelector("#phone-number");
var email_address = document.querySelector("#email");
var address_info = document.querySelector("#address");
var group_info = document.querySelector("#group");
var notes_info = document.querySelector("#Notes");
var fav_check = document.querySelector("#fav");
var emer_check = document.querySelector("#emer");
var add_contact = document.querySelector("#add-contact");
var search = document.querySelector("#search-input");
var update_index;
var favourites;
var emergencys;
var  dublicate_index;
search.addEventListener("input", searching);
add_contact.addEventListener("click", function () {
  update.style.display = "none";
  save.style.display = "block";
});
if (localStorage.getItem("information") != null) {
  contacts = JSON.parse(localStorage.getItem("information"));
  display();
} else {
  contacts = [];
}
function add_profile() {
if(validateName()&&validatephone()&&dublicate_num()){
  var profile = {
    full_name: full_name.value,
    phone_number: phone_number.value,
    email_address: email_address.value,
    address_info: address_info.value,
    group_info: group_info.value,
    notes_info: notes_info.value,
    fav_info: fav_check.checked,
    emer_info: emer_check.checked,
  };
  contacts.push(profile);
  localStorage.setItem("information", JSON.stringify(contacts));
  Swal.fire({
    title: "Added!",
    icon: "success",
    text: "contact has been added successfully",
    draggable: true,
  });

  full_name.value = "";
  phone_number.value = "";
  email_address.value = "";
  address_info.value = "";
  notes_info.value = "";
  display();
  console.log(contacts);
}

else if(validateName()){

  Swal.fire({
    title: "Missing Phone",
    icon: "error",
    text: "Please enter a phone number!",
    draggable: true,
  });
}
else{
  Swal.fire({
    title: "Missing Name",
    icon: "error",
    text: "Please enter a name!",
    draggable: true,
  });
  
}
 if(!dublicate_num()&&validatephone()&&validateName()){
  phone_number.style.border="1px solid red";
  document.getElementById("phone-validation").classList.remove("d-none");
  Swal.fire({
    title: "Duplicate Phone Number",
    icon: "error",
    text: "A contact with this phone number already exists: "+contacts[dublicate_index].full_name,
    draggable: true,
  });
}


  
}
save.addEventListener("click", add_profile);
function display() {
  var cartoona1 = "";
  var cartoone2 = "";
  var cartoone3 = "";
  var cartoone4 = "";
  favourites = 0;
  emergencys = 0;

  for (var i = 0; i < contacts.length; i++) {
    if (contacts[i].fav_info) {
      favourites++;
    }
    if (contacts[i].emer_info) {
      emergencys++;
    }
    
    cartoona1 += `<div class="col-12 col-md-6">
                <div class="contact-test mt-5 rounded-3" id="contact-test">

                  <div class="p-4">
                    <div class="contact-par d-flex align-items-center gap-2" id="contact-par">
                       <div class="contact-char rounded-3 position-relative">
                        ${contacts[i].full_name.slice(0, 2)}
                         ${
                           contacts[i].fav_info
                             ? `<div class="star-c position-absolute">
                          <i class="fa-solid fa-star con-st"></i>
                        </div>`
                             : ""
                         }
                        ${
                          contacts[i].emer_info
                            ? `<div class="emer-c position-absolute">
                          <i class="fa-solid fa-heart-pulse con-st"></i>
                        </div>`
                            : ""
                        }

                      </div>
                      <div class="contact-name">
                        <p class="m-0 my-name">${contacts[i].full_name}</p>

                        <div class="number d-flex align-items-center gap-2">
                          <div class="phone">
                            <i class="fa-solid fa-phone"></i>
                          </div>
                          <p class="m-0 my-number">${
                            contacts[i].phone_number
                          }</p>
                        </div>
                      </div> 
                    </div>
                 
                   
                    <div class="email-location"id="email-location">
                    ${ contacts[i].email_address != "" ?
                       `<div class="message mt-3 d-flex align-items-center gap-2" >
                      <div class="message-icon">
                        <i class="fa-solid fa-envelope"></i>
                      </div>
                      <p class="m-0 my-email">${contacts[i].email_address}</p>
                    </div>`:""
                    }

                    ${contacts[i].address_info != "" ?
                    `<div class="location mt-1 d-flex align-items-center gap-2" id="location">
                      <div class="location-icon">
                        <i class="fa-solid fa-location-dot"></i>
                      </div>
                      <p class="m-0 my-email my-location">${
                        contacts[i].address_info
                      }</p>
                    </div>`:""
                    } 
                    </div>
                    

                
                    <div class="type mt-1 d-flex align-items-center gap-2 mt-3">
                      ${
                        contacts[i].group_info != "none"
                          ? `<div class="family" id="group-type">

                         <p class="m-0">${contacts[i].group_info}</p> 

                      </div>`
                          : ""
                      }
                    
                      ${
                        contacts[i].emer_info == true
                          ? `
                         <div id="emergency">
                          <div class="emergency">
                         <p class="m-0">
                          <i class="fa-solid fa-heart-pulse heart-em"></i>
                          Emergency
                        </p> 
                      </div>
  
                      </div>`
                          : ""
                      }
                        

                     </div>

                  </div>
                   <div
                    class="contact-footer mt-4 d-flex justify-content-between rounded-3"
                  >
                    <div class="d-flex align-items-center gap-2">
                      <div class="phone2">
                        <i class="fa-solid fa-phone"></i>
                      </div>
                      <div class="message2">
                        <i class="fa-solid fa-envelope"></i>
                      </div>
                    </div>

                    <div class="icons d-flex align-items-center gap-2">
                      
                    ${
                      contacts[i].fav_info == false
                        ? `<div class="star-i" id="star-icon" onclick="star_click(${i})">
                        <i class="fa-regular fa-star"></i>
                      </div>`
                        : `<div class="star-i-clicked" id="star-icon" onclick="star_click(${i})">
                        <i class="fa-solid fa-star"></i>
                      </div>`
                    }
                     ${
                       contacts[i].emer_info == false
                         ? `<div class="emrer-i" id="emrer-icon" onclick="emer_click(${i})">
                        <i class="fa-regular fa-heart"></i>
                      </div>`
                         : `<div class="emrer-i-clicked" id="emrer-icon" onclick="emer_click(${i})">
                        <i class="fa-solid fa-heart-pulse"></i>
                      </div>`
                     }

                      <div class="pen" id="edit-card" 
                      type="button"
                    data-bs-toggle="modal"
                   data-bs-target=".modal"
                   onclick="edit_item(${i})">
                        <i class="fa-solid fa-pen"></i>
                      </div>
                      <div class="delete" id="delete-card" onclick="delete_alert(${i})">
                        <i class="fa-solid fa-trash"></i>
                      </div>
                    </div>
                  </div> 
                </div>

              </div>`;

    if (contacts[i].fav_info) {
      cartoone3 += `
   <div
                    class="col-12 col-md-6 col-lg-12 d-flex justify-content-between align-items-center fav-contact-card p-2"
                  >

                    <div class="contact-par d-flex align-items-center gap-2">
                      <div
                        class="contact-char rounded-3 position-relative contact-char2"
                      >
                        ${contacts[i].full_name.slice(0, 2)}
                      </div>
                      <div class="contact-name">
                        <p class="m-0 my-name">${contacts[i].full_name}</p>

                        <div class="number d-flex align-items-center gap-2">
                          <p class="m-0 my-number">${
                            contacts[i].phone_number
                          }</p>
                        </div>
                      </div>
                    </div>

                    <div class="phone2 phone-fav">
                      <i class="fa-solid fa-phone"></i>
                    </div>
                  </div>
`;
    }

    if (contacts[i].emer_info) {
      cartoone4 += `
   <div
                    class="col-12 col-md-6 col-lg-12 d-flex justify-content-between align-items-center fav-contact-card em-contact-card p-2"
                  >
                    <div class="contact-par d-flex align-items-center gap-2">
                      <div
                        class="contact-char rounded-3 position-relative contact-char2"
                      >
                        ${contacts[i].full_name.slice(0, 2)}
                      </div>
                      <div class="contact-name">
                        <p class="m-0 my-name">${contacts[i].full_name}</p>

                        <div class="number d-flex align-items-center gap-2">
                          <p class="m-0 my-number">${
                            contacts[i].phone_number
                          }</p>
                        </div>
                      </div>
                    </div>

                    <div class="phone2 phone-em">
                      <i class="fa-solid fa-phone"></i>
                    </div>
                  </div>
`;
    }
  }
  cartoone2 = `<div class="col-6 col-md-4">
  <div class="cardd rounded-3">
    <div class="cards-i d-flex align-items-center gap-3 rounded-3">
      <div class="users">
        <i class="fa-solid fa-users"></i>
      </div>
      <div class="quaintity">
        <p class="m-0 card-pp gray">Total</p>
        <p class="m-0 total-num">${contacts.length}</p>
      </div>
    </div>
  </div>
</div>

<div class="col-6 col-md-4">
  <div class="cardd rounded-3">
    <div class="cards-i d-flex align-items-center gap-3 rounded-3">
      <div class="Favorites users">
        <i class="fa-solid fa-star"></i>
      </div>
      <div class="quaintity">
        <p class="m-0 card-pp gray">Favorites</p>
        <p class="m-0 total-num">${favourites}</p>
      </div>
    </div>
  </div>
</div>

<div class="col-6 col-md-4">
  <div class="cardd rounded-3">
    <div class="cards-i d-flex align-items-center gap-3 rounded-3">
      <div class="Emergency users">
        <i class="fa-solid fa-heart-pulse"></i>
      </div>
      <div class="quaintity">
        <p class="m-0 card-pp gray">Emergency</p>
        <p class="m-0 total-num"> ${emergencys}</p>
      </div>
    </div>
  </div>
  </div>

  `;
  if (favourites == 0) {
    document.getElementById("no-fav").classList.remove("d-none");
    document.getElementById("no-fav").classList.add("d-block");
  } else {
    document.getElementById("no-fav").classList.remove("d-block");
    document.getElementById("no-fav").classList.add("d-none");
  }

  if (emergencys == 0) {
    document.getElementById("no-em").classList.remove("d-none");
    document.getElementById("no-em").classList.add("d-block");
  } else {
    document.getElementById("no-em").classList.remove("d-block");
    document.getElementById("no-em").classList.add("d-none");
  }
  if (contacts.length > 0) {
    document.getElementById("before-adding").classList.add("d-none");
  } else {
    document.getElementById("before-adding").classList.remove("d-none");
  }

  document.getElementById("contact-card").innerHTML = cartoona1;
  document.getElementById("totals").innerHTML = cartoone2;
  document.getElementById("fav-contacts").innerHTML = cartoone3;
  document.getElementById("em-contacts").innerHTML = cartoone4;
  document.getElementById(
    "contacts-title-num"
  ).innerHTML = `Manage and organize your ${contacts.length} contacts`;
}
function delete_alert(index) {
  Swal.fire({
    title: "Delete Contact?",
    text: `Are you sure you want to delete ${contacts[index].full_name}? This action cannot be undone.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#606773",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      contacts.splice(index, 1);
      localStorage.setItem("information", JSON.stringify(contacts));
      display();
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    }
  });
}
function edit_item(index) {
  update_index = index;
  full_name.value = contacts[index].full_name;
  phone_number.value = contacts[index].phone_number;
  email_address.value = contacts[index].email_address;
  address_info.value = contacts[index].address_info;
  group_info.value = contacts[index].group_info;
  notes_info.value = contacts[index].notes_info;
  fav_check.checked = contacts[index].fav_info;
  emer_check.checked = contacts[index].emer_info;
  update.style.display = "block";
  save.style.display = "none";
}
update.addEventListener("click", update_profile);
function update_profile() {
  var profile = {
    full_name: full_name.value,
    phone_number: phone_number.value,
    email_address: email_address.value,
    address_info: address_info.value,
    group_info: group_info.value,
    notes_info: notes_info.value,
    fav_info: fav_check.checked,
    emer_info: emer_check.checked,
  };
  contacts.splice(update_index, 1, profile);
  localStorage.setItem("information", JSON.stringify(contacts));
  Swal.fire({
    title: "Updated!",
    icon: "success",
    text: "contact has been updated successfully",
    draggable: true,
  });

  display();
}
function searching() {
  var searchValue = search.value.toLowerCase();
  var cartoona1 = "";
  var cartoone2 = "";
  var cartoone3 = "";
  var cartoone4 = "";
  var searchcount = 0;
  favourites = 0;
  emergencys = 0;

  for (var i = 0; i < contacts.length; i++) {
    if (
      contacts[i].full_name.toLowerCase().includes(searchValue) ||
      contacts[i].phone_number.toLowerCase().includes(searchValue) ||
      contacts[i].email_address.toLowerCase().includes(searchValue)
    ) {
      searchcount++;
      if (contacts[i].fav_info) {
        favourites++;
      }
      if (contacts[i].emer_info) {
        emergencys++;
      }
      cartoona1 += `<div class="col-12 col-md-6">
                <div class="contact-test mt-5 rounded-3" id="contact-test">

                  <div class="p-4">
                    <div class="contact-par d-flex align-items-center gap-2" id="contact-par">
                       <div class="contact-char rounded-3 position-relative">
                        ${contacts[i].full_name.slice(0, 2)}
                         ${
                           contacts[i].fav_info
                             ? `<div class="star-c position-absolute">
                          <i class="fa-solid fa-star con-st"></i>
                        </div>`
                             : ""
                         }
                        ${
                          contacts[i].emer_info
                            ? `<div class="emer-c position-absolute">
                          <i class="fa-solid fa-heart-pulse con-st"></i>
                        </div>`
                            : ""
                        }

                      </div>
                      <div class="contact-name">
                        <p class="m-0 my-name">${contacts[i].full_name}</p>

                        <div class="number d-flex align-items-center gap-2">
                          <div class="phone">
                            <i class="fa-solid fa-phone"></i>
                          </div>
                          <p class="m-0 my-number">${
                            contacts[i].phone_number
                          }</p>
                        </div>
                      </div> 
                    </div>
                 

                    <div class="email-location"id="email-location">

                    ${ contacts[i].email_address != "" ?
                      `<div class="message mt-3 d-flex align-items-center gap-2" >
                     <div class="message-icon">
                       <i class="fa-solid fa-envelope"></i>
                     </div>
                     <p class="m-0 my-email">${contacts[i].email_address}</p>
                   </div>`:""
                   }


                    ${contacts[i].address_info != "" ?
                    `<div class="location mt-1 d-flex align-items-center gap-2" id="location">
                      <div class="location-icon">
                        <i class="fa-solid fa-location-dot"></i>
                      </div>
                      <p class="m-0 my-email my-location">${
                        contacts[i].address_info
                      }</p>
                    </div>`:""
                    } 
                    </div>

                
                    <div class="type mt-1 d-flex align-items-center gap-2 mt-3">
                      ${
                        contacts[i].group_info != "none"
                          ? `<div class="family" id="group-type">

                         <p class="m-0">${contacts[i].group_info}</p> 

                      </div>`
                          : ""
                      }
                    
                      ${
                        contacts[i].emer_info == true
                          ? `
                         <div id="emergency">
                          <div class="emergency">
                         <p class="m-0">
                          <i class="fa-solid fa-heart-pulse heart-em"></i>
                          Emergency
                        </p> 
                      </div>
  
                      </div>`
                          : ""
                      }
                        

                     </div>

                  </div>
                   <div
                    class="contact-footer mt-4 d-flex justify-content-between rounded-3"
                  >
                    <div class="d-flex align-items-center gap-2">
                      <div class="phone2">
                        <i class="fa-solid fa-phone"></i>
                      </div>
                      <div class="message2">
                        <i class="fa-solid fa-envelope"></i>
                      </div>
                    </div>

                    <div class="icons d-flex align-items-center gap-2">
   ${
     contacts[i].fav_info == false
       ? `<div class="star-i" id="star-icon" onclick="star_click(${i})">
                        <i class="fa-regular fa-star"></i>
                      </div>`
       : `<div class="star-i-clicked" id="star-icon" onclick="star_click(${i})">
                        <i class="fa-solid fa-star"></i>
                      </div>`
   }
                     ${
                       contacts[i].emer_info == false
                         ? `<div class="emrer-i" id="emrer-icon" onclick="emer_click(${i})">
                        <i class="fa-regular fa-heart"></i>
                      </div>`
                         : `<div class="emrer-i-clicked" id="emrer-icon" onclick="emer_click(${i})">
                        <i class="fa-solid fa-heart-pulse"></i>
                      </div>`
                     }

                      <div class="pen" id="edit-card" 
                      type="button"
                    data-bs-toggle="modal"
                   data-bs-target=".modal"
                   onclick="edit_item(${i})">
                        <i class="fa-solid fa-pen"></i>
                      </div>
                      <div class="delete" id="delete-card" onclick="delete_alert(${i})">
                        <i class="fa-solid fa-trash"></i>
                      </div>
                    </div>
                  </div> 
                </div>

              </div>`;

      if (contacts[i].fav_info) {
        cartoone3 += `
   <div
                    class="col-12 col-md-6 col-lg-12 d-flex justify-content-between align-items-center fav-contact-card p-2"
                  >

                    <div class="contact-par d-flex align-items-center gap-2">
                      <div
                        class="contact-char rounded-3 position-relative contact-char2"
                      >
                        ${contacts[i].full_name.slice(0, 2)}
                      </div>
                      <div class="contact-name">
                        <p class="m-0 my-name">${contacts[i].full_name}</p>

                        <div class="number d-flex align-items-center gap-2">
                          <p class="m-0 my-number">${
                            contacts[i].phone_number
                          }</p>
                        </div>
                      </div>
                    </div>

                    <div class="phone2 phone-fav">
                      <i class="fa-solid fa-phone"></i>
                    </div>
                  </div>
`;
      }

      if (contacts[i].emer_info) {
        cartoone4 += `
   <div
                    class="col-12 col-md-6 col-lg-12 d-flex justify-content-between align-items-center fav-contact-card em-contact-card p-2"
                  >
                    <div class="contact-par d-flex align-items-center gap-2">
                      <div
                        class="contact-char rounded-3 position-relative contact-char2"
                      >
                        ${contacts[i].full_name.slice(0, 2)}
                      </div>
                      <div class="contact-name">
                        <p class="m-0 my-name">${contacts[i].full_name}</p>

                        <div class="number d-flex align-items-center gap-2">
                          <p class="m-0 my-number">${
                            contacts[i].phone_number
                          }</p>
                        </div>
                      </div>
                    </div>

                    <div class="phone2 phone-em">
                      <i class="fa-solid fa-phone"></i>
                    </div>
                  </div>
`;
      }
    }
    indeex = i;
  }
  cartoone2 = `<div class="col-6 col-md-4">
  <div class="cardd rounded-3">
    <div class="cards-i d-flex align-items-center gap-3 rounded-3">
      <div class="users">
        <i class="fa-solid fa-users"></i>
      </div>
      <div class="quaintity">
        <p class="m-0 card-pp gray">Total</p>
        <p class="m-0 total-num">${contacts.length}</p>
      </div>
    </div>
  </div>
</div>

<div class="col-6 col-md-4">
  <div class="cardd rounded-3">
    <div class="cards-i d-flex align-items-center gap-3 rounded-3">
      <div class="Favorites users">
        <i class="fa-solid fa-star"></i>
      </div>
      <div class="quaintity">
        <p class="m-0 card-pp gray">Favorites</p>
        <p class="m-0 total-num">${favourites}</p>
      </div>
    </div>
  </div>
</div>

<div class="col-6 col-md-4">
  <div class="cardd rounded-3">
    <div class="cards-i d-flex align-items-center gap-3 rounded-3">
      <div class="Emergency users">
        <i class="fa-solid fa-heart-pulse"></i>
      </div>
      <div class="quaintity">
        <p class="m-0 card-pp gray">Emergency</p>
        <p class="m-0 total-num"> ${emergencys}</p>
      </div>
    </div>
  </div>
  </div>

  `;
  if (favourites == 0) {
    document.getElementById("no-fav").classList.remove("d-none");
    document.getElementById("no-fav").classList.add("d-block");
  } else {
    document.getElementById("no-fav").classList.remove("d-block");
    document.getElementById("no-fav").classList.add("d-none");
  }

  if (emergencys == 0) {
    document.getElementById("no-em").classList.remove("d-none");
    document.getElementById("no-em").classList.add("d-block");
  } else {
    document.getElementById("no-em").classList.remove("d-block");
    document.getElementById("no-em").classList.add("d-none");
  }
  if (searchcount== 0) {
    document.getElementById("before-adding").classList.remove("d-none");
    document.getElementById("before-adding").classList.add("d-block");
  } else if(searchcount > 0){ 
    document.getElementById("before-adding").classList.remove("d-block");
    document.getElementById("before-adding").classList.add("d-none");
  }

  document.getElementById("contact-card").innerHTML = cartoona1;
  document.getElementById("totals").innerHTML = cartoone2;
  document.getElementById("fav-contacts").innerHTML = cartoone3;
  document.getElementById("em-contacts").innerHTML = cartoone4;
  document.getElementById(
    "contacts-title-num"
  ).innerHTML = `Manage and organize your ${contacts.length} contacts`;
}

function star_click(indeex) {
  if (contacts[indeex].fav_info == true) {
    contacts[indeex].fav_info = false;
    localStorage.setItem("information", JSON.stringify(contacts));
    display();
  } else {
    contacts[indeex].fav_info = true;
    localStorage.setItem("information", JSON.stringify(contacts));
    display();
  }
}
function emer_click(indeex) {
  if (contacts[indeex].emer_info == true) {
    contacts[indeex].emer_info = false;
    localStorage.setItem("information", JSON.stringify(contacts));
    display();
  } else {
    contacts[indeex].emer_info = true;
    localStorage.setItem("information", JSON.stringify(contacts));
    display();
  }
}
//+++++++++++++++++++++++++++++++++++++++ valiation+++++++++++++++++++++++++++++++++++++++++++++++++++

function validateName() {
  var full_name_regex = /^[A-Za-z ]{2,50}$/;
  var name_text = full_name.value;
  if( full_name_regex.test(name_text) ){
    full_name.style.border = "1px solid green";
    document.getElementById("name-validation").classList.add("d-none");
    return true;
  }else{
     full_name.style.border = "1px solid red";
     document.getElementById("name-validation").classList.remove("d-none");
     return false;

  }

 
}

function validatephone(){
  var phone_regex=/^(01)[0-2,5]{1}[0-9]{8}$/;
  var phone_text=phone_number.value;
  if(phone_regex.test(phone_text)){
    phone_number.style.border="1px solid green";
    document.getElementById("phone-validation").classList.add("d-none");
    return true;
  }else{
    phone_number.style.border="1px solid red";
    document.getElementById("phone-validation").classList.remove("d-none");
    return false;
  }
}
function validate_email(){
  var email_regex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  var email_text=email_address.value;
  if(email_regex.test(email_text)){
    email_address.style.border="1px solid green";
    document.getElementById("email-validation").classList.add("d-none");
    return true;
  }else{
    email_address.style.border="1px solid red";
    document.getElementById("email-validation").classList.remove("d-none");
    return false;
  }
}
function dublicate_num(){
 for(i=0;i<contacts.length;i++){
  if(contacts[i].phone_number===phone_number.value){
    dublicate_index=i;
    return false;
    
  }

 }
 return true;


}