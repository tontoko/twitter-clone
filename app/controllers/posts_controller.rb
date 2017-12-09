class PostsController < ApplicationController
  layout 'logined'
  
  before_action :check_login
  
  def index
    @posts = Post.all
    @users = User.all
    @user = User.find_by(user_id: session[:user_id])

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
    if @post = Post.find_by({id: id})
      @post.destroy
      redirect_to('/posts/index')
    end
  end
  
   def user_details
      @posts = Post.all
      @users = User.all
      @user = User.find_by(user_id: session[:user_id])
   end
   
   def like
      postId = params[:postId]
      @like = Like.where(user: session[:user_id]).find_by(post: postId)
      
      if @like == nil
        Like.create(user: session[:user_id], post: postId)
      else
        @like.destroy
      end
     
     render :nothing => true
   end
   
   
  
end
