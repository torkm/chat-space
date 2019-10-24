class CreateMembers < ActiveRecord::Migration[5.0]
  def change
    create_table :members do |t|
      t.references :group_id, foreign_key: true
      t.references :user_id, foreign_key: true
      t.timestamps
    end
  end
end
