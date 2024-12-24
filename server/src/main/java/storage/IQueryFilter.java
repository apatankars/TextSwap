package storage;

import com.google.cloud.firestore.Query;

@FunctionalInterface
public interface IQueryFilter {
  Query filterQuery(Query originalQuery);
}
