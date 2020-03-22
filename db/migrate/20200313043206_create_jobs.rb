class CreateJobs < ActiveRecord::Migration[6.0]
  def change
    create_table :jobs do |t|
      t.string :position, null: false
      t.text :description, null: false
      t.float :longitude, null: false
      t.float :latitude, null: false
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
