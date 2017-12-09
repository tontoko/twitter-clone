class AddColumnToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :imgid, :integer
  end
end
