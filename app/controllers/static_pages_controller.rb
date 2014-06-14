include ActionView::Helpers::AssetTagHelper

class StaticPagesController < ApplicationController
  def game
	   levelInfo = {
   		 'backgroundUrl' => 'http://127.0.0.1:3000/background1.png',
   		 'monster1Url' => 'http://127.0.0.1:3000/darthvader.png',
   		 'route' => [{ 'x' => 1, 'y' => 1 }, { 'x' => 2, 'y' => 2 }, { 'x' => 3, 'y' => 3 }],
   		 'monsterType' => 1
   	}

	   @levelInfo = ActiveSupport::JSON.encode(levelInfo).html_safe
  end
end
