include ActionView::Helpers::AssetTagHelper

class StaticPagesController < ApplicationController
  def game
	
	@extra_title = image_url('background1.png');
  end
end
