class Applicants::UserBaseController < ApplicationController
    before_action :authenticate_user!
    before_action :ensure_applicant_user!

    
    def ensure_applicant_user!
        unless current_user and current_user.employer == false
            redirect_to root_path
        end
end
end