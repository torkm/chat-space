$(function () {
  var reloadMessages = function () {
    let last_message_id = $('.message').last().data('id');
    let href = window.location.href.replace('/messages', '/api/messages');
    $.ajax({
      url: href,
      type: 'GET',
      dataType: 'json',
      data: { id: last_message_id }
    }).done(function (messages) {
      var insertHTML = '';
      messages.forEach(function (message) {
        insertHTML += buildMessageHTML(message);
      });
      $('.messages').append(insertHTML)
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight });
    }).fail(function () {
      alert('更新に失敗しました。');
    });
  };

  let buildMessageHTML = function (message) {
    let image = message.image.url ?
      `<img class="message__content__image" src=${message.image.url} alt="Fruits"></img>` : "";

    let body = message.body ?
      `<p class="message__content__text">
          ${message.body}
        </p>` : "";

    let html = `<div class="message" data-id=${message.id}>
                    <div class="message__info">
                      <div class="message__info__speaker">
                        ${message.user_name}
                      </div>
                      <div class="message__info__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="message__content">
                      ${body}
                      ${image}
                    </div>
                  </div>`;
    return html;
  }
  // formタグ全体を指定
  $('.post').on('submit', function (e) {
    e.preventDefault();
    var url = $(this).attr('action');
    var formData = new FormData(this);
    var href = window.location.href;  // => /groups/:id/messages
    $.ajax({
      url: href,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    }).done(function (data) {
      let html = buildMessageHTML(data);
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight });
      $('.post')[0].reset();
    }).fail(function (jqXHR, textStatus, errorThrown) {
      alert("error : " + errorThrown);
    })
    return false;
  })
  let timer = setInterval(reloadMessages, 5000);
  if (window.location.href.match(/messages/)) {
  } else {
    clearInterval(timer);
  };
});
