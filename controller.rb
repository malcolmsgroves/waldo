require 'sinatra'
require "sinatra/reloader"
require 'json'

correct_positions = { 'waldo' => [0.11, 0.83],
                      'bat' => [0.47, 0.17],
                      'centaur' => [0.78, 0.66],
                      'mat' => [0.73, 0.53] }


post '/post' do
  data = JSON.parse(request.body.read.to_s)
  pos = data['coords']
  id = data['id']
  dist = Math.sqrt((pos[0] - correct_positions[id][0])**2 + (pos[1] - correct_positions[id][1])**2)
  { valid: dist < 0.05 }.to_json
end
