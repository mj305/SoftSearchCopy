class RemovePartDateFromJobs < ActiveRecord::Migration[6.0]
  def change
    remove_column :jobs, :date, :string
  end
end
