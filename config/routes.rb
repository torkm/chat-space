Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'messages#index'
  resources :users, only: [:edit, :update]
  resources :groups, only:[:edit, :update, :new, :create] do
    resources :messages, only: [:index, :create]
  end
    # 中間テーブルはrouting不要

end
