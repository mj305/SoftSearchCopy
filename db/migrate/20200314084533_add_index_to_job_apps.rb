class AddIndexToJobApps < ActiveRecord::Migration[6.0]
  def change
    add_index :job_apps, [:user_id, :job_id], unique: true
  end
end
