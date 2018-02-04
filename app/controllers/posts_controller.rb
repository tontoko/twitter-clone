class PostsController < ApplicationController
  layout 'logined'
  
  before_action :check_login
  before_action :clear_messages
  
  def index
    @posts = Post.all
    @users = User.all
    @user = User.find_by(user_id: session[:user_id])
    @follower = Follow.where(follower: @user.id)
    @followed = Follow.where(followed: @user.id)
    @follower_id = []
    @follower.each do |u|
      @follower_id.push(User.find(u.followed).user_id)
    end
  end
  
  def search
    @posts = Post.all
    @users = User.all
    @user = User.find_by(user_id: session[:user_id])
    @follower = Follow.where(follower: @user.id)
    @followed = Follow.where(followed: @user.id)
    @follower_id = []
    @follower.each do |u|
      @follower_id.push(User.find(u.followed).user_id)
    end
    
    @user_searched = params[:user_searched]
    @users_result = []
    @users.each do |user|
      if user.name == @user_searched || user.user_id == @user_searched
       if !@users_result.include?(user)
         @users_result.push(user)
       end
      end
    end
  end
  
  def newTweet
    content = params[:content]
    if params[:img]
      img = params[:img]
      image_name = img.original_filename
      File.binwrite("public/images/user_images/#{session[:user_id]}/#{image_name}", img.read)
      @post = Post.new({user_id: session[:user_id], content: content, img: image_name})
      @post.save
    else
      @post = Post.new({user_id: session[:user_id], content: content}) 
      @post.save
    end
    redirect_to('/posts/index')
  end
  
  def destroyTweet
    id = params[:postId]
    if @post = Post.find_by(id: id)
      @post.destroy
      redirect_to('/posts/index')
    else
      flash[:notice] = "エラーが発生しました！"
      flash[:notice] = "id = #{id}"
      redirect_to('/posts/index')
    end
  end
  
   def user_details
      @posts = Post.all
      @users = User.all
      @user = User.find_by(user_id: session[:user_id])
      @follower = Follow.where(follower: @user.id)
      @followed = Follow.where(followed: @user.id)
   end
   
   def like
      postId = params[:postId]
      user = User.find_by(user_id: session[:user_id])
      @like = Like.where(user_id: user.id).find_by(post_id: postId)
      
      if @like == nil
        Like.create(user_id: user.id, post_id: postId)
      else
        @like.destroy
      end
     
     render :nothing => true
   end
   
   def retweet
     postId = params[:postId]
     user = User.find_by(user_id: session[:user_id])

      @retweet = Retweet.where(user_id: user.id).find_by(post_id: postId)
      
      if @retweet == nil
        Retweet.create(user_id: user.id, post_id: postId)
      else
        @retweet.destroy
      end
     
     render :nothing => true
     
   end
   
end
