class MessagesController < ApplicationController
  before_action :set_group
  # index画面でnew message作る
  
  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
  end

  def create
    @message = @group.messages.new(message_params)
    if @message.save 
      redirect_to group_messages_path(@group), notice: 'メッセージが送信されました'
    else
      @messages = @group.messages.includes(:user)
      #flash.nowを用いる
      flash.now[:alert] = 'メッセージを入力してください'
      render :index
    end
  end
  
  private

  def message_params
    params.require(:message).permit(:body, :image).merge(user_id: current_user.id)
  end

  def set_group
    #ページURLにgroup_idあるのでparamsに自動的にgroup_id入っている
    @group = Group.find(params[:group_id])
  end
end
