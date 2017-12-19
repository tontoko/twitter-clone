class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  
  private
  
    def check_login
      user = User.find_by(user_id: session[:user_id])
      if user == nil
        flash[:notice] = "ログインしてください！"
        redirect_to("/")
      end
    end
    
    def clear_messages
      @messages = []
    end
end
