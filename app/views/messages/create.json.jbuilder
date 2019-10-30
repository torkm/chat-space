  json.body  @message.body
  json.image  @message.image
  json.image_url @message.image.url
  json.user_name  @message.user.name
  json.created_at @message.created_at.strftime("%Y/%m/%d %H:%M")
  json.body_present @message.body.present?
  json.imege_present @message.image.present?
