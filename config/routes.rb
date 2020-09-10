Rails.application.routes.draw do

  devise_for :users, path: '', path_names: { sign_in: 'login', sign_out: 'logout', sign_up: 'register'}
  match 'users/:id' => 'users#destroy', :via => :delete, :as => :admin_destroy_user
	
	root to: "pages#home"

  post '/online_users/create'
  post '/online_users/update'
  post 'online_users/printUsers'
  
  post '/shape_of_interests/create'
  post '/shape_of_interests/printShapes'
  post '/shape_of_interests/delete'
  

  
  #get 'home', to: 'pages#home'

  #get 'about', to: 'pages#about'

  #get 'contact', to: 'pages#contact'

  get '/*missing', to: 'pages#missing'

  # i want to have rake routes path but i don't want user know that site it's not exist
  #resources :onlineUsers
  	
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
