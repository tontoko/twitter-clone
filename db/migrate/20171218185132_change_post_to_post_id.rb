class ChangePostToPostId < ActiveRecord::Migration
  def change
    rename_column :likes, :post, :post_id
    rename_column :retweets, :post, :post_id
    
    
  end
end
