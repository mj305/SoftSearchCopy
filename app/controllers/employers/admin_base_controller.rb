class Employers::AdminBaseController < ApplicationController
    before_action :authenticate_user!
    before_action :ensure_admin_user!
    
    def ensure_admin_user!
        unless current_user and current_user.employer == true
            redirect_to root_path
        end
    end
end