class Post < ActiveRecord::Base
    
    validates :content, presence: true
    
    has_many :likes, dependent: :destroy
    
end
