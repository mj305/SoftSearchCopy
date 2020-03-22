class CreateJobSkills < ActiveRecord::Migration[6.0]
  def change
    create_table :job_skills do |t|
      t.references :job, null: false, foreign_key: true
      t.references :skill, null: false, foreign_key: true
      t.index ["job_id", "skill_id"], name: "index_user_favorites_on_job_id_and_skill_id", unique: true

      t.timestamps
    end
  end
end
