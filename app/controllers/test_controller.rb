class TestController < ApplicationController

	def baihui
		@username = current_user.email
	end
end
