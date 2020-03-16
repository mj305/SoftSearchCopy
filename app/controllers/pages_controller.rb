class PagesController < ApplicationController
    
    def home 
    end

    def search
        redirect_to controller: :maps, action: :show
    end
end
