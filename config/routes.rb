# frozen_string_literal: true

Rails.application.routes.draw do
  get 'jobs/index'
  get 'home/index'
  devise_for :users
  root 'pages#home'
  resources :jobs, only: [:index, :show, :new, :create]
  get "/pages/:page" => "pages#show"

  resource :map, only: [:show]
  

  get 'map/jobs' => 'maps#jobs'
  post 'map/filter' => 'maps#filter'
  post 'map/unfilter' => 'maps#unfilter'
  post '/search' => 'pages#search'

  authenticated :user, ->(u) { !u.employer } do
    namespace :applicants do
      resources :users, only: [:index]
      # resource :user_job_applications, only: [:new]
      root to: 'users#index'
    end
  end

  authenticated :user, ->(u) { u.employer } do
    namespace :employers do
      resources :admins, only: [:index]
      root to: 'admins#index'
      resources :jobs, only: [:new, :create]

      # root "pages#home"
    end
  end

  get '/signin/path' => 'pages#trigger_signin', as: 'signin'
  get '/signup/path' => 'pages#trigger_signup', as: 'signup'
end
