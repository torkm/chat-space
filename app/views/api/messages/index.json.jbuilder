json.array! @messages do |message|
  json.body message.body
  json.image message.image
  json.created_at message.created_at
  json.user_name message.user.name 
  json.id message.id
end