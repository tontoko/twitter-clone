class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :user
      t.text :content
      t.string :img

      t.timestamps null: false
    end
  end
end
