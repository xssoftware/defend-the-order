include ActionView::Helpers::AssetTagHelper

class StaticPagesController < ApplicationController
  def game
	levelInfo = {
		"backgroundUrl" => 'http://127.0.0.1:3000/background1.png',
		"monster1Url" => 'http://127.0.0.1:3000/darthvader.png',
		"tower1Url" => 'http://127.0.0.1:3000/tower1icon.png',
		"route" => [
			{"x" => 1, "y" => 6},
			{"x" => 2, "y" => 6}, 
			{"x" => 3, "y" => 6}, 
			{"x" => 3, "y" => 5}, 
			{"x" => 3, "y" => 4},
			{"x" => 3, "y" => 3},
			{"x" => 4, "y" => 3},
			{"x" => 5, "y" => 3},
			{"x" => 6, "y" => 3},
			{"x" => 7, "y" => 3},
			{"x" => 7, "y" => 4},
			{"x" => 7, "y" => 5},
			{"x" => 7, "y" => 6},
			{"x" => 7, "y" => 7},

			{"x" => 8, "y" => 7},
			{"x" => 9, "y" => 7},
			{"x" => 10, "y" => 7},
			{"x" => 11, "y" => 7},

			{"x" => 11, "y" => 6},
			{"x" => 11, "y" => 5},
			
			{"x" => 12, "y" => 5},
			{"x" => 13, "y" => 5},
			{"x" => 14, "y" => 5},
			{"x" => 15, "y" => 5},
			{"x" => 16, "y" => 5},
			{"x" => 17, "y" => 5},

			
		],
		"monsterType" => 1
		};
	
	@levelInfo = ActiveSupport::JSON.encode(levelInfo).html_safe;
  end
end
