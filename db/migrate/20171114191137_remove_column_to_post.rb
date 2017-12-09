class RemoveColumnToPost < ActiveRecord::Migration
  def change
    remove_column :posts, :imgid, :integer
  end
end
