/* start all global variable */
var userData = [];
var profile_pic = document.querySelector('#profile-pic')
var uploadpic = document.querySelector('#upload-field');
var idE1 = document.getElementById('id');
var nameE1 = document.getElementById('name');
var lstName = document.getElementById('lname');
var emailE1 = document.getElementById('email');
var offCode = document.getElementById('ofcode');
var jobTitle = document.getElementById('jbTtl');
var registerBtn = document.querySelector('#register-btn');
var updateBtn = document.querySelector('#update-btn');
var registerForm = document.querySelector('#register-form');
var allInput = registerForm.querySelectorAll("INPUT");
var imgUrl;

/* end all global variable */







//  start for control coding 
var addBtn = document.querySelector('#add-btn');

var modal = document.querySelector('.modal');

var closeBtn = document.querySelector('.close-icon')

addBtn.onclick = function () {
  modal.classList.add('active');
}

closeBtn.addEventListener('click', () => {
  modal.classList.remove('active');
  for (var i = 0; i < allInput.length; i++) {
    allInput[i].value = "";

  }


})



/* start register coding */
registerBtn.onclick = function (e) {
  e.preventDefault();
  registrationData();
  getDataFromLocal();
  registerForm.reset('');
  closeBtn.click();
}

if (localStorage.getItem('users') != null) {
  userData = JSON.parse(localStorage.getItem('users'));
}

const registrationData = () => {
  userData.push({
    id: idE1.value,
    name: nameE1.value,
    l_name: lstName.value,
    email: emailE1.value,
    ofc_code: offCode.value,
    jb_title: jobTitle.value,
    profilePic: imgUrl == undefined ? "image/img.png" : imgUrl
    // profilePic: "image/img.png"
  });
  var userString = JSON.stringify(userData);
  localStorage.setItem('users', userString);
  swal("Good job!", "Registration  Successfully!", "success");
}


/* start returning data on page 
from localstorage */

var tableData = document.querySelector('#table-data');

const getDataFromLocal = () => {
  tableData.innerHTML = "";
  userData.forEach((data, index) => {

    tableData.innerHTML += `
    <tr index='${index}' >
       <td>${index + 1}</td>
       <td><img src="${data.profilePic}" width="40" height="40"></td>
       <td>${data.id}</td>
       <td>${data.name}</td>
        <td>${data.l_name}</td>
       <td>${data.email}</td>
       <td>${data.ofc_code}</td>
        <td>${data.jb_title}</td>
       <td>
        <button class="edit-btn"><i class="fa fa-eye"></i></button>
        <button class="del-btn" style="background-color: #ee534f"><i class="fa fa-trash"></i> </button>
       </td>
  </tr>
    `
  });

  /* start delete function for each row in the table*/
  var i;
  var allDetBtn = document.querySelectorAll('.del-btn');
  for (i = 0; i < allDetBtn.length; i++) {
    allDetBtn[i].onclick = function () {
      var tr = this.parentElement.parentElement;
      var id = tr.getAttribute("index");
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            userData.splice(id, 1);
            localStorage.setItem('users', JSON.stringify(userData));
            tr.remove()
            swal("Poof! Your imaginary file has been deleted!", {
              icon: "success",
            });
          } else {
            swal("Your imaginary file is safe!");
          }
        });

    }
  }
  /* end delete function for each row in the table*/

  /*  update function for each row in the table*/
  var allEdit = document.querySelectorAll('.edit-btn');
  for (i = 0; i < allEdit.length; i++) {
    allEdit[i].onclick = function () {
      var tr = this.parentElement.parentElement;
      var td = tr.getElementsByTagName("TD");
      var index = tr.getAttribute("index");
      var imgTag = td[1].getElementsByTagName("IMG");
      var profPic = imgTag[0].src;
      var id = td[2].innerHTML;
      var name = td[3].innerHTML;
      var lastName = td[4].innerHTML;
      var email = td[5].innerHTML;
      var oficCode = td[6].innerHTML;
      var jobtitle = td[7].innerHTML;
      addBtn.click();
      registerBtn.disabled = true;
      updateBtn.disabled = false;
      idE1.value = id;
      nameE1.value = name;
      lstName.value = lastName;
      emailE1.value = email;
      offCode.value = oficCode;
      jobTitle.value = jobtitle;
      profile_pic.src = profPic;
      updateBtn.onclick = function (e) {

        userData[index] = {
          id: idE1.value,
          name: nameE1.value,
          l_name: lstName.value,
          email: emailE1.value,
          ofc_code: offCode.value,
          jb_title: jobTitle.value,
          profilePic: uploadpic.value == "" ? profPic : imgUrl
        }
        localStorage.setItem('users', JSON.stringify(userData));

      }
    }
  }


}
getDataFromLocal();

/* image processing*/
uploadpic.onchange = function () {
  if (uploadpic.files[0].size < 1000000) {
    var fReader = new FileReader();
    fReader.onload = function (e) {
      imgUrl = e.target.result;
      profile_pic.src = imgUrl;
    }
    fReader.readAsDataURL(uploadpic.files[0]);
  } else {
    alert("file size is too long")
  }
}

// /* start serch coding /*

var serchE1 = document.querySelector('#empId');
serchE1.oninput = function () {
  serchFunc();
}

function serchFunc() {
  var tr = tableData.querySelectorAll("TR");
  var filter = serchE1.value.toLowerCase();
  for (var i = 0; i < tr.length; i++) {
    var id = tr[i].getElementsByTagName("TD")[2].innerHTML;
    var name = tr[i].getElementsByTagName("TD")[3].innerHTML;
    var lastName = tr[i].getElementsByTagName("TD")[4].innerHTML;
    var email = tr[i].getElementsByTagName("TD")[5].innerHTML;
    var ofc_code = tr[i].getElementsByTagName("TD")[6].innerHTML;
    var jb_title = tr[i].getElementsByTagName("TD")[7].innerHTML;

    // var id = td.innerHTML;
    if (id.toLowerCase().indexOf(filter) > -1) {
      tr[i].style.display = "";
    }
    else if (name.toLowerCase().indexOf(filter) > -1) {
      tr[i].style.display = "";
    }
    else if (lastName.toLowerCase().indexOf(filter) > -1) {
      tr[i].style.display = "";
    }
    else if (email.toLowerCase().indexOf(filter) > -1) {
      tr[i].style.display = "";
    }
    else if (ofc_code.toLowerCase().indexOf(filter) > -1) {
      tr[i].style.display = "";
    }
    else if (jb_title.toLowerCase().indexOf(filter) > -1) {
      tr[i].style.display = "";
    } else {
      tr[i].style.display = "none"
    }
  }
}

// start clear all data
var delAllBtn = document.querySelector('#del-all-btn');
var delAllBox = document.querySelector('#del-all-box');
delAllBtn.addEventListener('click', () => {
  if (delAllBox.checked == true) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          localStorage.removeItem('users');
          window.location = location.href;
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your imaginary file is safe!");
        }
      });
  } else {
    swal("check The box", "please check the box to delete data", "warning");
  }
})
