class CreateRetweets < ActiveRecord::Migration
  def change
    create_table :retweets do |t|
      t.string :user
      t.string :post

      t.timestamps null: false
    end
  end
end
