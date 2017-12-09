Rails.application.routes.draw do
  
  get "posts/user_details"
  get 'posts/index'
  
  get '' => 'users#home'
  
  post "users/create"
  post "users/login"
  post "users/logout"
  post "users/update"
  post "users/destroy"
  post 'posts/newTweet'
  post "posts/destroyTweet"
  post "posts/like"

end
