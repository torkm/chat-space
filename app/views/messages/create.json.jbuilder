  json.body  @message.body
  json.image  @message.image
  json.user_name  @message.user.name
  json.created_at @message.created_at.strftime("%Y/%m/%d %H:%M")
