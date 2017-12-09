class ChangeProfilImgFromUsers < ActiveRecord::Migration
  def change
    change_column :users, :profil_img, :boolean, default: false
  end
end
