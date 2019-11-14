json.(@message, :body, :image)
json.created_at @message.created_at.strftime("%Y/%m/%d %H:%M")
json.user_name @message.user.name
#idもデータとして渡す
json.id @message.id
