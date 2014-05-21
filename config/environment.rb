# Load the Rails application.
require File.expand_path('../application', __FILE__)
RailsInitializer.run do |config|
config.gem "authlogic"
end
# Initialize the Rails application.
DefendTheOrder::Application.initialize!
