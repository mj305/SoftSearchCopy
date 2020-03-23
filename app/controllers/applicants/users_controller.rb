class Applicants::UsersController < Applicants::UserBaseController
   
    def index
        @user_favorites = UserFavorite.all
    end
    def show
        @user_favorites = UserFavorite.find(params[:id])
      end
      
    def destroy
    @user_favorite = UserFavorite.find(params[:id])
    @user_favorite.destroy!
    redirect_to '/applicants/favorites', :notice => "Your favorite has been deleted"
    end
      private
    
      def job_params
         params.require(:user_favorite).permit(:user_id, :job_id)
      end
    end
