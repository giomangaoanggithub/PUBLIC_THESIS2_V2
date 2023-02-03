// page_teacher.php

function page_start() {
  $.get("zerver_in_no_company.php", function (data) {
    if(data == "0"){
        window.location.href = "page_teacher_company.php";
    }
  });
}
page_start();
