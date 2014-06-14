DefendTheOrder::Application.routes.draw do
  get "static_pages/game"
  get "test" => "test#baihui"
  get "logout" => "sessions#destroy", :as => "logout"
  get "login" => "sessions#new", :as => "login"
  get "signup" => "users#new", :as => "signup"
  root :to => "sessions#new"
  resources :users
  resources :sessions
  resources :passwordreset
end
