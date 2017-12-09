class RemoveImgIdFromUsers < ActiveRecord::Migration
  def change
    remove_column :users, :img_id
  end
end
