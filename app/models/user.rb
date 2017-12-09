class User < ActiveRecord::Base
    
    validates :user_id, presence: true, uniqueness: true
    validates :name, presence: true
    
    has_secure_password
    
    has_many :likes, dependent: :destroy
    
end
