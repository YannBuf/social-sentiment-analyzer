from db.database import Base, sync_engine
from db.models import user

def init():
    print("Creating database tables...")
    Base.metadata.create_all(bind=sync_engine)
    print("✅ Done.")

if __name__ == "__main__":
    init()
