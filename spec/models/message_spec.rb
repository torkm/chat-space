require 'rails_helper'

describe Message do
  describe "#create" do

    ######### メッセージを保存できる場合 #########
    context 'can save' do
      # メッセージがあれば保存できる
      it "is valid with only a body" do
        message = build(:message, image: nil)
        expect(message).to be_valid
      end

      # 画像があれば保存できる  
      it "is valid with only an image" do
        message = build(:message, body: nil)
        expect(message).to be_valid
      end

      # メッセージと画像があれば保存できる  
      it "is valid with both  an image and a body" do
        message = build(:message)
        expect(message).to be_valid
      end
    end
 
    ####### メッセージを保存できない場合 #######
    context 'cannot save' do
      # メッセージも画像も無いと保存できない
      it "is invalid without an image or a message" do
        message = build(:message, image: nil, body: nil)
        message.valid?
        expect(message.errors[:body]).to include("を入力してください")
      end
    
      # group_idがないと保存できない
      it "is invalid without an group_id" do
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include("を入力してください")
      end

      # user_idがないと保存できない
      it "is invalid without an user_id" do
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include("を入力してください")
      end

    end
  
  end

end

#  コンソールで確認するとき
# message = Message.new(body:nil, image:nil, user_id:nil, group_id: nil)
