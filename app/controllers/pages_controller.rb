class PagesController < ApplicationController
    
    def home 
    end

    def search
        query = params['q']
        puts "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! in the pages controller!!!#{params['q']}"
        redirect_to controller: :maps, action: :show, location: query
    end
end
