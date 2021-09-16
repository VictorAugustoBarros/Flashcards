import pymongo


class Mongodb:
    def __init__(self):
        mongodb_client = pymongo.MongoClient("mongodb://localhost:27017/")
        self.db = mongodb_client["flashcards"]

    def select_all(self, collection: str):
        collection = self.db[collection]
        return collection.find()

    def insert(self, collection: str, values: list):
        collection = self.db[collection]
        rows = collection.insert_many(values)
        return rows.inserted_ids

    def insert_unique(self, collection: str, values: list):
        values_to_insert = []
        for value in values:
            if not self.db[collection].find_one({"pt": value["pt"]}):
                values_to_insert.append(value)

        if not values_to_insert:
            return []

        collection = self.db[collection]
        rows = collection.insert_many(values_to_insert)
        return rows.inserted_ids


if __name__ == "__main__":
    mongo_db = Mongodb()
    words = []
    words.append(
        {
            "pt": "caqui",
            "jp": "kaki",
            "jp_write": "かき",
        }
    )
    mongo_db.insert("words", words)

    rows = mongo_db.select_all("words")
    print(rows)
