$(function () {


  function appendUser(user) {
    var html = `
            <div class="chat-group-user clearfix">
              <p class="chat-group-user__name">${user.name}</p>
              <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="ユーザーのid" data-user-name="ユーザー名">追加</div>
            </div>
            `
    $('#user-search-result').append(html)
  }
  function appendUserNotFound() {
    let html = `
               <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">ユーザーが見つかりません</p>
               </div>`
    $('#user-search-result').append(html)
  }


  $("#user-search-field").on("keyup", function () {
    let input = $("#user-search-field").val();
    // console.log(input)
    // let href = window.location.href;
    $.ajax({
      type: "GET",
      url: "/users", // コントローラのあるURL 
      data: { keyword: input },
      dataType: 'json',
    })
      .done(function (users) {
        console.log("データ取得成功");
        console.log(users);
        $('#user-search-result').empty();
        if (users.length !== 0) {
          users.forEach(function (user) {
            appendUser(user);
          })
        } else if (input.length == 0) {
          return false;
          // 一度入力して、消したときに UserNotFoundが呼び出されないように
        }
        else {
          appendUserNotFound();
        }
      })
      .fail(function () {
        console.log("データ取得失敗");
        alert("ユーザー検索に失敗しました");
      })
  })
});

$(document).on('click', '.chat-group-user__btn--add', function (e) {
  console.log('発火しました')
  console.log(e)
})