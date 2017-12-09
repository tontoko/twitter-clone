class UsersController < ApplicationController
    layout "home"
    

    def home
        
    end
    
     def create
        @user = User.new(user_params)
        if @user.save
            flash[:notice] = "ユーザーの作成に成功しました！"
            session[:user_id] = @user.user_id
            FileUtils.mkdir_p("./public/images/user_images/#{@user.user_id}")
            redirect_to posts_index_url
        else
            flash[:notice] = "ユーザーの作成に失敗しました！"
            render "home"
        end
     end
     
     def login
         p params[:user_id]
         p params[:password]
        @user = User.find_by(user_id: params[:user][:user_id])
        if @user && @user.authenticate(params[:user][:password])
            flash[:notice] = "ログインに成功しました！"
            session[:user_id] = @user.user_id
            redirect_to posts_index_url
        else
            flash[:notice] = "ログインに失敗しました！"
            render "home"
        end
     end
     
     def logout
        reset_session
        redirect_to("/")
     end
     
     def update
         user_id = params[:user][:user_id]
         password = params[:user][:password]
         img = params[:user][:img]
         @user = User.find_by(user_id: session[:user_id])
         
         @user.user_id = user_id
         @user.password = password if password != nil
         
         if @user.save
            if img != nil
                File.binwrite("public/images/profil_images/#{@user.user_id}.jpg", img.read)
                @user.profil_img = true
                @user.save
            end
            
            session[:user_id] = @user.user_id
            flash[:notice] = "ユーザー情報の更新に成功しました！"
            redirect_to posts_user_details_path
         else
            flash[:notice] = "ユーザー情報の更新に失敗しました！"
            redirect_to posts_user_details_path
        end
     end
     
     
     def destroy
        @user = User.find_by(user_id: session[:user_id]) 
        FileUtils.rm_r("./public/images/user_images/#{@user.user_id}")
        FileUtils.rm_r("./public/images/profil_images/#{@user.user_id}.jpg") if @user.profil_img
        reset_session
        destroy_posts = Post.where(user_id: @user.user_id)
        destroy_posts.destroy_all
        @user.destroy
        redirect_to("/")
     end
     
     
     
    private
    # Never trust parameters from the scary internet, only allow the white list through.
        def user_params
            params.require(:user).permit(:name, :user_id, :password)
        end
end
