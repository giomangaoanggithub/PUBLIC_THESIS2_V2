var pub_x = 0;

function page_start() {
  $.get("zerver_page_account_settings_fetch_admin.php", function(data){
    array = JSON.parse(data);
    document.getElementById("company").value = array[1];
    document.getElementById("company_password").value = array[2];
  });
  $.get("zerver_greet_user.php", function (data) {
    if (data.length == 11) {
      window.location.href = "index.php";
    } else {
      $.get("zerver_page_account_settings_fetch_all.php", function (data) {
        array = JSON.parse(data);
        document.getElementById("email").placeholder = array[0];
        document.getElementById("number").placeholder = array[2];
        document.getElementById("company").placeholder = "none yet";
        document.getElementById("username").placeholder = array[1];

        file_ext = [".jpg", ".png", ".svg", ".webp", ".bmp", ".tif", ".tiff"];
        for (i = 0; i < file_ext.length; i++) {
          checkIfImageExists(array[3] + file_ext[i], (exists) => {
            // alert(array[3] + file_ext[i]);
            if (exists) {
              document.getElementById("upload-img").src =
                array[3] + file_ext[i];
              i += file_ext.length;
            }
          });
        }
      });
    }
  });
}

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

$("#cancel-btn").click(function () {
  $.get("zerver_page_return.php", function (data) {
    if (data == '["2"]') {
      window.location.href = "page_admin.php";
    } else if (data == '["1"]') {
      window.location.href = "page_teacher.php";
    } else {
      window.location.href = "page_student.php";
    }
  });
});

$("#company_password").click(function () {
  document.getElementById("company_password").type = "text";
});

page_start();