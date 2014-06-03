class UsersController < ApplicationController
	def new
	  @user = User.new
	end

	def create
	  @user = User.new(params[:user])
	  if @user.save
	    redirect_to root_url, :notice => "Welcome to our app. You are now signed up!"
	  else
	    render "new"
	  end
	end
end
