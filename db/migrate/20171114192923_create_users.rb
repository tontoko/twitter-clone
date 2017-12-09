class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :user_id
      t.string :name
      t.string :profil_img
      t.string :img_id

      t.timestamps null: false
    end
  end
end
