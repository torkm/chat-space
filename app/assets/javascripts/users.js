$(function () {
  $("#user-search-field").on("keyup", function () {
    let input = $("#user-search-field").val();
    // console.log(input)
    // let href = window.location.href;
    $.ajax({
      type: "GET",
      url: "/users", // コントローラのあるURL 
      data: { keyword: input },
      dataType: 'json',
    }).done(function (users) {
      console.log("データ取得成功")
      console.log(users)
    }).fail(function () {
      console.log("データ取得失敗")
      // alert("error")
    })
  })
})