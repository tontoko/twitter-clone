class UserToUserId < ActiveRecord::Migration
  def change
    rename_column :likes, :user, :user_id
    rename_column :retweets, :user, :user_id
    
  end
end
