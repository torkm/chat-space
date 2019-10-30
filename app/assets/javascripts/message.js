$(function () {
  function buildHTML(message) {
    let image = message.image_url ?
      `<img class="message__content__image" src=${message.image_url} alt="Fruits"></img>` : "";

    let body = message.body ?
      `<p class="message__content__text">
        ${message.body}
      </p>` : "";
    let html = `<div class="message">
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

  $('.post').on('submit', function (e) {
    e.preventDefault();
    var url = $(this).attr('action');
    var formData = new FormData(this);
    var href = window.location.href;

    $.ajax({
      url: href,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    }).done(function (data) {
      let html = buildHTML(data);
      $('.messages').append(html);

      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight });
      $('.post')[0].reset();
    }).fail(function () {
      alert('メッセージを入力してください');
    })
    return false;
  })
})
