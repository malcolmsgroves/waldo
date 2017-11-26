require 'sinatra'
require "sinatra/reloader"
require 'json'

post '/' do
  puts JSON.parse(request.body.read.to_s)
  puts ENV['GOOGLE_API_KEY']
end
