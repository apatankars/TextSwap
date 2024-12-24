package edu.brown.cs.student.main.server.storage;

import com.google.cloud.firestore.Query;

@FunctionalInterface
public interface IQueryFilter {
  Query filterQuery(Query originalQuery);
}
