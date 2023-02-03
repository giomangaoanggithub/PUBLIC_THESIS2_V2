$("#logout-btn").click(function () {
  window.location.href = "index.php";
});
$("#account-settings-btn").click(function () {
  window.location.href = "page_account_settings.php";
});

// CHECK IF IMAGE EXISTS
function checkIfImageExists(url, callback) {
  const img = new Image();
  img.src = url;

  if (img.complete) {
    callback(true);
  } else {
    img.onload = () => {
      callback(true);
    };

    img.onerror = () => {
      callback(false);
    };
  }
}

function load_applicants() {
  $.get("zerver_page_admin_fetch_applicants.php", function (data) {
    $("#incoming_applicants").empty();
    data = JSON.parse(data);
    table_contents = "";
    for (x = 0; x < data.length; x++) {
      file_ext = [".jpg", ".png", ".svg", ".webp", ".bmp", ".tif", ".tiff"];
      for (i = 0; i < file_ext.length; i++) {
        checkIfImageExists(
          data[x]["profile_pic_address"] + file_ext[i],
          (exists) => {
            // alert(array[3] + file_ext[i]);
            if (exists) {
              table_contents +=
                '<tr><td><img src="' +
                data[x]["profile_pic_address"] +
                file_ext[i] +
                '" class="img-fluid"></td><td>';
              i += file_ext.length;
            }
          }
        );
      }
      table_contents +=
        data[x]["teacher_email"] +
        '</td><td><button id="accept_--' +
        data[x]["a_t_c_id"] +
        '" onClick="accept_or_decline_applicant(this.id)">✔</button><button id="decline_--' +
        data[x]["a_t_c_id"] +
        '" onClick="accept_or_decline_applicant(this.id)">✖</button></td></tr>';
    }
    $("#incoming_applicants").append(table_contents);
  });
}

function load_staff() {
  $.get("zerver_page_admin_fetch_staff.php", function (data) {
    table_contents = "";
    data = JSON.parse(data);
    $("#your_staff").empty();
    for (x = 0; x < data.length; x++) {
      file_ext = [".jpg", ".png", ".svg", ".webp", ".bmp", ".tif", ".tiff"];
      for (i = 0; i < file_ext.length; i++) {
        checkIfImageExists(
          data[x]["profile_pic_address"] + file_ext[i],
          (exists) => {
            // alert(array[3] + file_ext[i]);
            if (exists) {
              table_contents +=
                '<tr><td><img src="' +
                data[x]["profile_pic_address"] +
                file_ext[i] +
                '" class="img-fluid"></td><td>';
              i += file_ext.length;
            }
          }
        );
      }
      table_contents +=
        data[x]["username"] +
        "</td><td>" +
        data[x]["teacher_email"] +
        "</td><td>" +
        data[x]["contact_number"] +
        "</td><td>"+"<button>VIEW</button></td></tr>";
    }
    $("#your_staff").append(table_contents);
  });
}

function accept_or_decline_applicant(outcome) {
  alert(outcome);
  $.post(
    "zerver_page_admin_accept_teacher.php",
    { outcome: outcome },
    function () {
      load_applicants();
      load_staff();
    }
  );
}

function page_start() {
  $.get("zerver_greet_user.php", function (data) {
    if (data.length == 11) {
      window.location.href = "index.php";
    } else {
      alert(data);
      load_applicants();
      load_staff();
    }
  });
}

page_start();
