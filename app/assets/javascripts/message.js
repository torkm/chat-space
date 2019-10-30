$(function () {


  function buildHTML(message) {

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
                  <p class="message__content__text">
                    ${message.body}
                  </p>

                </div>
              </div>`;

    // <img class="message__content__image" src="/uploads/message/image/38/fruits.jpeg" alt="Fruits"></img>


    // let html = `
    // .message
    //   .message__info
    //   .message__info__speaker
    //   = ${message.user_name}
    //     .message__info__date
    //   = ${message.created_at}
    //     .message__content
    //     - if ${message.body}.present ?
    //   % p.message__content__text
    //     = ${message.body}
    //     = image_tag ${message.image_url}, class: 'message__content__image' if ${message.image}.present ? `
    return html;
  }

  $('.post').on('submit', function (e) {
    e.preventDefault();
    // console.log($(this).attr('action'));
    // 今回はurl = /groups/[id]/messagesとなる
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
      $('.post__form__text').val('')
    }).fail(function () {
      alert('メッセージを入力してください');
    })
    return false;
  })
})
// 発火はform_forタグ全体のclassを指定する必要がある