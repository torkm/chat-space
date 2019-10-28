require 'rails_helper'
# メッセージ一覧ページを表示するアクション
# ログインしている場合
# アクション内で定義しているインスタンス変数があるか
# 該当するビューが描画されているか
# ログインしていない場合
# 意図したビューにリダイレクトできているか

describe MessagesController, type: :controller do
  let(:group) { create(:group) }
  let(:user) { create(:user) }

  describe '#index' do

    context 'log in' do
      # まずログインする loginして 
      before do
        login user
        get :index, params: { group_id: group.id }
        # 擬似的にindexアクションを動かすリクエストを行う」ために、getメソッドを利用しています。messagesのルーティングはgroupsにネストされているため、group_idを含んだパスを生成します。そのため、getメソッドの引数として、params: { group_id: group.id }を渡しています。
      end

      it 'assigns @message' do
        # インスタンス変数に代入されたオブジェクトは、コントローラのassigns メソッド経由で参照できます。
        # be_a_new ... Messageクラスのインスタンスかつ未保存のレコードである
        expect(assigns(:message)).to be_a_new(Message)
      end

      it 'assigns @group' do
        expect(assigns(:group)).to eq group
      end

      it 'redners index' do
        expect(response).to render_template :index
      end
    end

    context 'not log in' do
      before do
        get :index, params: { group_id: group.id }
      end

      it 'redirects to new_user_session_path' do
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end



  describe '#create' do
    let(:params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message) } }
    
    context 'log in' do
      before do
        login user
      end

      # ログインしているかつ、保存に成功した場合
      context 'can save' do
        subject {
          post :create,
          params: params
        }
        # ① メッセージの保存はできたのか
        it 'count up message' do
          expect{ subject }.to change(Message, :count).by(1)
        end
        
        #②　意図した画面に遷移しているか
        it 'redirects to group_messages_path' do
          subject
          expect(response).to redirect_to(group_messages_path(group))
        end
      end

      # ログインしているが、保存に失敗した場合
      # attributes_for で、paramsにbodyとimageがnullなハッシュを直接指定
      context 'can not save' do
        let(:invalid_params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message, body: nil, image: nil) } }

        subject {
          post :create,
          params: invalid_params
        }
        #③ メッセージの保存は行われなかったか
        it 'does not count up' do
          expect{ subject }.not_to change(Message, :count)
        end

        # ④　意図したビューが描画されているか
        it 'renders index' do
          subject
          expect(response).to render_template :index
        end
      end
    end

    # ログインしていない場合
    context 'not log in' do
      # ⑤意図した画面にリダイレクトできているか
      it 'redirects to new_user_session_path' do
        post :create, params: params
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end