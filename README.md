# DB configuration

## users table
|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false|
|mail|string|null: false, unique:true|
|password|string|null: false|


### Association
- has_many :groups, through: members
- has_many :messages
- has_many :members


## groups table
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :users, through: members
- has_many :messages
- has_many :members


## messages table
|Column|Type|Options|
|------|----|-------|
|body|text||
|image|str||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

bodyとimageは少なくとも一方はnullではない
### Association
- belongs_to :group
- belongs_to :user


## members table
usersとgroupsの中間テーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
