require 'sinatra'

get '/' do
  send_file 'static/index.html'
end
