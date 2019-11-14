class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
  end

  def create
    @message = @group.messages.new(message_params)
    if @message.save
      respond_to do |format|
        format.html { redirect_to group_messages_path(@group), notice: "メッセージが送信されました" }
        format.json
      end
    else
      respond_to do |format|
        format.html {
          @messages = @group.messages.includes(:user)
          binding.pry
          flash.now[:alert] = "メッセージを入力してください。"
          render :index
        }
        format.json
      end
    end
  end

  private

  def message_params
    params.require(:message).permit(:body, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end
