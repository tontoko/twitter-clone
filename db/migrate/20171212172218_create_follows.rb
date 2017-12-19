class CreateFollows < ActiveRecord::Migration
  def change
    create_table :follows do |t|
      t.string :follower
      t.string :followed

      t.timestamps null: false
    end
  end
end
