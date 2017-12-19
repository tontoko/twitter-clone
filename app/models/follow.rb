class Follow < ActiveRecord::Base
    has_many :users
    
    validates :follower, presence: true, uniqueness: { scope: :followed  }
    validates :followed, presence: true
    
end
