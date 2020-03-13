class ChangeColumnFromJobs < ActiveRecord::Migration[6.0]
  def change
    change_column :jobs, :position, :string, null: false
    change_column :jobs, :description, :text, null: false
    change_column :jobs, :date, :string, null: false
    change_column :jobs, :longitude, :float, null: false
    change_column :jobs, :latitude, :float, null: false 
  end
end
