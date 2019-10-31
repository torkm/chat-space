$(function () {


  function appendUser(user) {
    var html = `
            <div class="chat-group-user clearfix">
              <p class="chat-group-user__name">${user.name}</p>
              <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
            </div>
            `
    $('#user-search-result').append(html)
  };
  function appendUserNotFound() {
    let html = `
               <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">ユーザーが見つかりません</p>
               </div>`
    $('#user-search-result').append(html)
  };

  function appendDeleteUser(name, id) {
    let html = `
    <div class="chat-group-user clearfix" id="${id}">
      <p class="chat-group-user__name">${name}</p>
      <a class="chat-group-user__btn chat-group-user__btn--remove chat-group-user__button" data-user-id="${id}" data-user-name="${name}">削除</a>
    </div>`;
    $(".js-add-user").append(html);
  };

  // DBにユーザーが登録されるために必要なhtml
  function addMember(userId) {
    let html = `<input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />`;
    $(`#${userId}`).append(html);
  };

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
        // console.log(users);
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
        alert("通信エラーです。ユーザーが表示できません。");
      })
  })
  // 追加ボタンを押すと、検索結果から消えて、メンバーに追加されるように
  $(document).on('click', '.chat-group-user__btn--add', function () {
    const userName = $(this).attr("data-user-name");
    const userId = $(this).attr("data-user-id");
    $(this).parent().remove();
    appendDeleteUser(userName, userId);
    addMember(userId);
  })
  // 削除を押すと、メンバーから消える (検索結果に戻るのは未実装)
  $(document).on('click', '.chat-group-user__btn--remove', function () {
    $(this).parent().remove();
  })
});

