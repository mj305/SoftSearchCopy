class AddUniqueIndexToUserFavorites < ActiveRecord::Migration[6.0]
  def change
    add_index :user_favorites, [:user_id, :job_id], unique: true
  end
end
